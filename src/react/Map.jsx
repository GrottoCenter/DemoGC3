import React from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import styled from 'styled-components';

const FromGC = styled.span`
  background-color: yellow;
`;
const RefMap = ({position, text}) => (
  <Map center={position} zoom={13} style={{height: '300px'}}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        <FromGC>{text}</FromGC>
      </Popup>
    </Marker>
  </Map>
);

export default RefMap;