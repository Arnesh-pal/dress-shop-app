// frontend/src/components/MobileMenu.jsx

import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Using an icon for the close button

const MobileMenu = ({ setView, toggleMenu, toggleCart }) => {

    const handleNavigate = (view) => {
        setView(view);
        toggleMenu(); // Close the menu after navigation
    };

    const handleCartClick = () => {
        toggleCart();
        toggleMenu(); // Close the menu when opening the cart
    };

    return (
        // The dark overlay. Clicking this will close the menu.
        <div className="mobile-menu-overlay" onClick={toggleMenu}>

            {/* The white menu content. Clicks inside here are stopped from closing the menu. */}
            <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>

                <button className="close-mobile-menu" onClick={toggleMenu}>
                    <FaTimes />
                </button>

                <nav>
                    <span onClick={() => handleNavigate('shop')}>Shop</span>
                    <span onClick={handleCartClick}>Cart</span>
                    {/* Add more links here if needed */}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;