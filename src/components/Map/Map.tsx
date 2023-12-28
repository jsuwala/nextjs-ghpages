import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as ReactLeaflet from 'react-leaflet';
import React, { JSX, ReactNode, useEffect } from 'react';

const DynamicMap = ({ children, className, width, height, defaultCenter, defaultZoom, ...rest }: { children: React.ReactNode, className: string, width: number, height: number, defaultCenter: number[], defaultZoom: number, [key: string]: any }) => {

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
        <ReactLeaflet.MapContainer className={className} center={defaultCenter} zoom={defaultZoom} {...rest}>
            <ReactLeaflet.TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            />
            {/* <ReactLeaflet.TileLayer
                url="https://titiler.xyz"
            /> */}
            {/* {typeof children === 'function' && children(ReactLeaflet || {}, Leaflet || {})} */}
        </ReactLeaflet.MapContainer>
    )
}

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_X = 49;
const DEFAULT_Y = -123;
const DEFAULT_CENTER = [DEFAULT_X, DEFAULT_Y];
const DEFAULT_ZOOM = 10;

const Map = (props: JSX.IntrinsicAttributes & { [key: string]: any; children: ReactNode; className: string; width: number; height: number; center: number[]; zoom: number; }) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, defaultCenter = DEFAULT_CENTER, defaultZoom = DEFAULT_ZOOM } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap {...props} center={defaultCenter} zoom={defaultZoom} />
        </div>
    )
}

export default Map;