import React from "react";

const Footer = () => {
  return (
    <nav class="navbar sticky-bottom navbar-expand-sm navbar-dark bg-dark">
      <div className="container text-light justify-content-center d-flex align-items-center">
        Copyright © {new Date().getFullYear()} Srijan Shankar Dubey
        <br />
      </div>
    </nav>
  );
};

export default Footer;
