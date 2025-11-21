import React, { createContext, useState, useEffect, useContext } from 'react';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [watched, setWatched] = useState(() => {
        const saved = localStorage.getItem('watched');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    useEffect(() => {
        localStorage.setItem('watched', JSON.stringify(watched));
    }, [watched]);

    const addToWatchlist = (movie) => {
        setWatchlist((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== id));
    };

    const addToWatched = (movie) => {
        setWatched((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
        // Optionally remove from watchlist when watched
        removeFromWatchlist(movie.id);
    };

    const removeFromWatched = (id) => {
        setWatched((prev) => prev.filter((m) => m.id !== id));
    };

    const isWatchlisted = (id) => watchlist.some((m) => m.id === id);
    const isWatched = (id) => watched.some((m) => m.id === id);

    return (
        <MovieContext.Provider
            value={{
                watchlist,
                watched,
                addToWatchlist,
                removeFromWatchlist,
                addToWatched,
                removeFromWatched,
                isWatchlisted,
                isWatched,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
