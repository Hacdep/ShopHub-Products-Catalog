import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
  selectSelectedProduct,
  selectDetailLoading,
  selectDetailError,
} from "../store/productsSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import "./ProductDetailPage.scss";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const loading = useSelector(selectDetailLoading);
  const error = useSelector(selectDetailError);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  if (loading) return <Loader text="Loading product..." />;
  if (error)
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProductById(id))}
      />
    );
  if (!product) return null;

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return (
      <>
        {"★".repeat(full)}
        {"☆".repeat(5 - full)}
      </>
    );
  };

  return (
    <div className="detail-page">
      <div className="detail-card">
        <div className="detail-img-wrap">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="detail-img"
          />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{product.title}</h1>
          <h3 className="desc-label">Description</h3>
          <p className="desc-text">{product.description}</p>
          <p className="detail-row">
            Category: <strong>{product.category}</strong>
          </p>
          <p className="detail-row">
            Price:{" "}
            <span className="old-price">${product.price}</span>{" "}
            <strong className="new-price">${discountedPrice}</strong>
          </p>
          <p className="detail-row">
            Rating:{" "}
            <span className="stars-inline">{renderStars(product.rating)}</span>{" "}
            <strong>{product.rating.toFixed(2)}</strong>
          </p>
          <p className="detail-row">
            Stock: <strong>{product.stock} pieces</strong>
          </p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back...
          </button>
        </div>
      </div>
    </div>
  );
}
