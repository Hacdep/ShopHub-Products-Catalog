import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="product-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <p className="product-meta">
          Category: <strong>{product.category}</strong>
        </p>
        <p className="product-meta">
          Stock: <strong>{product.stock} pieces</strong>
        </p>
        <p className="product-meta">
          Price:{" "}
          <span className="price-original">${product.price}</span>{" "}
          <span className="price-discounted">${discountedPrice}</span>
        </p>
      </div>
    </div>
  );
}
