import React from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie, onClick }) => {
    const { addToWatchlist, addToWatched, isWatchlisted, isWatched, removeFromWatchlist, removeFromWatched } = useMovieContext();

    const handleWatchlistClick = (e) => {
        e.stopPropagation();
        if (isWatchlisted(movie.id)) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist(movie);
        }
    };

    const handleWatchedClick = (e) => {
        e.stopPropagation();
        if (isWatched(movie.id)) {
            removeFromWatched(movie.id);
        } else {
            addToWatched(movie);
        }
    };

    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : movie.mock_image || 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div
            className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg overflow-hidden shadow-lg bg-slate-800 aspect-[2/3]"
            onClick={() => onClick(movie)}
        >
            <img
                src={posterPath}
                alt={movie.title}
                className="w-full h-full object-cover"
            />
            {/* Mobile: Always visible gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-4">
                <h3 className="text-white font-bold text-[10px] md:text-lg line-clamp-2 leading-tight">{movie.title}</h3>
                <div className="flex items-center text-yellow-400 text-[9px] md:text-sm mb-1 md:mb-2">
                    <Star size={10} className="fill-current mr-1 md:w-3.5 md:h-3.5" />
                    <span>{movie.vote_average?.toFixed(1)}</span>
                </div>

                {/* Actions - hidden on very small mobile to save space, visible on hover/desktop */}
                <div className="flex gap-1 md:gap-2 mt-1 md:mt-2 hidden md:flex">
                    <button
                        onClick={handleWatchlistClick}
                        className={`flex-1 flex items-center justify-center py-1 md:py-2 rounded-md text-[10px] md:text-sm font-medium transition-colors ${isWatchlisted(movie.id)
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                            }`}
                        title={isWatchlisted(movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                    >
                        {isWatchlisted(movie.id) ? <Check size={12} className="md:w-4 md:h-4" /> : <Plus size={12} className="md:w-4 md:h-4" />}
                    </button>
                    <button
                        onClick={handleWatchedClick}
                        className={`flex-1 flex items-center justify-center py-1 md:py-2 rounded-md text-[10px] md:text-sm font-medium transition-colors ${isWatched(movie.id)
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                            }`}
                        title={isWatched(movie.id) ? "Mark as Unwatched" : "Mark as Watched"}
                    >
                        <Check size={12} className={`md:w-4 md:h-4 ${isWatched(movie.id) ? "text-white" : "text-slate-400"}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
