import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import MovieModal from '../components/MovieModal';
import { getTrendingMovies, getNowPlayingMovies, getMovieRecommendations, getPopularMovies } from '../api/tmdb';
import { useMovieContext } from '../context/MovieContext';

const Home = () => {
    const [trending, setTrending] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const { watched } = useMovieContext();

    useEffect(() => {
        const fetchData = async () => {
            const [trendingData, nowPlayingData] = await Promise.all([
                getTrendingMovies(),
                getNowPlayingMovies(),
            ]);
            setTrending(trendingData);
            setNowPlaying(nowPlayingData);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (watched.length > 0) {
                const lastWatched = watched[watched.length - 1];
                const recs = await getMovieRecommendations(lastWatched.id);
                setRecommendations(recs);
            } else {
                const popular = await getPopularMovies();
                setRecommendations(popular);
            }
        };
        fetchRecommendations();
    }, [watched]);

    const heroMovie = trending.length > 0 ? trending[0] : null;

    return (
        <div className="pb-20">
            <Hero movie={heroMovie} onInfoClick={setSelectedMovie} />

            <MovieRow
                title="Nuove Uscite"
                movies={nowPlaying}
                onMovieClick={setSelectedMovie}
            />

            <MovieRow
                title={watched.length > 0 ? "Consigliati per Te" : "Popolari su MovieTracker"}
                movies={recommendations}
                onMovieClick={setSelectedMovie}
            />

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
};

export default Home;
