import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/episode/migrate" className="btn btn-primary btn-block">
        <i className="fas fa-arrow-right" /> <i className="fas fa-database" />{" "}
        Migrate
      </Link>
      <Link to="/episode/add" className="btn btn-primary btn-block">
        <i className="fas fa-plus" />
        Add
      </Link>
    </div>
  );
};
