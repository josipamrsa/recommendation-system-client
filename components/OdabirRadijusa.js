//----KONFIGURACIJA----//

//---React/React Native----//
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const OdabirRadijusa = (props) => {
    // Stanja
    const [oznaceno, postaviOznaceno] = useState("wide");   // Oznaka za radijus

    // Određivanje širine pretrage
    const dohvatiRadijus = (oznaceno) => {
        if (oznaceno === "wide") {
            postaviOznaceno("wide");
            props.postaviRadijus(25);
        }

        else {
            postaviOznaceno("narrow");
            props.postaviRadijus(5);
        }
    }

    return (
        <View style={styles.odabir}>
            <Text style={styles.naslov}>Search area</Text>
            <Text style={styles.izbor}>
                <RadioButton
                    value="wide"
                    status={oznaceno === "wide" ? 'checked' : 'unchecked'}
                    onPress={() => { dohvatiRadijus("wide") }}
                /> Wide
            </Text>
            <Text style={styles.izbor}>
                <RadioButton
                    value="narrow"
                    status={oznaceno === "narrow" ? 'checked' : 'unchecked'}
                    onPress={() => { dohvatiRadijus("narrow") }}
                /> Narrow
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    odabir: {
        marginTop: '5%',
        marginBottom: '10%',
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    naslov: {
        fontSize: 25
    },
    izbor: {
        fontSize: 15,
    }
});

export default OdabirRadijusa;