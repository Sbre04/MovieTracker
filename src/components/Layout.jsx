import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Film, Home, List, CheckCircle, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Layout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
            <Sidebar />

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/95 md:hidden flex flex-col p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <Film className="text-red-600 w-8 h-8" />
                            <h1 className="text-2xl font-bold text-white">MovieTracker</h1>
                        </div>
                        <button onClick={toggleMobileMenu} className="text-slate-400 hover:text-white">
                            <X size={28} />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <NavLink to="/" onClick={toggleMobileMenu} className={({ isActive }) => `flex items-center gap-4 text-xl py-3 px-4 rounded-lg ${isActive ? 'bg-red-600/20 text-red-500' : 'text-slate-400'}`}>
                            <Home size={24} /> Home
                        </NavLink>
                        <NavLink to="/watchlist" onClick={toggleMobileMenu} className={({ isActive }) => `flex items-center gap-4 text-xl py-3 px-4 rounded-lg ${isActive ? 'bg-red-600/20 text-red-500' : 'text-slate-400'}`}>
                            <List size={24} /> Da Vedere
                        </NavLink>
                        <NavLink to="/history" onClick={toggleMobileMenu} className={({ isActive }) => `flex items-center gap-4 text-xl py-3 px-4 rounded-lg ${isActive ? 'bg-red-600/20 text-red-500' : 'text-slate-400'}`}>
                            <CheckCircle size={24} /> Visti
                        </NavLink>
                    </nav>
                </div>
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <Navbar toggleMobileMenu={toggleMobileMenu} />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
