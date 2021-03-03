//----KONFIGURACIJA----//

//---React/React Native----//import React from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GlavniNaslov = (props) => {
    return (
        <View style={styles.zaglavlje}>
            <Text style={styles.naslov}>{props.naslov}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    naslov: {
        color: "white",
        fontSize: 20,
      },
      zaglavlje: {
        width: '100%',
        height: 90,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#91ab65'
      }
});

export default GlavniNaslov;