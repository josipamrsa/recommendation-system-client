//----KONFIGURACIJA----//

//----Paketi----//
import axios from 'axios';

//----API pozivi----//
const locateUrl = 'https://recommendation-system-server.herokuapp.com/api/locate'; // jer nije na istom!! stoga ne moze localhost
const recommendUrl = 'https://recommendation-system-server.herokuapp.com/api/recommendation';

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
