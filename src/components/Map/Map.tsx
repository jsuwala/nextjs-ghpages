import Leaflet, { LatLngExpression} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as ReactLeaflet from 'react-leaflet';
import React, { JSX, useEffect } from 'react';

const DynamicMap = ({ className, defaultCenter, defaultZoom, ...rest }: { className: string, defaultCenter: number[], defaultZoom: number, [key: string]: any }) => {

    useEffect(() => {
        (async function init() {
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    const mapCenter: LatLngExpression = [defaultCenter[0], defaultCenter[1]];

    return (
        <ReactLeaflet.MapContainer className={className} center={mapCenter} zoom={defaultZoom} {...rest}>
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

const DataMap = (props: JSX.IntrinsicAttributes & { className: string; width: number; height: number; center: number[]; zoom: number; }) => {
    const { width, height, center, zoom } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap {...props} defaultCenter={center} defaultZoom={zoom} />
        </div>
    )
}

export default DataMap;