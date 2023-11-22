import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import { PreviewOfferType } from '../../types/types';

type MapProps = {
  points: PreviewOfferType[];
  city: PreviewOfferType['city'];
  selectedPoint?: PreviewOfferType['id'] | undefined;
  className: string;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

function Map({city, points, selectedPoint, className}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if(map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }
  }, [map, city.location]);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (selectedPoint) && (point.id === selectedPoint)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      className={`${className} map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
