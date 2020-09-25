import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1 style={{ color: "navy" }}>{props.branding}</h1>
    </div>
  );
};
export default Header;
