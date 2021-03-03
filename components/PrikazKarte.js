//----KONFIGURACIJA----//

//---React/React Native----//
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PrikazKarte = (props) => {

    // Postavi markere na lokacije potencijalnih kandidata na karti
    const postaviMarkere = () => {
        console.log(props.rezultati);
        if (props.rezultati) {
            return props.rezultati.map((rez) =>
                <Marker
                    key={rez.id}
                    coordinate={{ latitude: parseFloat(rez.location[0]), longitude: parseFloat(rez.location[1]) }}
                    title={rez.name}
                    pinColor={"green"}>
                </Marker >);
        }
    }

    return (
        <View style={styles.mapa}>
            { props.regija &&
                <MapView
                    style={styles.karta}
                    region={props.regija}
                    showsUserLocation={true}>
                    <Marker coordinate={props.lokacija} pinColor={"purple"} />
                    {postaviMarkere()}
                </MapView>}
        </View>
    );
}

const styles = StyleSheet.create({
    mapa: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: "5%",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 4,
        borderWidth: 1
    },
    karta: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default PrikazKarte;