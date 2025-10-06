import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import MobileMenu from './components/MobileMenu';
import './App.css';
import { FaSearch, FaBars } from 'react-icons/fa';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('shopping-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- 2. ADD NEW STATE
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [view, setView] = useState('shop');

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch products:", err));
  }, []);

  const toggleCart = () => setIsCartVisible(!isCartVisible);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // <-- 3. ADD NEW TOGGLE FUNCTION

  // ... (All your other functions like addToCart, updateQuantity, etc. remain the same)
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
      prevCart.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const handleViewCart = () => {
    setIsCartVisible(false);
    setView('cart');
  };

  const confirmOrder = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>DRESS SHOP</h1>
        <nav>
          <span onClick={() => setView('shop')} style={{ cursor: 'pointer' }}>Shop</span>
          <span onClick={toggleCart} style={{ cursor: 'pointer' }}>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </nav>
        {/* 4. CONNECT ONCLICK TO HAMBURGER BUTTON */}
        <button className="menu-icon" onClick={toggleMobileMenu}><FaBars /></button>
      </header>

      {renderView()}

      {isCartVisible &&
        <Cart
          cartItems={cart}
          toggleCart={toggleCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          handleViewCart={handleViewCart}
        />
      }

      {/* 5. CONDITIONALLY RENDER THE MOBILE MENU */}
      {isMobileMenuOpen &&
        <MobileMenu
          setView={setView}
          toggleCart={toggleCart}
          toggleMobileMenu={toggleMobileMenu}
        />
      }
    </div>
  );
}

export default App;