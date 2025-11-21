import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Play, Heart } from 'lucide-react';
import { useMovieContext } from '../context/MovieContext';
import { getMovieVideos } from '../api/tmdb';

const MovieModal = ({ movie, onClose }) => {
    const { addToWatchlist, addToWatched, isWatchlisted, isWatched, removeFromWatchlist, removeFromWatched } = useMovieContext();
    const [trailerKey, setTrailerKey] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const fetchTrailer = async () => {
            if (movie?.id) {
                const videos = await getMovieVideos(movie.id);
                const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.find(v => v.site === 'YouTube');
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            }
        };
        fetchTrailer();
    }, [movie]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!movie) return null;

    const backdropPath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : movie.mock_image || null;

    const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : movie.mock_image || 'https://via.placeholder.com/500x750?text=No+Image';

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl h-[85vh] md:max-h-[90vh] md:h-auto overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-600 rounded-full text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="relative h-48 md:h-96">
                    {showPlayer && trailerKey ? (
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <>
                            {backdropPath ? (
                                <img
                                    src={backdropPath}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                    <span className="text-slate-500">No Backdrop Available</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                            {trailerKey && (
                                <button
                                    onClick={() => setShowPlayer(true)}
                                    className="absolute inset-0 flex items-center justify-center group"
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                                        <Play size={32} className="text-white fill-white ml-1" />
                                    </div>
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="p-6 md:p-8 -mt-12 md:-mt-20 relative">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <img
                            src={posterPath}
                            alt={movie.title}
                            className="w-24 md:w-48 rounded-lg shadow-lg border-2 border-slate-700 hidden md:block"
                        />

                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h2 className="text-2xl md:text-4xl font-bold text-white">{movie.title}</h2>
                                <button
                                    onClick={() => isWatchlisted(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                                    className="p-2 rounded-full hover:bg-slate-800 transition-colors"
                                    title={isWatchlisted(movie.id) ? 'Rimuovi da Da Vedere' : 'Aggiungi a Da Vedere'}
                                >
                                    <Heart
                                        size={28}
                                        className={`transition-colors ${isWatchlisted(movie.id) ? 'fill-red-600 text-red-600' : 'text-white'}`}
                                    />
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-6 text-sm md:text-base">
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={16} className="md:w-[18px] md:h-[18px]" fill="currentColor" />
                                    <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
                                    <span>{movie.release_date?.split('-')[0]}</span>
                                </div>
                                {movie.adult && (
                                    <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">18+</span>
                                )}
                            </div>

                            <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-8">
                                {movie.overview || "Nessuna trama disponibile."}
                            </p>

                            <div className="flex flex-col md:flex-row gap-3 md:gap-4 pb-8 md:pb-0">
                                <button
                                    onClick={() => isWatched(movie.id) ? removeFromWatched(movie.id) : addToWatched(movie)}
                                    className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors text-sm md:text-base ${isWatched(movie.id)
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-slate-700 text-white hover:bg-slate-600'
                                        }`}
                                >
                                    {isWatched(movie.id) ? 'Visto' : 'Segna come Visto'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;
