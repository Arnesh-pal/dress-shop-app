// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import MobileMenu from './components/MobileMenu';
import CoverPage from './components/CoverPage'; // 1. Import the new component
import './App.css';
import { FaSearch, FaBars } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState('shop');
  const [showCoverPage, setShowCoverPage] = useState(true); // 2. Add state for cover page

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('dressShopCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dressShopCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('/api/products') // Changed to relative path for production
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);


  const toggleCart = () => setIsCartVisible(!isCartVisible);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);

  // 3. Function to enter the shop
  const handleEnterShop = () => {
    setShowCoverPage(false);
  };

  // ... (keep all your existing functions: addToCart, updateQuantity, removeFromCart, etc.)
  const addToCart = (productToAdd, size) => {
    const cartItemId = `${productToAdd.id}-${size}`;
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1, size: size, cartItemId: cartItemId }];
    });
    setIsCartVisible(true);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const handleViewCart = () => {
    setIsCartVisible(false);
    setView('cart');
  };

  const handleCheckout = () => {
    setIsCartVisible(false);
    setView('checkout');
  };

  const confirmOrder = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });
      if (!response.ok) throw new Error('Checkout failed');
      const data = await response.json();
      alert(data.message);
      setCart([]);
      setView('shop');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error during checkout.');
    }
  };


  const allTags = ['all', ...new Set(products.flatMap(p => p.tags))];
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => activeFilter === 'all' || p.tags.includes(activeFilter));

  const renderView = () => {
    switch (view) {
      case 'cart':
        return <CartPage cartItems={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} setView={setView} />;
      case 'checkout':
        return <CheckoutPage cartItems={cart} confirmOrder={confirmOrder} setView={setView} />;
      case 'shop':
      default:
        return (
          <main>
            <section className="search-section">
              <div className="search-input-group"><FaSearch color="#888" /><input type="text" placeholder="Search all dresses..." onChange={(e) => setSearchTerm(e.target.value)} /></div>
              <button className="search-button">SEARCH</button>
            </section>
            <section className="filter-tags">{allTags.map(tag => (<button key={tag} className={activeFilter === tag ? 'active' : ''} onClick={() => setActiveFilter(tag)}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</button>))}</section>
            <ProductList products={filteredProducts} addToCart={addToCart} />
          </main>
        );
    }
  };

  // 4. Conditional Rendering Logic
  if (showCoverPage) {
    return <CoverPage onEnter={handleEnterShop} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => setView('shop')} style={{ cursor: 'pointer' }}>DRESSIFY</h1>
        <nav className="desktop-nav">
          <span onClick={() => setView('shop')} style={{ cursor: 'pointer' }}>Shop</span>
          <span onClick={toggleCart} style={{ cursor: 'pointer' }}>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </nav>
        <button className="menu-icon" onClick={toggleMenu}><FaBars /></button>
      </header>

      {isMenuVisible && <MobileMenu setView={setView} toggleMenu={toggleMenu} toggleCart={toggleCart} />}

      {renderView()}

      {isCartVisible &&
        <Cart
          cartItems={cart}
          toggleCart={toggleCart}
          handleCheckout={handleViewCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          handleViewCart={handleViewCart}
        />
      }
    </div>
  );
}

export default App;