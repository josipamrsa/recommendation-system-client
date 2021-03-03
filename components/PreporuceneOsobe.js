//----KONFIGURACIJA----//

//---React/React Native----//
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const PreporuceneOsobe = (props) => {
    const rezultati = props.rezultati;
    return (
        <View style={styles.sadrzaj}>
            <Text style={styles.naslov}>Suggestions</Text>
            <ScrollView>
                {rezultati.map(rez =>
                    <View key={rez.id} style={styles.kartica}>
                        <Text>Name: {rez.name}</Text>
                        <Text>Similarity score: {rez.score}</Text>
                        <Text>Distance from user: {rez.distance}</Text>
                    </View>
                )}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    sadrzaj: {
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height,
    },
    kartica: {
        padding: 25,
        borderWidth: 1,
        borderColor: "black",
        margin: "5%",
        color: "black",
        fontSize: 20
    },
    naslov: {
        fontSize: 18
    }
});

export default PreporuceneOsobe;