'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useFirebaseContext } from '@/contexts/FirebaseContext';

import GenreDropDown from './GenreDropDown';
import SearchInput from './SearchInput';
import ThemeToggler from './ThemeToggler';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { SearchIcon } from 'lucide-react';

const Header = () => {
    const navigate = useRouter();
    const { user } = useFirebaseContext();
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleNavigate = () => {
        navigate.push('/login');
    };

    const handleSearchClick = () => {
        setIsSearchVisible((prev) => !prev); // Toggle search input visibility
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate.push(`/search/${searchQuery}`);
        handleSearchClick();
    };

    return (
        <>
            <header className="w-full flex items-center justify-between backdrop-blur-2xl transition-colors py-5 px-1.5 md:px-5 bg-[#12121280] gap-4 md:gap-0 sticky z-50 top-0">
                <Link href="/">
                    <Image
                        src="/logo-dark.png"
                        alt="Logo"
                        width={120}
                        height={100}
                        className="cursor-pointer w-30 md:w-40 h-auto"
                        priority
                    />
                </Link>
                <nav className="text-white flex space-x-3 md:space-x-2 items-center">
                    <GenreDropDown />
                    <SearchInput />
                    <button
                        className="sm:hidden"
                        name="search-button"
                        onClick={handleSearchClick}
                    >
                        <SearchIcon />
                    </button>
                    <ThemeToggler />
                    {user ? (
                        <Link href="/profile">
                            <Avatar>
                                <AvatarImage
                                    src={user?.photoURL || ''}
                                    className="object-cover"
                                    alt={user?.email || 'user avatar'}
                                />
                                <AvatarFallback className="bg-black">
                                    {user?.email?.charAt(0).toLocaleUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Button onClick={handleNavigate}>Login</Button>
                    )}
                </nav>
            </header>
            {/* Conditionally render the search input below the header */}
            {isSearchVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="w-full px-4 md:px-5 py-2 bg-white shadow-md sticky top-[80px] z-40 transition-colors dark:bg-gray-900"
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-500"
                    />
                </form>
            )}
        </>
    );
};

export default Header;
