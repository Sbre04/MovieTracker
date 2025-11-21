import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, getGenres, searchPerson, discoverMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { Search, Filter } from 'lucide-react';

const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filters
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [actorName, setActorName] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [minRating, setMinRating] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (searchParams.get('filters') === 'true') {
            setShowFilters(true);
        }
    }, [searchParams]);

    useEffect(() => {
        const loadGenres = async () => {
            const genreList = await getGenres();
            setGenres(genreList);
        };
        loadGenres();
    }, []);

    // Reset page and movies when filters change
    useEffect(() => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
    }, [query, selectedGenre, actorName, selectedYear, minRating]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (page === 1) setLoading(true);
            else setLoadingMore(true);

            let results = [];

            if (selectedGenre || actorName || selectedYear || minRating > 0) {
                // Advanced Search / Discover
                let params = {};

                if (selectedGenre) params.with_genres = selectedGenre;
                if (selectedYear) params.primary_release_year = selectedYear;
                if (minRating > 0) params['vote_average.gte'] = minRating;

                if (actorName) {
                    const people = await searchPerson(actorName);

                    if (people.length > 0) {
                        // Sort by popularity to get the most famous actor (e.g. "Tom" -> "Tom Cruise")
                        const sortedPeople = people.sort((a, b) => b.popularity - a.popularity);
                        const bestMatch = sortedPeople[0];
                        params.with_cast = bestMatch.id;
                    }
                }

                results = await discoverMovies(params, page);
            } else if (query) {
                // Standard Text Search
                results = await searchMovies(query, page);
            }

            if (results.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prev => page === 1 ? results : [...prev, ...results]);
            }

            setLoading(false);
            setLoadingMore(false);
        };

        // Debounce fetch only for initial search/filter change, not pagination
        if (page === 1) {
            const timeoutId = setTimeout(() => {
                fetchMovies();
            }, 500);
            return () => clearTimeout(timeoutId);
        } else {
            fetchMovies();
        }
    }, [query, selectedGenre, actorName, selectedYear, minRating, page]);

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Search className="text-blue-500" />
                    {query ? `Risultati per "${query}"` : 'Ricerca Avanzata'}
                </h1>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <Filter size={20} />
                    Filtri
                </button>
            </div>

            {showFilters && (
                <div className="bg-slate-800 p-4 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-4">
                    <div>
                        <label className="block text-slate-400 mb-2 text-sm">Genere</label>
                        <select
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                            className="w-full bg-slate-900 text-white p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Tutti i generi</option>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-2 text-sm">Attore (es. Brad Pitt)</label>
                        <input
                            type="text"
                            value={actorName}
                            onChange={(e) => setActorName(e.target.value)}
                            placeholder="Cerca per attore..."
                            className="w-full bg-slate-900 text-white p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-2 text-sm">Anno di uscita</label>
                        <input
                            type="number"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            placeholder="Es. 2023"
                            min="1900"
                            max={new Date().getFullYear() + 5}
                            className="w-full bg-slate-900 text-white p-3 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 mb-2 text-sm">Voto Minimo: {minRating}</label>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            step="1"
                            value={minRating}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center py-20 text-slate-500">Caricamento...</div>
            ) : movies.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    <p className="text-xl">Nessun risultato trovato.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={setSelectedMovie}
                            />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {loadingMore ? 'Caricamento...' : 'Carica altri film'}
                            </button>
                        </div>
                    )}
                </>
            )}

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
};

export default SearchResults;
