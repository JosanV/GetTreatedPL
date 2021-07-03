import React, { Component, useEffect, useState } from 'react'
import { StyleSheet,Linking} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'

/* Array to storage all hospital locations */
const coords = [
    {pos: {latitude: 51.76097149463688, longitude: 19.4475520614868}, img: 'https://icon-icons.com/icons2/2248/PNG/96/hospital_marker_icon_138482.png'} , 
    {pos: {latitude: 51.73350822859473, longitude: 19.456381032353768}},
    {pos: {latitude: 51.75261598012126, longitude: 19.483252919320915}},
    {pos: {latitude: 51.76065731081007, longitude: 19.44778830840757}},
    {pos: {latitude: 51.80212028035733, longitude: 19.437402379490944}},
]


onMarkerPress = (e) => {
    
    const coordinate = e.nativeEvent.coordinate
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${coordinate.latitude},${coordinate.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
}



const renderMarkers = () => {
    const markers = []
    for (let index = 0; index < coords.length; index++) {
        const element = coords[index];
        markers.push(
            <Marker
                onPress={onMarkerPress}
                image={{uri: element.img ? element.img : 'https://icon-icons.com/icons2/2248/PNG/96/hospital_marker_icon_138482.png'}}
                coordinate={element.pos}
            />
        )
    }
    return markers
}

const Map = (props) => {

    return (
        <MapView style={{...StyleSheet.absoluteFillObject}}  provider={PROVIDER_GOOGLE} initialRegion={{ latitude: 51.7688571, longitude: 19.4352552, latitudeDelta: 0.0900, longitudeDelta: 0.0400}}>
            {renderMarkers()}
        </MapView >
                
    );
  
}

export default Map
