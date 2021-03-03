//----KONFIGURACIJA----//

//----Paketi----//
import axios from 'axios';

//----API pozivi----//
/* const locateUrl = 'https://recommendation-system-server.herokuapp.com/api/locate'; 
const recommendUrl = 'https://recommendation-system-server.herokuapp.com/api/recommendation'; */

const locateUrl = 'http://192.168.0.11:3001/api/locate'; 
const recommendUrl = 'http://192.168.0.11:3001/api/recommendation';


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
