import axios from 'axios';

export const searchArticles = async (query) => {
    try {
        const response = await axios.get(`https://doaj.org/api/search/articles/${encodeURIComponent(query)}`, {
            params: {
                page: 1,
                pageSize: 4
            },
            headers: {
                "Accept": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}