import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { useHttpService } from "utils/HttpService";

const EstateDelete = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { deleteRecord } = useHttpService(`/estates/${params.estateId}`);

  if (!location.state) {
    return navigate(-1);
  }

  return (
    <div className="side-card-grid">
      <h1 className="title">Are you sure?</h1>
      <div className="side-card-nav">
        <span></span>
        <button
          onClick={() => deleteRecord()}
          className="side-card-btn warning"
        >
          Yes
        </button>
        <Link to={"../"} className="side-card-btn">
          No
        </Link>
        <span></span>
      </div>
    </div>
  );
};

export default EstateDelete;
