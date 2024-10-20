import { Link } from "react-router-dom";

const ListItem = ({ estate, fantomKey, isHidden, isUser }) => {
  return (
    <li className={`box overflow-hidden ${isHidden ? "fantom" : ""}`}>
      <h4 className="box-title">{estate.price ?? "..."}</h4>
      {estate.building_size && (
        <div>
          <div className="box-details">
            <p className="box-line">Rooms: {estate.rooms}</p>
            <p className="box-line">Baths: {estate.bathrooms}</p>
            <p className="box-line">Space: {estate.building_size}</p>
          </div>
          <p className="box-line-clamp">{estate.description}</p>
        </div>
      )}
      {(!estate.building_size || fantomKey) && (
        <div>
          <div className="box-details">
            {estate.land_size && (
              <p className="box-line col-span-2">
                Land: {estate.land_size}&nbsp;
              </p>
            )}
            {!estate.land_size && <p className="box-line">&nbsp;</p>}
            <p className="box-line">&nbsp;</p>
            <p className="box-line">&nbsp;</p>
          </div>
          <p className="box-line-clamp">{estate.description ?? ""}&nbsp;</p>
        </div>
      )}
      <div className="box-nav">
        <Link to={`${estate.id}`} state={estate} className="nav-btn">
          More...
        </Link>
        {isUser && (
          <>
            <Link to={`${estate.id}/edit`} state={estate} className="nav-btn">
              Edit
            </Link>
            <Link to={`${estate.id}/delete`} state={estate} className="nav-btn">
              Remove
            </Link>
          </>
        )}
      </div>
    </li>
  );
};

export default ListItem;
