import axios from 'axios';

const API_URL = 'https://cms.samespace.com/items/songs';

export const getSongs = async () => {
    const response = await axios.get(API_URL);
    console.log(response.data, '=== respnone data ====')
    console.log(typeof(response.data), '=== respnone data type of====')

    return response.data;
};
