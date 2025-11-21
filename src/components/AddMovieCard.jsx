import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const AddMovieCard = () => {
    return (
        <Link
            to="/search"
            className="flex flex-col items-center justify-center aspect-[2/3] bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg hover:bg-slate-800 hover:border-slate-500 transition-all group cursor-pointer"
        >
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                <Plus size={32} className="text-slate-400 group-hover:text-white" />
            </div>
            <span className="text-slate-400 font-medium group-hover:text-white">Aggiungi Film</span>
        </Link>
    );
};

export default AddMovieCard;
