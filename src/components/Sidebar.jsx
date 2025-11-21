import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, CheckCircle, Film } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/watchlist', icon: List, label: 'Da Vedere' },
        { path: '/history', icon: CheckCircle, label: 'Visti' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 h-screen sticky top-0 p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
                <Film className="text-red-600 w-8 h-8" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                    MovieTracker
                </h1>
            </div>

            <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-red-600/10 text-red-500 font-medium'
                                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-600 text-center">
                    © 2025 MovieTracker
                    <br />
                    Powered by TMDB
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
