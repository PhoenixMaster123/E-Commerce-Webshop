import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import * as api from '../../services/api';
import { ProductCard } from '../../Components/productCard/ProductCard';
//import { LoadingSpinner } from '../components/LoadingSpinner';
//import { ErrorMessage } from '../components/ErrorMessage';
import './ProductListPage.css';

const PRODUCTS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_DELAY = 500; // Verzögerung in Millisekunden (z.B. 500ms)

export const ProductListPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Behalte isLoading für die Datenabfrage
    const [error, setError] = useState<string | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const currentCategory = searchParams.get('category') || '';
    const currentSearchParam = searchParams.get('search') || ''; // Wert aus der URL

    // Dieser State hält den *aktuellen* Wert des Input-Feldes
    const [searchTerm, setSearchTerm] = useState(currentSearchParam);

    // Dummy-Kategorien (unverändert)
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        setCategories([
            'smartphones',
            'laptops',
            'fragrances',
            'skincare',
            'groceries',
            'home-decoration',
            'beauty',
            'electronics',
        ]);
    }, []);

    // Sync URL -> Input (unverändert)
    // Stellt sicher, dass bei Navigation (z.B. Zurück-Button im Browser) das Input-Feld den URL-Wert widerspiegelt
    useEffect(() => {
        setSearchTerm(currentSearchParam);
    }, [currentSearchParam]);

    // Datenabfrage-Logik (unverändert)
    // Diese wird immer noch durch Änderungen in den searchParams (currentPage, currentCategory, currentSearchParam) ausgelöst
    const fetchProductsData = useCallback(async () => {
        // Es ist gut, hier isLoading zu setzen, da die *Datenabfrage* beginnt
        setIsLoading(true);
        setError(null);

        try {
            const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
            let response;
            const searchFromUrl = searchParams.get('search') || ''; // Lese den tatsächlichen Suchbegriff aus der URL

            if (searchFromUrl) {
                // Suche über API basierend auf dem URL-Parameter
                response = await api.searchProducts(searchFromUrl, PRODUCTS_PER_PAGE, skip);
            } else {
                // Standard-Katalog (ggf. mit Kategorie aus URL)
                response = await api.getProducts(PRODUCTS_PER_PAGE, skip, currentCategory || undefined);
            }

            let fetched = response.products;
            let total = response.total;

            // Client-Side Filterung bleibt bestehen, falls Kategorie UND Suche aktiv sind
            if (searchFromUrl && currentCategory) {
                // Wichtig: Hier auch mit searchFromUrl filtern, falls die API nicht perfekt filtert
                // oder falls die Kategorie nur client-seitig angewendet wird, nachdem gesucht wurde.
                // Annahme: API liefert bereits nach Suchbegriff gefiltert, wir filtern nur noch Kategorie.
                fetched = fetched.filter(p => p.category === currentCategory);
                // Neuberechnung der Gesamtanzahl basierend auf dem clientseitigen Filter
                // Wenn die API die Suche UND Kategorie unterstützt, ist das evtl. nicht nötig
                total = fetched.length;
            }

            setProducts(fetched);
            setTotalProducts(total);
        } catch (err) {
            console.error(err);
            setError('Product not found or API error');
        } finally {
            setIsLoading(false); // Ladevorgang beendet
        }
    }, [currentPage, currentCategory, searchParams, setSearchParams]); // searchParams als Abhängigkeit, da wir 'search' daraus lesen

    // Effekt für die Datenabfrage (unverändert)
    useEffect(() => {
        fetchProductsData();
    }, [fetchProductsData]); // Abhängigkeit fetchProductsData reicht, da diese useCallback nutzt und ihre eigenen Deps hat


    // --- NEUER useEffect für Debounced Search ---
    useEffect(() => {
        // Starte einen Timer, wenn sich der searchTerm (aus dem Input) ändert
        const debounceTimer = setTimeout(() => {
            // Diese Funktion wird nach SEARCH_DEBOUNCE_DELAY ausgeführt,
            // *wenn* sich searchTerm in der Zwischenzeit nicht geändert hat.

            // Vergleiche den aktuellen Input-Wert mit dem Wert in der URL
            if (searchTerm !== currentSearchParam) {
                // Aktualisiere die URL-Parameter
                const newSearchParams = new URLSearchParams(searchParams);
                if (searchTerm.trim()) {
                    newSearchParams.set('search', searchTerm.trim());
                } else {
                    newSearchParams.delete('search');
                }
                newSearchParams.set('page', '1'); // Bei neuer Suche immer auf Seite 1 starten
                // Wichtig: replace: true verhindert, dass jede Eingabe einen neuen Browser-History-Eintrag erzeugt
                setSearchParams(newSearchParams, { replace: true });
            }
        }, SEARCH_DEBOUNCE_DELAY);

        // Cleanup-Funktion: Wird ausgeführt, wenn der Effekt erneut läuft (weil searchTerm sich wieder geändert hat)
        // oder wenn die Komponente unmounted wird.
        return () => {
            clearTimeout(debounceTimer); // Löscht den vorherigen Timer, bevor ein neuer gestartet wird
        };
        // Dieser Effekt hängt vom lokalen searchTerm (Input-Wert) und der setSearchParams Funktion ab.
        // Wir fügen auch searchParams und currentSearchParam hinzu, um den Vergleich durchzuführen.
    }, [searchTerm, currentSearchParam, searchParams, setSearchParams]);


    // Handler für Seitenwechsel (unverändert)
    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    // Handler für Kategorieänderung (unverändert)
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cat = e.target.value;
        const newSearchParams = new URLSearchParams(searchParams); // Kopie erstellen
        if (cat) {
            newSearchParams.set('category', cat);
        } else {
            newSearchParams.delete('category');
        }
        newSearchParams.set('page', '1'); // Bei Kategorieänderung auch auf Seite 1
        setSearchParams(newSearchParams);
    };

    // Handler für Suchfeldänderung: Aktualisiert *nur* den lokalen State
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Nur den lokalen State für das Input-Feld aktualisieren
    };

    // applySearch wird nicht mehr benötigt, da der useEffect das übernimmt

    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

    return (
        <div className="product-list-page">
            {/* Titel kann bleiben */}
            {/* <h1>Products</h1> */}

            <div className="filters">

                <input
                    id="search-input"
                    type="text"
                    className="search-input"
                    placeholder="Product search…"
                    value={searchTerm} // Bindet an den lokalen State
                    onChange={handleSearchChange} // Löst nur State-Update aus
                />
                {/* Der "GO!" Button wird entfernt */}
                {/*
                <button
                    className="search-button"
                    onClick={applySearch} // Nicht mehr benötigt
                    disabled={isLoading} // Nicht mehr benötigt
                >
                    GO!
                </button>
                */}

                <label htmlFor="category-select">Category:</label>
                <select
                    id="category-select"
                    value={currentCategory}
                    onChange={handleCategoryChange}
                    disabled={isLoading} // Optional: Deaktivieren während des Ladens
                >
                    <option value="">Show all</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Anzeige von Loading / Error / Produkten (unverändert) */}
            {isLoading && <p>Loading products...</p>} {/* Einfache Ladeanzeige */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>} {/* Einfache Fehleranzeige */}

            {!isLoading && !error && (
                <>
                    <div className="product-grid">
                        {products.length > 0 ? (
                            products.map(p => <ProductCard key={p.id} product={p} />)
                        ) : (
                            // Angepasste Nachricht, berücksichtigt Suche/Kategorie
                            <p>
                                {currentSearchParam || currentCategory
                                    ? 'No products found matching your criteria.'
                                    : 'No products available.'}
                            </p>
                        )}
                    </div>

                    {totalProducts > PRODUCTS_PER_PAGE && totalPages > 1 && ( // Zeige Paginierung nur, wenn mehr als eine Seite
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage <= 1}
                            >
                                Zurück
                            </button>
                            <span>
                                Seite {currentPage} von {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                            >
                                Weiter
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};