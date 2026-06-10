import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSortBy,
  setPage,
  selectSortedProducts,
  selectSortBy,
  selectCurrentPage,
  selectItemsPerPage,
  selectLoading,
  selectError,
} from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./HomePage.scss";

export default function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector(selectSortedProducts);
  const sortBy = useSelector(selectSortBy);
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = search.trim()
    ? products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
    dispatch(setPage(1));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(setPage(1));
  };

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setPage(currentPage + 1));
  };

  return (
    <div className="home-page">
      <div className="controls-bar">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="sort-wrapper">
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="">Default</option>
            <option value="stock-desc">Stock: High to Low</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading products..." />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(fetchProducts())}
        />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <p>No products found for "<strong>{search}</strong>"</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-num ${page === currentPage ? "active" : ""}`}
                      onClick={() => dispatch(setPage(page))}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  className="page-btn"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
