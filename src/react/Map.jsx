import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

const RefMap = ({position, text}) => (
  <Map center={position} zoom={10} style={{height: '300px'}}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        <span>{text}</span>
      </Popup>
    </Marker>
  </Map>
);

export default RefMap;