import { useContext } from "react";
import { ErrorContext } from "utils/context";

const ErrorCards = () => {
  const { error, setError } = useContext(ErrorContext);
  let errorClass = "";
  if (error) {
    errorClass = "card-active";
  }
  return (
    <div className={`card-grid ${errorClass}`}>
      <div className="card">
        {error && <h5 className="card-title">{error.data.message}</h5>}
        <button className="card-btn" onClick={() => setError(null)}>
          X
        </button>
      </div>
    </div>
  );
};

export default ErrorCards;
