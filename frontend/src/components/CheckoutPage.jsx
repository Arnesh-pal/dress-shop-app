import React from 'react';

const CheckoutPage = ({ cartItems, confirmOrder, setView }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <main className="checkout-page">
            <h1>Confirm Your Order</h1>
            <div className="checkout-container">
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {cartItems.map(item => (
                        <div key={item.cartItemId} className="summary-item">
                            <span>{item.name} (Size: {item.size}) x {item.quantity}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="summary-total">
                        <strong>Total</strong>
                        <strong>₹{totalPrice.toFixed(2)}</strong>
                    </div>
                </div>
                <div className="deals-section">
                    <h2>Apply Deals</h2>
                    <div className="deal-placeholder">
                        <p>Select a deal to apply to your order.</p>
                        <select>
                            <option>10% Off Entire Order</option>
                            <option>Free Shipping</option>
                            <option>$5 Off Summer Dresses</option>
                        </select>
                    </div>
                    <button className="confirm-order-btn" onClick={confirmOrder}>
                        Confirm & Pay
                    </button>
                    <button className="back-to-shop-btn" onClick={() => setView('shop')}>
                        ← Back to Shop
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;