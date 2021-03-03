//----KONFIGURACIJA----//

//----Paketi----//
import axios from 'axios';

//----API pozivi----//
const locateUrl = 'http://192.168.43.71:3001/api/locate'; // jer nije na istom!! stoga ne moze localhost
const recommendUrl = 'http://192.168.43.71:3001/api/recommendation';

//----METODE----//

// Dohvati sve kandidate u blizini korisnika
const locirajPotencijalneKandidate = async (loc, rad) => {
    const lokacija = {
        latitude: loc.latitude,
        longitude: loc.longitude,
        radius: rad
    }

    const kandidati = await axios.post(locateUrl, lokacija);
    return kandidati;
}

// Dohvati preporuke za kandidate
const dobijPreporuceneKandidate = async (locirani, zahtjev) => {
    const preporuka = await axios.post(recommendUrl, { zahtjev, locirani });
    return preporuka;
}

// Ažuriraj najboljeg kandidata (najviši score)
const azurirajNajboljegKandidata = async (id, zahtjev) => {
    const azuriraj = await axios.put(locateUrl, { id: id, query: zahtjev });
    return azuriraj;
}

export default {
    locirajPotencijalneKandidate,
    dobijPreporuceneKandidate,
    azurirajNajboljegKandidata
}
