// src/components/Navbar/Navbar.tsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faMoon,
  faSun,
  faSearch,
  faBars,
  faTimes,
  faCaretDown,
  faCaretUp,
  faUser,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
import { Product } from '../../../types/index';
import { searchProducts, getMe, logoutUser } from '../../../services/api';
import { useCart } from '../../../contexts/CartContext';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { User } from '../../../types';

interface CategoryWithSubcategories {
  name: string;
  subcategories?: { name: string; query?: string }[];
  query?: string;
}

const Navbar: React.FC = () => {
  // Theme
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  // User
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Search
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Aside / Categories
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [openSubcategories, setOpenSubcategories] = useState<{ [key: string]: boolean }>({});
  const [categoriesWithSubs] = useState<CategoryWithSubcategories[]>([
    { name: "Electronics", subcategories: [
        { name: "Smartphones", query: "smartphones" },
        { name: "Laptops", query: "laptops" },
        { name: "Tablets", query: "tablets" },
        { name: "Mobile Accessories", query: "mobile-accessories" },
      ],
    },
    { name: "Men's Fashion", subcategories: [
        { name: "Shirts", query: "mens-shirts" },
        { name: "Shoes", query: "mens-shoes" },
        { name: "Watches", query: "mens-watches" },
      ],
    },
    { name: "Women's Fashion", subcategories: [
        { name: "Dresses", query: "womens-dresses" },
        { name: "Shoes", query: "womens-shoes" },
        { name: "Bags", query: "womens-bags" },
        { name: "Jewellery", query: "womens-jewellery" },
        { name: "Watches", query: "womens-watches" },
        { name: "Tops", query: "tops" },
      ],
    },
    { name: "Beauty", subcategories: [
        { name: "Beauty", query: "beauty" },
        { name: "Skin Care", query: "skincare" },
        { name: "Fragrances", query: "fragrances" },
      ],
    },
    { name: "Home & Living", subcategories: [
        { name: "Furniture", query: "furniture" },
        { name: "Home Decoration", query: "home-decoration" },
        { name: "Kitchen Accessories", query: "kitchen-accessories" },
      ],
    },
    { name: "Sunglasses", query: "sunglasses" },
    { name: "Sports Accessories", query: "sports-accessories" },
    { name: "Automotive", subcategories: [
        { name: "Vehicle", query: "automotive" },
        { name: "Motorcycle", query: "motorcycle" },
      ],
    },
  ]);

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();

  // --- Effects ---
  // Load current user
  useEffect(() => {
    getMe()
        .then(user => setCurrentUser(user))
        .catch(() => setCurrentUser(null));
  }, []);

  // Close aside on route change
  useEffect(() => {
    setIsAsideOpen(false);
  }, [navigate]);

  // Body class for aside
  useEffect(() => {
    document.body.classList.toggle('aside-open', isAsideOpen);
    return () => { document.body.classList.remove('aside-open'); };
  }, [isAsideOpen]);

  // --- Handlers ---
  const toggleSearch = (): void => {
    setIsSearchActive(prev => !prev);
    if (!isSearchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setSearchTerm(val);
    if (val) {
      searchProducts(val)
          .then(data => setSearchResults(data.products))
          .catch(err => console.error(err));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchTerm)}&page=1`);
    setIsSearchActive(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleProductSelect = (id: number): void => {
    navigate(`/products/${id}`);
    setIsSearchActive(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const toggleAside = (): void => setIsAsideOpen(prev => !prev);

  const toggleSubcategory = (cat: string) => {
    setOpenSubcategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
      <>
        <nav className='navigation'>
          <button className="aside-toggle-button" onClick={toggleAside}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="logo"><Link to="/">MyShop</Link></div>

          <ul className="main-nav">
            <li><Link to="/home">Home</Link></li>
            <li>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                Products
              </NavLink>
            </li>
            <li className="products-button-li">
              <button className="products-button" onClick={toggleAside}>Products</button>
            </li>
            <li className="categories-button-li">
              <button className="categories-button" onClick={toggleAside}>Categories</button>
            </li>
          </ul>

          <ul className="user-actions">
            <li className="search-toggle">
              <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={toggleSearch} />
            </li>
            {isSearchActive && (
                <div className="search-modal">
                  <div className="search-modal-content">
                    <form onSubmit={handleSearchSubmit} className="search-modal-form">
                      <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={handleSearchInputChange}
                          className="search-input"
                      />
                      <button type="button" onClick={toggleSearch} className="close-modal-button">
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </form>
                    {searchTerm && (
                        <ul className="search-results-modal">
                          {searchResults.length > 0 ? (
                              searchResults.map(p => (
                                  <li key={p.id} onClick={() => handleProductSelect(p.id)}>
                                    {p.title}{p.category && <span className="category">({p.category})</span>}
                                  </li>
                              ))
                          ) : (
                              <li>No products found</li>
                          )}
                        </ul>
                    )}
                  </div>
                  <div className="search-modal-overlay" onClick={toggleSearch}></div>
                </div>
            )}
            <li className="theme-toggle">
              <button onClick={toggleTheme} className="theme-button">
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>
            </li>

            {currentUser ? (
                <li className="user-name logout-button-li">
                  <span className="greeting-text">Hallo, {currentUser.username}</span>
                  <button
                      onClick={() => {
                        logoutUser();
                        setCurrentUser(null);
                        navigate('/');
                      }}
                      className="logout-button"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span className="logout-text">Logout</span>
                  </button>
                </li>
            ) : (
                <li className="login-button-li">
                  <Link to="/login" className="login-button">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="login-text">Login</span>
                  </Link>
                </li>
            )}
            <li className="cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="cart-count">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </nav>

        <aside className={`categories-aside ${isAsideOpen ? 'open' : ''}`}>
          <button className="aside-close-button" onClick={toggleAside}>
            <FontAwesomeIcon icon={faTimes} /> Close
          </button>
          <h2>Categories</h2>
          <ul>
            {categoriesWithSubs.map(cat => (
                <li key={cat.name} className="category-item">
                  {cat.subcategories ? (
                      <>
                        <div className="main-category" onClick={() => toggleSubcategory(cat.name)}>
                          {cat.name}
                          <FontAwesomeIcon icon={openSubcategories[cat.name] ? faCaretUp : faCaretDown} />
                        </div>
                        {openSubcategories[cat.name] && (
                            <ul className="sub-categories">
                              {cat.subcategories.map(sub => (
                                  <li key={sub.name}>
                                    <Link to={`/products?category=${encodeURIComponent(sub.query||sub.name)}&page=1`}>
                                      {sub.name}
                                    </Link>
                                  </li>
                              ))}
                            </ul>
                        )}
                      </>
                  ) : (
                      <Link to={`/products?category=${encodeURIComponent(cat.name)}&page=1`}>{cat.name}</Link>
                  )}
                </li>
            ))}
          </ul>
        </aside>
        {isAsideOpen && <div className="aside-overlay" onClick={toggleAside}></div>}
      </>
  );
};

export default Navbar;
