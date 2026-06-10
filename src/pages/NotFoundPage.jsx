import { useNavigate } from "react-router-dom";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-text">Sahifa topilmadi</p>
      <button className="notfound-btn" onClick={() => navigate("/")}>
        Bosh sahifaga qaytish
      </button>
    </div>
  );
}
