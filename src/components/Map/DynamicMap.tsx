import { JSX, ReactNode, useEffect } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from './Map.module.scss';

const { MapContainer } = ReactLeaflet;


const DynamicMap = ({ children, className, width, height, defaultX, defaultY, defaultZoom, ...rest }: { children: React.ReactNode, className: string, width: number, height: number, defaultX: number, defaultY: number, defaultZoom: number, [key: string]: any }) => {
    let mapClassName = styles.map;

    if ( className ) {
        mapClassName = `${mapClassName} ${className}`;
    }

    useEffect(() => {
        (async function init() {
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    return (
        <MapContainer className={mapClassName} center={[defaultX, defaultY]} zoom={defaultZoom} {...rest}>
            <ReactLeaflet.TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            />
            {/* {typeof children === 'function' && children(ReactLeaflet || {}, Leaflet || {})} */}
        </MapContainer>
    )
}