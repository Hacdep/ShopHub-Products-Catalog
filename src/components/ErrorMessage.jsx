import "./ErrorMessage.scss";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-wrapper">
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
