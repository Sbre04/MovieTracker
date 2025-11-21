import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ toggleMobileMenu }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Reset search query when navigating away from search page
    useEffect(() => {
        if (!location.pathname.startsWith('/search')) {
            setQuery('');
        }
    }, [location.pathname]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 md:px-8">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 text-slate-400 hover:text-white"
                >
                    <Menu size={24} />
                </button>

                <div className="flex-1 max-w-xl mx-auto md:mx-0 md:mr-auto pl-4 md:pl-0">
                    <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Cerca film..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-slate-800 text-slate-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600/50 transition-all placeholder:text-slate-500 text-sm md:text-base"
                        />
                    </form>
                </div>

                <div className="hidden md:flex items-center gap-4 ml-4">
                    <button
                        onClick={() => navigate('/search?filters=true')}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                        title="Filtri Avanzati"
                    >
                        <Filter size={24} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
