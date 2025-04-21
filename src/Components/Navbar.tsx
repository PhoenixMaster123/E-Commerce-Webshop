import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoon, faSun, faSearch, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import "./navbar.css";

interface Product {
  id: number;
  title: string;
  category: string;
}

interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSearch = (): void => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    } else if (isSearchActive) {
      setSearchTerm('');
    }
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    setIsSearchActive(false);
    setSearchTerm('');
  };

  const handleProductSelect = (productId: number): void => {
    navigate(`/products/${productId}`);
    setIsSearchActive(false);
    setSearchTerm('');
  };

  const toggleAside = (): void => {
    setIsAsideOpen(!isAsideOpen);
  };

  useEffect(() => {
    setIsAsideOpen(false);
  }, [navigate]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const data: ApiResponse = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts: Product[] = products
      .filter(product =>
          searchTerm &&
          product.title.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
          product.category.toLowerCase() !== 'groceries'
      )
      .slice(0, 10);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isAsideOpen) {
      document.body.classList.add('aside-open');
    } else {
      document.body.classList.remove('aside-open');
    }
    return () => {
      document.body.classList.remove('aside-open');
    };
  }, [isAsideOpen]);


  return (
      <>
        <nav>
          {}
          <button className="aside-toggle-button" onClick={toggleAside}>
            <FontAwesomeIcon icon={faBars} />
          </button>

          <div className="logo">
            <Link to="/">Your Shop Name/Logo</Link>
          </div>

          <ul className="main-nav">
            <li><Link to="/home">Home</Link></li>
            <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
            {}
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
                          {filteredProducts.length > 0 ? (
                              filteredProducts.map(product => (
                                  <li key={product.id} onClick={() => handleProductSelect(product.id)}>
                                    {product.title} <span className="category">({product.category})</span>
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


            {/* Theme Toggle */}
            <li className="theme-toggle">
              <button onClick={toggleTheme} className="theme-button">
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              </button>
            </li>

            {/* Other User Actions */}
            <li><Link to="/login">Account</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li className="cart">
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
                <span className="cart-count">0</span>
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
            <li className="sub-dropdown">
              <a>Electronics</a>
              <ul>
                <li><Link to="/products/smartphones">Smartphones</Link></li>
                <li><Link to="/products/laptops">Laptops</Link></li>
                <li><Link to="/products/tablets">Tablets</Link></li>
                <li><Link to="/products/mobile-accessories">Mobile Accessories</Link></li>
              </ul>
            </li>

            {/* Men's Fashion */}
            <li className="sub-dropdown">
              <a>Men's Fashion</a>
              <ul>
                <li><Link to="/products/mens-shirts">Shirts</Link></li>
                <li><Link to="/products/mens-shoes">Shoes</Link></li>
                <li><Link to="/products/mens-watches">Watches</Link></li>
              </ul>
            </li>

            {/* Women's Fashion */}
            <li className="sub-dropdown">
              <a>Women's Fashion</a>
              <ul>
                <li><Link to="/products/womens-dresses">Dresses</Link></li>
                <li><Link to="/products/womens-shoes">Shoes</Link></li>
                <li><Link to="/products/womens-bags">Bags</Link></li>
                <li><Link to="/products/womens-jewellery">Jewellery</Link></li>
                <li><Link to="/products/womens-watches">Watches</Link></li>
                <li><Link to="/products/tops">Tops</Link></li>
              </ul>
            </li>

            {/* Beauty & Personal Care */}
            <li className="sub-dropdown">
              <a>Beauty</a>
              <ul>
                <li><Link to="/products/beauty">Beauty</Link></li>
                <li><Link to="/products/skin-care">Skin Care</Link></li>
                <li><Link to="/products/fragrances">Fragrances</Link></li>
              </ul>
            </li>

            {/* Home & Living */}
            <li className="sub-dropdown">
              <a>Home & Living</a>
              <ul>
                <li><Link to="/products/furniture">Furniture</Link></li>
                <li><Link to="/products/home-decoration">Home Decoration</Link></li>
                <li><Link to="/products/kitchen-accessories">Kitchen Accessories</Link></li>
              </ul>
            </li>

            {/* Standalone Categories */}
            <li><Link to="/products/sunglasses">Sunglasses</Link></li>
            <li><Link to="/products/sports-accessories">Sports Accessories</Link></li>

            {/* Automotive */}
            <li className="sub-dropdown">
              <a>Automotive</a>
              <ul>
                <li><Link to="/products/vehicle">Vehicle</Link></li>
                <li><Link to="/products/motorcycle">Motorcycle</Link></li>
              </ul>
            </li>
          </ul>
        </aside>
        {isAsideOpen && <div className="aside-overlay" onClick={toggleAside}></div>}
      </>
  );
};

export default Navbar;