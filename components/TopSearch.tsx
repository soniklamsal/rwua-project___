'use client';

import { useState, useEffect } from 'react';

interface TopSearchProps {
    onSearch?: (query: string) => void;
}

export default function TopSearch({ onSearch }: TopSearchProps) {
    const [searchValue, setSearchValue] = useState('');

    // Debounced search effect
    useEffect(() => {
        if (onSearch) {
            const timeoutId = setTimeout(() => {
                onSearch(searchValue);
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [searchValue, onSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission is handled by the debounced effect
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="bg-gray-50 flex justify-center items-center py-8">
            <form action="/search" className="max-w-[480px] w-full px-4" onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type="text"
                        name="q"
                        value={searchValue}
                        onChange={handleInputChange}
                        className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all duration-200"
                        placeholder="Search News & Articles..."
                    />
                    <button type="submit" className="absolute top-3.5 right-3 hover:scale-110 transition-transform duration-200">
                        <svg
                            className="text-slate-400 h-5 w-5 fill-current dark:text-slate-500"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            xmlSpace="preserve"
                        >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}