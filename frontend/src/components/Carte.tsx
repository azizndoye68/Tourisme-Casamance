'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface RepereCarte {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  slug?: string;
  type?: 'destination' | 'hebergement' | 'activite';
}

interface CarteProps {
  markers: RepereCarte[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  onMarkerClick?: (marker: RepereCarte) => void;
  showPopup?: boolean;
  fitBounds?: boolean;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function renderMarkers(
  map: L.Map,
  markers: RepereCarte[],
  markerCollection: L.Marker[],
  showPopup: boolean,
  onMarkerClick?: (marker: RepereCarte) => void,
) {
  markerCollection.forEach((marker) => marker.remove());
  markerCollection.length = 0;

  markers.forEach((marker) => {
    const iconColor = marker.type === 'hebergement'
      ? '#FF6B3D'
      : marker.type === 'activite'
        ? '#1E7F55'
        : '#14503A';
    const iconLabel = marker.type === 'hebergement'
      ? '🛏'
      : marker.type === 'activite'
        ? '🎯'
        : '📍';
    const icon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="width:36px;height:36px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${iconColor};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:grid;place-items:center"><span style="transform:rotate(45deg);display:block;color:white;font-size:14px;font-weight:bold;line-height:1">${iconLabel}</span></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36],
    });

    const leafletMarker = L.marker([marker.lat, marker.lng], { icon });

    if (showPopup) {
      const detailsButton = onMarkerClick && marker.slug
        ? '<button class="map-popup-details" type="button">Voir détails</button>'
        : '';
      const popupContent = `<div class="map-popup-content"><h4>${escapeHtml(marker.title)}</h4>${marker.description ? `<p>${escapeHtml(marker.description)}</p>` : ''}${detailsButton}</div>`;

      leafletMarker.bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: true,
        autoClose: true,
        closeOnClick: true,
      });

      if (onMarkerClick && marker.slug) {
        leafletMarker.on('popupopen', (event) => {
          const button = event.popup.getElement()?.querySelector<HTMLButtonElement>('.map-popup-details');
          button?.addEventListener('click', () => onMarkerClick(marker), { once: true });
        });
      }
    }

    if (onMarkerClick) {
      leafletMarker.on('click', () => onMarkerClick(marker));
    }

    leafletMarker.addTo(map);
    markerCollection.push(leafletMarker);
  });
}

export function Carte({
  markers,
  center = [12.5, -16.3],
  zoom = 9,
  height = '400px',
  className = '',
  onMarkerClick,
  showPopup = true,
  fitBounds = false,
}: CarteProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const centerLat = center[0];
  const centerLng = center[1];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom,
      zoomControl: true,
      scrollWheelZoom: false,
      tap: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [centerLat, centerLng, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    renderMarkers(map, markers, markersRef.current, showPopup, onMarkerClick);

    if (fitBounds && markers.length > 0) {
      map.fitBounds(L.latLngBounds(markers.map(({ lat, lng }) => [lat, lng])), {
        padding: [50, 50],
      });
    }
  }, [centerLat, centerLng, fitBounds, markers, onMarkerClick, showPopup, zoom]);

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
