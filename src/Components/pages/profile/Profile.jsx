import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Popups, UserContext } from "../../../Context";
import api from "../../API/api";
import Button from "../../utilities/Navigation/Button";
import "./profile.css";

const Profile = () => {
  const { USER } = useContext(UserContext);
  const { setLOADER, setMODAL } = useContext(Popups); // modal and loader
  const { getToken } = api();

  const handler = async (e) => {
    const { name, value, files } = e.target;
    if (files[0].type.split("/")[0] === "image") {
      const [file] = files;
      const token = getToken();
      const formdata = new FormData();
      formdata.append("profileImage", files[0]);
      document.getElementById("profile-image").src = URL.createObjectURL(file);
      const img = await axios.post(
        "https://best-task-app.onrender.com/profile-upload",
        formdata,
        { headers: { authtoken: token } }
      );
      console.log(img);
      // setfdata({ ...fdata, [name]: files[0] })
    } else {
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">Task Icon should be image</span>
          </>
        ),
        body: (
          <>
            <span className="text-dark">
              Task Icon should be of image format.
            </span>
          </>
        ),
        success: false,
      });
    }
  };

  return (
    USER && (
      <div className="w-100" style={{ minHeight: "90vh" }}>
        <div className="col-xl-8 col-lg-9 col-md-10 col-sm-11 col-12 border mx-auto my-5 px-5 py-4">
          <div
            className="row justify-content-between mb-4"
            style={{ alignItems: "center" }}
          >
            <div className="col-9 d-flex align-items-center">
              <Button side="back" classes="me-4" />
              <h3 className="">Profile</h3>
            </div>
            <hr className="col-12 my-1 mx-auto text-danger " />
          </div>
          <div className="text-center">
            <label htmlFor="image" className="">
              <div className="profile_img border-danger border-2 border">
                <img
                  src={
                    USER.profileImage
                      ? `https://best-task-app.onrender.com/profile-image/${USER.username}`
                      : "https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/nouserimage.webp"
                  }
                  id="profile-image"
                  alt="cannot display image"
                  title="click to change profile image"
                />
                <h4 className="mt-3 mb-5">You</h4>
              </div>
              <input
                type="file"
                id="image"
                name="profileImage"
                className="d-none"
                accept=".png, .jpg, .jpeg, .webp"
                onChange={handler}
                //   value={fdata.iconImage}
                form="createTaskform"
              />
            </label>
          </div>
          <table>
            <tr>
              <th className="col-2">Name</th>
              <td className="col-8 text-capitalize">{USER.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{USER.email}</td>
            </tr>
            <tr>
              <th>username</th>
              <td>{USER.username}</td>
            </tr>
            <tr>
              <th>Friends</th>
              <td>
                {USER &&
                  USER.friends.map((item) => <td>{item.username},&nbsp;</td>)}
              </td>
            </tr>
          </table>
        </div>
      </div>
    )
  );
};

export default Profile;
