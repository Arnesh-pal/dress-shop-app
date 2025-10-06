import React from 'react';

const CartPage = ({ cartItems, updateQuantity, removeFromCart, setView }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty.</p>
                    <button onClick={() => setView('shop')}>Continue Shopping</button>
                </div>
            ) : (
                <div className="cart-page-container">
                    <div className="cart-page-items">
                        {cartItems.map(item => (
                            <div key={item.cartItemId} className="cart-page-item">
                                <img src={item.imageUrl} alt={item.name} />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Size: {item.size}</p>
                                    <button className="remove-btn-page" onClick={() => removeFromCart(item.cartItemId)}>Remove</button>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => updateQuantity(item.cartItemId, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.cartItemId, 1)}>+</button>
                                </div>
                                <div className="item-price">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-page-summary">
                        <h2>Summary</h2>
                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div className="summary-total-line">
                            <strong>Total</strong>
                            <strong>₹{totalPrice.toFixed(2)}</strong>
                        </div>
                        <button className="proceed-checkout-btn" onClick={() => setView('checkout')}>
                            Proceed to Checkout
                        </button>
                        <button className="continue-shopping-btn" onClick={() => setView('shop')}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default CartPage;