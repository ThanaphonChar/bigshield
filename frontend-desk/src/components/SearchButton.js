import React, { useState, useEffect } from 'react';

const SearchButton = ({ map, Household, onSearchFocus, onBlurFocus, setSelectedMarker }) => {
    const [searchInput, setSearchInput] = useState(''); // State for the search input
    const [savedPosition, setSavedPosition] = useState(null);

    const handleSearch = (term) => {
        const searchTerms = term.split(" ").map(t => t.trim().toLowerCase());

        const item = Household.find(item => {
            const name = item.household_members[0].first_name.toLowerCase();
            const surname = item.household_members[0].last_name.toLowerCase();

            return searchTerms.every(searchTerm =>
                name.includes(searchTerm) || surname.includes(searchTerm)
            );
        });

        if (item) {
            const position = {
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude),
            };

            if (map) {
                map.setCenter(position);
                map.setZoom(14);

                // ตั้งค่า marker ที่เลือก
                setSelectedMarker({ item });
            } else {
                console.warn('Map instance not loaded yet. Saving position for later.');
                setSavedPosition(position); // บันทึกตำแหน่ง
            }
        } else {
            alert('No matching data found');
        }
    };

    useEffect(() => {
        if (map && savedPosition) {
            map.setCenter(savedPosition);
            map.setZoom(14);
            setSavedPosition(null); // ล้างตำแหน่งหลังจากซูม
        }
    }, [map, savedPosition]);

    return (
        <div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-96 transition-all duration-300">
                {/* Search Input */}
                <input
                    type="text"
                    className="w-96 py-2 px-4 rounded-full border shadow-lg focus:outline-none transition-all duration-300 ease-in-out transform origin-center"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update input value
                    onKeyDown={(event) => event.key === 'Enter' && handleSearch(searchInput)} // Detect Enter key press
                    onFocus={onSearchFocus} // Callback for focus
                // onBlur={onBlurFocus} // Callback for blur
                />
            </div>
        </div>
    );
};

export default SearchButton;
