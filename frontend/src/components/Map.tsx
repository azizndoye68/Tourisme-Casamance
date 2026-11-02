'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  slug?: string;
  type?: 'destination' | 'hebergement' | 'activite';
}

interface MapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  onMarkerClick?: (marker: MapMarker) => void;
  showPopup?: boolean;
  fitBounds?: boolean;
}

export function Map({
  markers,
  center = [12.5, -16.3], // Casamance center
  zoom = 9,
  height = '400px',
  className = '',
  onMarkerClick,
  showPopup = true,
  fitBounds = false,
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
      scrollWheelZoom: false, // Disable scroll zoom for better UX
      tap: false,
    });

    mapInstanceRef.current = map;

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    setMapLoaded(true);

    // Add markers
    addMarkers(map);

    // Fit bounds if requested
    if (fitBounds && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup
    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
      setMapLoaded(false);
    };
  }, []); // Only run once on mount

  // Update markers when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    addMarkers(mapInstanceRef.current);
  }, [markers, mapLoaded]);

  const addMarkers = (map: L.Map) => {
    // Remove existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((marker) => {
      // Choose icon color based on type
      const iconColor = marker.type === 'hebergement' ? '#FF6B3D' : // coral
                        marker.type === 'activite' ? '#1E7F55' : // emerald
                        '#14503A'; // leaf (default for destinations)

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            background: ${iconColor};
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <span style="
              transform: rotate(45deg);
              display: block;
              color: white;
              font-size: 14px;
              font-weight: bold;
              line-height: 1;
            ">${marker.type === 'hebergement' ? '🛏' : marker.type === 'activite' ? '🎯' : '📍'}</span>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const leafletMarker = L.marker([marker.lat, marker.lng], { icon: customIcon });

      if (showPopup) {
        const popupContent = `
          <div style="min-width: 200px; padding: 4px;">
            <h4 style="margin: 0 0 8px 0; color: #0E2A20; font-size: 16px;">${marker.title}</h4>
            ${marker.description ? `<p style="margin: 0 0 8px 0; color: #4F6358; font-size: 14px;">${marker.description}</p>` : ''}
            ${onMarkerClick && marker.slug ? `
              <button
                data-marker-slug="${marker.slug}"
                data-marker-type="${marker.type || ''}"
                style="
                  background: #1E7F55;
                  color: white;
                  border: none;
                  padding: 6px 12px;
                  border-radius: 24px;
                  font-size: 12px;
                  cursor: pointer;
                  width: 100%;
                "
              >
                Voir détails
              </button>
            ` : ''}
          </div>
        `;
        leafletMarker.bindPopup(popupContent, {
          className: 'custom-popup',
          closeButton: true,
          autoClose: true,
          closeOnClick: true,
        });
      }

      if (onMarkerClick) {
        leafletMarker.on('click', () => onMarkerClick(marker));
      }

      leafletMarker.addTo(map);
      markersRef.current.push(leafletMarker);
    });
  };

  return (
    <div
      ref={mapRef}
      className={`map-container ${className}`}
      style={{ height, width: '100%', borderRadius: '24px', overflow: 'hidden' }}
      role="application"
      aria-label="Carte interactive de la Casamance"
    />
  );
}

// Static map image fallback for SSR/SEO
interface StaticMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export function StaticMap({
  markers,
  center = [12.5, -16.3],
  zoom = 9,
  width = 800,
  height = 450,
  className = '',
  alt = 'Carte de la Casamance',
}: StaticMapProps) {
  // Build marker string for static map
  const markerParams = markers
    .map((m, i) => `markers=color:green%7Clabel:${String.fromCharCode(65 + i)}%7C${m.lat},${m.lng}`)
    .join('&');

  const centerParam = `center=${center[0]},${center[1]}`;
  const zoomParam = `zoom=${zoom}`;
  const sizeParam = `size=${width}x${height}`;

  // Using a static map service (here using a placeholder approach)
  // In production, you'd use a service like Mapbox Static Images, or generate server-side
  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?${centerParam}&${zoomParam}&${sizeParam}&${markerParams}`;

  return (
    <img
      src={staticMapUrl}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-card-lg ${className}`}
      loading="lazy"
      style={{ width: '100%', height: 'auto', maxWidth: width, borderRadius: '24px' }}
    />
  );
}

// Dynamic import for client-side only map (for pages that need SSR)
export const ClientMap = dynamic(() => import('./Map').then(mod => ({ default: mod.Map })), {
  ssr: false,
  loading: () => (
    <div
      className="bg-muted/10 rounded-card-lg flex items-center justify-center"
      style={{ height: '400px' }}
      role="status"
      aria-label="Chargement de la carte..."
    >
      <div className="text-center text-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald border-t-transparent mx-auto mb-2" />
        <p>Chargement de la carte...</p>
      </div>
    </div>
  ),
});