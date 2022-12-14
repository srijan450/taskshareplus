import React from "react";
import Spinner from "./Spinner";

const Loader = ({ show }) => {
  const handler = (val = true) => {
    if (val)
      window.$(document).ready(() => {
        window.$("#loader").modal("show");
      });
    else {
      window.$(document).ready(() => {
        window.$("#loader").modal("hide");
      });
    }
  };
  return (
    <>
      <div
        className="modal"
        id="loader"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="loader"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered justify-content-center">
          <Spinner />
        </div>
      </div>
      {show ? handler() : handler(false)}
    </>
  );
};

export default Loader;
