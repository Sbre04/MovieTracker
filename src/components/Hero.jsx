import React from 'react';
import { Play, Info } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const Hero = ({ movie, onInfoClick }) => {
    const { addToWatchlist, isWatchlisted, removeFromWatchlist } = useMovieContext();

    if (!movie) return null;

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : movie.mock_image || null;

    if (!backdropPath) return null;

    const handleWatchlistClick = () => {
        if (isWatchlisted(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    return (
        <div className="relative h-[50vh] md:h-[70vh] w-full rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-2xl">
            <div className="absolute inset-0">
                <img
                    src={backdropPath}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 p-6 md:p-16 max-w-2xl w-full">
                <h1 className="text-2xl md:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg line-clamp-2">
                    {movie.title}
                </h1>
                <p className="text-sm md:text-lg text-slate-200 mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 drop-shadow-md">
                    {movie.overview}
                </p>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <button
                        onClick={handleWatchlistClick}
                        className="flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all transform active:scale-95 md:hover:scale-105 text-sm md:text-base"
                    >
                        <Play size={18} className="md:w-5 md:h-5" fill="currentColor" />
                        {isWatchlisted(movie.id) ? 'Rimuovi' : 'Aggiungi alla Lista'}
                    </button>
                    <button
                        onClick={() => onInfoClick(movie)}
                        className="flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-slate-600/80 hover:bg-slate-600 text-white rounded-lg font-semibold backdrop-blur-sm transition-all transform active:scale-95 md:hover:scale-105 text-sm md:text-base"
                    >
                        <Info size={18} className="md:w-5 md:h-5" />
                        Altre Info
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
