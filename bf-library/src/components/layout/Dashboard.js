import React from "react";
import Episodes from "../episodes/Episodes";
import Sidebar from "../layout/Sidebar";

export default () => {
  return (
    <div className="row">
      <div className="col-md-10">
        <Episodes />
      </div>
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};
