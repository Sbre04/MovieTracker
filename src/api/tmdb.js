import axios from 'axios';
import { mockMovies } from './mockData';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'it-IT',
    },
});

// Helper to check if we should use mock data
const shouldUseMock = () => !API_KEY || API_KEY === 'your_api_key_here';

export const getTrendingMovies = async () => {
    if (shouldUseMock()) {
        console.warn("Using mock data for trending movies (No API Key)");
        return mockMovies;
    }
    try {
        const response = await tmdb.get('/trending/movie/week');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        return mockMovies; // Fallback on error too
    }
};

export const getNowPlayingMovies = async () => {
    if (shouldUseMock()) return mockMovies;
    try {
        const response = await tmdb.get('/movie/now_playing');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching now playing movies:", error);
        return mockMovies;
    }
};

export const getMovieRecommendations = async (id) => {
    if (shouldUseMock()) return mockMovies.slice(0, 3);
    try {
        const response = await tmdb.get(`/movie/${id}/recommendations`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return mockMovies.slice(0, 3);
    }
};

export const getPopularMovies = async () => {
    if (shouldUseMock()) return mockMovies;
    try {
        const response = await tmdb.get('/movie/popular');
        return response.data.results;
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return mockMovies;
    }
}

export const searchMovies = async (query, page = 1) => {
    if (shouldUseMock()) {
        // Mock pagination: return all on page 1, empty on others
        if (page > 1) return [];
        return mockMovies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
    }
    try {
        const response = await tmdb.get('/search/movie', {
            params: { query, page },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};

export const getMovieDetails = async (id) => {
    if (shouldUseMock()) return mockMovies.find(m => m.id === parseInt(id));
    try {
        const response = await tmdb.get(`/movie/${id}`, {
            params: {
                append_to_response: 'credits'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
}

export const getMovieVideos = async (id) => {
    if (shouldUseMock()) return []; // Mock data doesn't have real videos usually
    try {
        const response = await tmdb.get(`/movie/${id}/videos`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching movie videos:", error);
        return [];
    }
};

export const getGenres = async () => {
    if (shouldUseMock()) return [];
    try {
        const response = await tmdb.get('/genre/movie/list');
        return response.data.genres;
    } catch (error) {
        console.error("Error fetching genres:", error);
        return [];
    }
};

export const searchPerson = async (query) => {
    if (shouldUseMock()) return [];
    try {
        const response = await tmdb.get('/search/person', { params: { query } });
        return response.data.results;
    } catch (error) {
        console.error("Error searching person:", error);
        return [];
    }
};

export const discoverMovies = async (params, page = 1) => {
    if (shouldUseMock()) {
        if (page > 1) return [];
        return mockMovies;
    }
    try {
        const response = await tmdb.get('/discover/movie', { params: { ...params, page } });
        return response.data.results;
    } catch (error) {
        console.error("Error discovering movies:", error);
        return [];
    }
};

export default tmdb;
