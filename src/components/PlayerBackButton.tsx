'use client';

import { useRouter } from 'next/navigation';
import { CircleChevronLeft } from 'lucide-react';

const PlayerBackButton = () => {
    const navigate = useRouter();

    const handleBackClick = () => {
        navigate.back(); // Go back to previous page
    };

    return (
        <button
            aria-label="Back Button"
            onClick={handleBackClick}
            className="absolute z-10 text-5xl text-black bg-white m-3 md:m-4 rounded-full"
        >
            <CircleChevronLeft />
        </button>
    );
};

export default PlayerBackButton;
