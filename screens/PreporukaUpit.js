//----KONFIGURACIJA----//

//----React/React Native----//
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

//---Expo paketi----//
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

//----Komponente----//
import GlavniNaslov from '../components/GlavniNaslov';
import PrikazKarte from '../components/PrikazKarte';
import OdabirRadijusa from '../components/OdabirRadijusa';
import PreporuceneOsobe from '../components/PreporuceneOsobe';

//----Servisi----//
import lokacijaServis from '../services/locRecommendation';

const PreporukaUpit = () => {
    // Stanja za komponentu
    const [upit, postaviUpit] = useState("");               // Korisnički upit
    const [lokacija, postaviLokaciju] = useState([]);       // Korisnička lokacija
    const [radijus, postaviRadijus] = useState(25.0);       // Radijus pretrage
    const [rezultati, postaviRezultate] = useState(null);   // Konačni rezultati
    const [regija, postaviRegiju] = useState(null);         // Širina karte

    // Kontrolirani unos - upit
    const promjenaUpit = (unos) => {
        postaviUpit(unos);
    }

    // Dozvola pristupa lokaciji (Android)
    const dozvoliPristup = async () => {
        const odobrenje = await Permissions.askAsync(Permissions.LOCATION);
        if (odobrenje.status !== "granted") {
            Alert.alert(
                "Nedozvoljen pristup",
                "Morate odobriti aplikaciji pristup lokaciji kako bi mogli koristiti sve funkcionalnosti",
                [{ text: "OK" }]
            );
            return false;
        }
        return true;
    };

    // Dohvat lokacije korisničkog uređaja (Android)
    const dohvatiLokaciju = async () => {
        // ako ne dobije pristup piši kući propalo
        const pristup = await dozvoliPristup();
        if (!pristup) {
            return;
        }
        try {
            // inače dohvati trenutni položaj korisnika (kroz 5 sekundi)
            const polozaj = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });

            // postavi dobivene podatke
            postaviLokaciju({
                latitude: polozaj.coords.latitude,
                longitude: polozaj.coords.longitude,
            });
            postaviRegiju({
                latitude: polozaj.coords.latitude,
                longitude: polozaj.coords.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            })
        } catch (err) {
            console.log(err);
            Alert.alert("Nije moguće dohvatiti lokaciju", "Pokušajte ponovno", [
                { text: "OK" },
            ]);
        }
    };

    // Slanje korisničkog upita i dohvat potencijalnih kandidata
    const saljiUpit = () => {
        // prvo lociraj korisnike u zadanom radijusu
        lokacijaServis.locirajPotencijalneKandidate(lokacija, radijus)
            .then((response) => {
                // nakon toga zatraži računanje podobnosti kandidata na temelju recenzija
                lokacijaServis.dobijPreporuceneKandidate(response.data, upit)
                    .then((response) => {
                        // na kraju dohvati i postavi rezultate za prikaz
                        postaviRezultate(response.data);
                    });
            });
    }

    // Dodaj korisnički zahtjev recenzijama najpodobnijeg kandidata (sustav postaje "pametniji")

    // Operira pod pretpostavkom da će korisnik najčešće uzeti kandidata koji ima i najbolji rezultat za njegov upit
    // premda to ne mora značiti ako je korisnik zapeo na blizinu samog kandidata (drugim riječima stvarni korisnik može
    // odabrati i kandidata koji mu je na karti najbliže, a da nema nužno najbolji rezultat za njegov zahtjev)
    const odabirKandidata = () => {
        // ako je korisnik uopće dobio rezultate za svoju lokaciju
        // onda ažuriraj prvog kandidata
        if (rezultati.length > 0) {
            let id = rezultati[0].id;
            lokacijaServis.azurirajNajboljegKandidata(id, upit)
                .then((response) => {
                    console.log(response.data);
                });
            postaviRezultate(null);
            postaviUpit("");
            postaviRadijus(25.0);
        }

        // inače samo očisti stanja
        else {
            postaviRezultate(null);
            postaviUpit("");
            postaviRadijus(25.0);
        }
    }

    // Dohvat lokacije na početku
    useEffect(() => {
        dohvatiLokaciju();
    }, []);

    return (
        <View style={styles.container}>
            <GlavniNaslov naslov="ASK FOR A RECOMMENDATION" />
            <View style={styles.sadrzaj}>
                <TextInput
                    style={styles.unos}
                    placeholder="What do you want to visit?"
                    value={upit}
                    onChangeText={promjenaUpit} />

                <Text>Where are you located?</Text>
                <PrikazKarte 
                    postaviLokaciju={postaviLokaciju} 
                    regija={regija}
                    lokacija={lokacija}
                    rezultati={rezultati} />

                {
                    rezultati ?
                        <View>
                            <Button title="Return" onPress={odabirKandidata} />
                            <PreporuceneOsobe rezultati={rezultati} />
                        </View> :
                        <View style={styles.sadrzaj}>
                            <OdabirRadijusa postaviRadijus={postaviRadijus} />
                            <Button title="Get recommendation" onPress={saljiUpit} />
                        </View>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    sadrzaj: {
        paddingTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "15%",
        width: "100%",
    },
    unos: {
        backgroundColor: "#f3f3f3",
        padding: 5,
        width: "90%",
        marginBottom: "5%"
    }
});

export default PreporukaUpit;