import React, { useContext } from "react";
import { UserContext } from "../../../Context";
import Button from "../../utilities/Navigation/Button";
import PieChart from "../../utilities/pieChart/PieChart";

const Activity = () => {
  const { USER } = useContext(UserContext);
  return (
    USER && (
      <div className="w-100 border" style={{ minHeight: "90vh" }}>
        <div className="col-xl-8 col-lg-9 col-md-10 col-sm-11 col-12 border mx-auto my-5 px-5 py-4">
          <div
            className="row justify-content-between mb-4"
            style={{ alignItems: "center" }}
          >
            <div className="col-9 d-flex align-items-center">
              <Button side="back" classes="me-4" />
              <h3 className="">Track Your Activity</h3>
            </div>
            <hr className="col-12 my-1 mx-auto text-danger " />
          </div>
          <div>
            <PieChart />
          </div>
        </div>
      </div>
    )
  );
};

export default Activity;
