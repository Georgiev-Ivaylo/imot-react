import { Link, useLocation } from "react-router-dom";

const Estate = () => {
  const location = useLocation();

  return (
    <div className="side-card-grid">
      <h1 className="title">Estate - {location.state.id}!</h1>
      {location.state.description}
      <div className="side-card-nav">
        <span></span>
        <span></span>
        <span></span>
        <Link to={"../"} className="side-card-btn">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Estate;
