import React, { useRef, useEffect } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Props {
  markerCoordinates: number[][];
}
function MapboxMap({ markerCoordinates }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    mapboxgl.accessToken =
      'pk.eyJ1IjoicG9sbG9jazczIiwiYSI6ImNsZzZlaGdqazBjdXIzZXFsNXM4d2IydWUifQ.0VYh33T6WY6OEM-z5jVphQ';
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [90.2070356021948, 24.2250071131465], // starting position [lng, lat]
      zoom: 1.6, // starting zoom
    });
    markerCoordinates.forEach((coordinate: any) => {
      new mapboxgl.Marker().setLngLat(coordinate).addTo(map);
    });

    return () => {
      map.remove(); // Cleanup on unmount
    };
  }, [markerCoordinates]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100%' }}
      className="rounded-2xl shadow-xl"
    />
  );
}

export default MapboxMap;
