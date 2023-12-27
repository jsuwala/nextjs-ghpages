import axios from 'axios';

const API_BASE_URL = 'https://acri.blob.core.windows.net/acri/stac'; // Replace with your STAC API base URL

export const fetchCatalog = async (): Promise<any> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/catalog.json`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Catalog:', response.data); // Add this line
        return response.data;
    } catch (error) {
        console.error('Error fetching catalog:', error);
        throw error;
    }
};
