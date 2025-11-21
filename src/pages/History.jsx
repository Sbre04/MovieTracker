import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import { CheckCircle } from 'lucide-react';
import AddMovieCard from '../components/AddMovieCard';

const History = () => {
    const { watched } = useMovieContext();
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Film Visti
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {watched.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={setSelectedMovie}
                    />
                ))}
                <AddMovieCard />
            </div>

            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
};

export default History;
