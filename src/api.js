import axios from 'axios';
const BASE_URl = "https://rxnav.nlm.nih.gov/REST";

export const searchDrugs = (name) => {
    return axios.get ('${BASE_URL}/drugs?name=${name}');
};

export const getSpellingSuggestions = (name) => {
    return axios.get ('${BASE_URL}/spellingsuggestions?name=${name}');
};

export const getDrugDetails = (name) => {
    return axios.get ('${BASE_URL}/rxcui?name=${name}');
};

export const getNDCs = (rxcui) => {
    return axios.get ('${BASE_URL}/rxcui/${rxcui}/ndcs');  
};
