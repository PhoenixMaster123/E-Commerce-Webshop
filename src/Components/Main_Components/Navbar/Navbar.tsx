import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoon, faSun, faSearch, faBars, faTimes, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import "./navbar.css";
import { Product } from '../../../types';
import { searchProducts } from '../../../services/api';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../auth/useAuth';

interface CategoryWithSubcategories {
  name: string;
  subcategories?: { name: string; query?: string }[];
  query?: string;
}

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [categoriesWithSubs] = useState<CategoryWithSubcategories[]>([
    {
      name: "Electronics",
      subcategories: [
        { name: "Smartphones", query: "smartphones" },
        { name: "Laptops", query: "laptops" },
        { name: "Tablets", query: "tablets" },
        { name: "Mobile Accessories", query: "mobile-accessories" },
      ],
    },
    {
      name: "Men's Fashion",
      subcategories: [
        { name: "Shirts", query: "mens-shirts" },
        { name: "Shoes", query: "mens-shoes" },
        { name: "Watches", query: "mens-watches" },
      ],
    },
    {
      name: "Women's Fashion",
      subcategories: [
        { name: "Dresses", query: "womens-dresses" },
        { name: "Shoes", query: "womens-shoes" },
        { name: "Bags", query: "womens-bags" },
        { name: "Jewellery", query: "womens-jewellery" },
        { name: "Watches", query: "womens-watches" },
        { name: "Tops", query: "tops" },
      ],
    },
    {
      name: "Beauty",
      subcategories: [
        { name: "Beauty", query: "beauty" },
        { name: "Skin Care", query: "skincare" },
        { name: "Fragrances", query: "fragrances" },
      ],
    },
    {
      name: "Home & Living",
      subcategories: [
        { name: "Furniture", query: "furniture" },
        { name: "Home Decoration", query: "home-decoration" },
        { name: "Kitchen Accessories", query: "kitchen-accessories" },
      ],
    },
    { name: "Sunglasses", query: "sunglasses" },
    { name: "Sports Accessories", query: "sports-accessories" },
    {
      name: "Automotive",
      subcategories: [
        { name: "Vehicle", query: "automotive" },
        { name: "Motorcycle", query: "motorcycle" },
      ],
    },
  ]);
  const [openSubcategories, setOpenSubcategories] = useState<{ [key: string]: boolean }>({});

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // --- Auth integration starts here ---
  const { isAuthenticated, user, logout } = useAuth(); // Destructure what you need from useAuth

  const handleLogout = () => {
    logout(); // Call the logout function from your AuthContext
    navigate('/login'); // Redirect to login page after logout
  };
  // --- Auth integration ends here ---


  const toggleTheme = (): void => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleSearch = (): void => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      searchProducts(newSearchTerm)
          .then(data => setSearchResults(data.products))
          .catch(error => console.error("Error searching products:", error));
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
    navigate(`/products?search=${encodeURIComponent(searchTerm)}&page=1`);
    setIsSearchActive(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleProductSelect = (productId: number): void => {
    navigate(`/products/${productId}`);
    setIsSearchActive(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const toggleAside = (): void => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    setIsAsideOpen(false);
  }, [navigate]);

  useEffect(() => {
    document.body.classList.toggle('aside-open', isAsideOpen);
    return () => {
      document.body.classList.remove('aside-open');
    };
  }, [isAsideOpen]);

  const toggleSubcategory = (categoryName: string) => {
    setOpenSubcategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
      <>
        <nav className='navigation'>
          <button className="aside-toggle-button" onClick={toggleAside}>
            <FontAwesomeIcon icon={faBars}/>
          </button>

          <div className="logo">
            <Link to="/">Your Shop Name/Logo</Link>
          </div>

          <ul className="main-nav">
            <li><Link to="/home">Home</Link></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
            <li className="products-button-li">
              <button className="products-button" onClick={toggleAside}>
                Products
              </button>
            </li>
            <li className="categories-button-li">
              <button className="categories-button" onClick={toggleAside}>
                Categories
              </button>
            </li>
          </ul>

          <ul className="user-actions">
            <li className="search-toggle">
              <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={toggleSearch}/>
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
                        <FontAwesomeIcon icon={faTimes}/>
                      </button>
                    </form>

                    {searchTerm && (
                        <ul className="search-results-modal">
                          {searchResults.length > 0 ? (
                              searchResults.map(product => (
                                  <li key={product.id} onClick={() => handleProductSelect(product.id)}>
                                    {product.title}
                                    {product.category && <span className="category">({product.category})</span>}
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
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon}/>
              </button>
            </li>

            {/* --- Authentication Links --- */}
            {isAuthenticated ? (
                <>
                  <li className="welcome-message">
                    {/* Display username if available */}
                    Hello, {user?.name || 'User'}!
                  </li>
                  {/* Admin Dashboard link, only if user is an admin */}
                  {user?.role === 'admin' && (
                      <li><NavLink to="/admin">Admin Dashboard</NavLink></li>
                  )}
                  <li>
                    {/* Account link (can be a profile page) */}
                    <Link to="/admin/account">Account</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="logout-button">
                      Sign Out
                    </button>
                  </li>
                </>
            ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
            )}
            {/* --- End Authentication Links --- */}

            <li><Link to="/wishlist">Wishlist</Link></li>
            <li className="cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping}/>
                <span className="cart-count">{cartCount}</span>
              </Link>
            </li>
          </ul>
        </nav>

        <aside className={`categories-aside ${isAsideOpen ? 'open' : ''}`}>
          <button className="aside-close-button" onClick={toggleAside}>
            <FontAwesomeIcon icon={faTimes}/> Close
          </button>
          <h2>Categories</h2>
          <ul>
            {categoriesWithSubs.map(category => (
                <li key={category.name} className="category-item">
                  {category.subcategories ? (
                      <>
                        <div className="main-category" onClick={() => toggleSubcategory(category.name)}>
                          {category.name}
                          <FontAwesomeIcon icon={openSubcategories[category.name] ? faCaretUp : faCaretDown} />
                        </div>
                        {openSubcategories[category.name] && (
                            <ul className="sub-categories">
                              {category.subcategories.map(sub => (
                                  <li key={sub.name}>
                                    <Link to={`/products?category=${encodeURIComponent(sub.query || sub.name)}&page=1`}>{sub.name}</Link>
                                  </li>
                              ))}
                            </ul>
                        )}
                      </>
                  ) : (
                      <Link to={`/products?category=${encodeURIComponent(category.name)}&page=1`}>{category.name}</Link>
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