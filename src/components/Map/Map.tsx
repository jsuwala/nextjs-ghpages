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

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_X = 49;
const DEFAULT_Y = -123;
const DEFAULT_ZOOM = 10;

const Map = (props: JSX.IntrinsicAttributes & { [key: string]: any; children: ReactNode; className: string; width: number; height: number; defaultX: number; defaultY: number; defaultZoom: number; }) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, defaultX = DEFAULT_X, defaultY = DEFAULT_Y, defaultZoom = DEFAULT_ZOOM } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap {...props} defaultX={defaultX} defaultY={defaultY} defaultZoom={defaultZoom} />
        </div>
    )
}

export default Map;