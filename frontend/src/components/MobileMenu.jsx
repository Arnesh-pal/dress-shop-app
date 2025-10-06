import React from 'react';

const MobileMenu = ({ setView, toggleCart, toggleMobileMenu }) => {
    // Helper to handle navigation and close the menu
    const handleNavigate = (viewName) => {
        setView(viewName);
        toggleMobileMenu();
    };

    const handleCartClick = () => {
        toggleCart();
        toggleMobileMenu();
    };

    return (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
            <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-mobile-menu" onClick={toggleMobileMenu}>×</button>
                <nav>
                    <a onClick={() => handleNavigate('shop')}>Shop</a>
                    <a onClick={handleCartClick}>Cart</a>
                    {/* You can add more links here later, like 'About' or 'Contact' */}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;