export const fetchPodcasts = async () => {
    try { 
        const response = await fetch(`https://podcast-api.netlify.app`);
        const data = await response.json();
        return data;
        } catch (error) {
            console.error('Error fetching podcasts:', error);
        }
}; 

export const fetchGenre = async (genreId) => {
    try { 
        const response = await fetch(`https://podcast-api.netlify.app/genre/${genreId}`);
        const data = await response.json();
        return data;
        } catch (error) {
            console.error('Error fetching genre:', error);
        }
}; 

export const fetchShow = async (showId) => {
    try { 
        const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
        const data = await response.json();
        return data;
        } catch (error) {
            console.error('Error fetching show:', error);
        }
}; 