// frontend/src/components/CoverPage.jsx

import React from 'react';

const CoverPage = ({ onEnter }) => {
    return (
        <div className="CoverPage">
            <div className="CoverPage__content">
                <h1>Dressify</h1>
                <p>Elegance Redefined</p>
            </div>
            <div className="CoverPage__slider-container" onClick={onEnter}>
                <div className="CoverPage__slider-track">
                    <div className="CoverPage__slider-thumb">
                        <span>&gt;</span>
                    </div>
                    <span className="CoverPage__slider-text">Slide to Explore</span>
                </div>
            </div>
        </div>
    );
};

export default CoverPage;