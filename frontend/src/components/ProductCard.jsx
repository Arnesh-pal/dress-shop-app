import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
    const [selectedSize, setSelectedSize] = useState(null); // State to track selected size
    const sizes = ['S', 'M', 'L']; // Available sizes

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size first!');
            return;
        }
        // Pass both the product and the selected size to the addToCart function
        addToCart(product, selectedSize);
        setSelectedSize(null); // Reset size selection after adding
    };

    return (
        <div className="product-card">
            <div className="product-tags">
                {product.tags.map(tag => (
                    <span key={tag} className="product-tag">{tag.toUpperCase()}</span>
                ))}
            </div>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <div className="price-info">
                <span>₹{product.price.toFixed(2)}</span>
                <div className="size-selector">
                    {sizes.map(size => (
                        <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                ADD TO CART +
            </button>
        </div>
    );
};

export default ProductCard;