import React from 'react';

// Correct prop name is 'handleViewCart'
const Cart = ({ cartItems, toggleCart, handleViewCart, updateQuantity, removeFromCart }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-overlay" onClick={toggleCart}>
            {/* This stopPropagation is important to prevent the cart from closing when you click inside it */}
            <div className="cart-container" onClick={(e) => e.stopPropagation()}>

                <div className="cart-header">
                    <h2>Shopping Cart</h2>
                    <button className="close-cart-btn" onClick={toggleCart}>×</button>
                </div>

                <div className="cart-items-list">
                    {cartItems.length === 0 ? (
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.cartItemId} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>Size: {item.size}</p>
                                    <p>Price: ₹{item.price.toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.cartItemId, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.cartItemId, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-item-btn" onClick={() => removeFromCart(item.cartItemId)}>×</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="cart-actions">
                        {/* This button now correctly calls the handleViewCart prop */}
                        <button className="view-cart-btn-footer" onClick={handleViewCart}>VIEW CART</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;