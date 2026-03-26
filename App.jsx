import { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showAboutUs,     setShowAboutUs]     = useState(false);
  const [showCart,        setShowCart]         = useState(false);

  /* ── Navigation handlers ── */
  const handleGetStarted      = () => { setShowProductList(true);  setShowAboutUs(false); setShowCart(false); };
  const handleAboutUs         = () => { setShowAboutUs(true);      setShowProductList(false); setShowCart(false); };
  const handleContinueShopping= () => { setShowProductList(true);  setShowAboutUs(false); setShowCart(false); };
  const handleCartClick       = () => { setShowCart(true);         setShowProductList(false); setShowAboutUs(false); };
  const handleCheckout        = () => { alert('Thank you for your purchase! 🌿'); };
  const handleHome            = () => { setShowProductList(false); setShowAboutUs(false); setShowCart(false); };

  /* ── Render product list page ── */
  if (showProductList && !showCart) {
    return (
      <div className="app">
        <ProductList
          onNavigateToCart={handleCartClick}
          onHome={handleHome}
        />
      </div>
    );
  }

  /* ── Render about us page ── */
  if (showAboutUs && !showCart) {
    return (
      <div className="app">
        <div style={{ padding: '2rem', textAlign: 'right', background: '#0d160d' }}>
          <button className="btn btn--outline" onClick={handleHome} style={{ marginRight: '1rem' }}>← Home</button>
          <button className="btn btn--primary" onClick={handleGetStarted}>Shop Plants</button>
        </div>
        <AboutUs />
      </div>
    );
  }

  /* ── Render cart page ── */
  if (showCart) {
    return (
      <div className="app">
        <CartItem
          onContinueShopping={handleContinueShopping}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  /* ── Render landing page ── */
  return (
    <div className="app">
      {/* Hero with background image */}
      <div className="background-image">
        {/* Navbar */}
        <nav className="navbar">
          <span className="navbar__logo" onClick={handleHome} style={{ cursor: 'pointer' }}>
            Paradise<span>Nursery</span>
          </span>
          <ul className="navbar__links">
            <li><span onClick={handleGetStarted} style={{ cursor: 'pointer' }}>Shop</span></li>
            <li><span onClick={handleAboutUs}    style={{ cursor: 'pointer' }}>About</span></li>
          </ul>
          <button className="navbar__cart" onClick={handleCartClick}>
            🛒 Cart
          </button>
        </nav>

        {/* Hero content */}
        <div className="hero">
          <div className="hero__content">
            <p className="hero__eyebrow">Est. 2018 · Hanoi, Vietnam</p>

            {/* Company name as required */}
            <h1 className="hero__title">
              Welcome to Paradise Nursery
            </h1>

            <p className="hero__subtitle">Where Every Leaf Tells a Story</p>

            <div className="hero__divider" />

            <p className="hero__description">
              Bring nature indoors. We curate rare and beloved houseplants,
              delivered with care to transform your space into a living sanctuary.
            </p>

            <div className="hero__actions">
              {/* Get Started button — sets showProductList state to true */}
              <button
                className="btn btn--primary"
                onClick={handleGetStarted}
              >
                🌿 Get Started
              </button>

              <button
                className="btn btn--outline"
                onClick={handleAboutUs}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features strip */}
      <div className="features">
        <div className="feature-card">
          <span className="feature-card__icon">🌱</span>
          <h3 className="feature-card__title">Sustainably Grown</h3>
          <p className="feature-card__text">Every plant is nurtured using eco-conscious practices from seed to doorstep.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">📦</span>
          <h3 className="feature-card__title">Safe Delivery</h3>
          <p className="feature-card__text">Custom packaging ensures your plants arrive healthy and stress-free.</p>
        </div>
        <div className="feature-card">
          <span className="feature-card__icon">💬</span>
          <h3 className="feature-card__title">Expert Support</h3>
          <p className="feature-card__text">Our botanists are on hand to help your plants — and you — thrive.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer__logo">ParadiseNursery</p>
        <p className="footer__tagline">Grow Something Beautiful</p>
        <div className="footer__divider" />
        <p className="footer__copy">
          © {new Date().getFullYear()} Paradise Nursery · e-plantShopping · All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
