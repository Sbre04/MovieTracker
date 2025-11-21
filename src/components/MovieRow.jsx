import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, onMovieClick }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-12 group/row">
            <h2 className="text-2xl font-bold text-white mb-6 px-2 border-l-4 border-red-600 pl-4">
                {title}
            </h2>

            <div className="relative">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600/80 text-white p-3 rounded-full opacity-0 group-hover/row:opacity-100 transition-all duration-300 -translate-x-1/2 ml-4 backdrop-blur-sm"
                >
                    <ChevronLeft size={24} />
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-2 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="w-[120px] lg:w-[200px] flex-shrink-0">
                            <MovieCard movie={movie} onClick={onMovieClick} />
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-red-600/80 text-white p-3 rounded-full opacity-0 group-hover/row:opacity-100 transition-all duration-300 translate-x-1/2 mr-4 backdrop-blur-sm"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
