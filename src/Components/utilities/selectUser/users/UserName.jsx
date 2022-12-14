import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateTaskContext } from "../../../../Context";
import api from "../../../API/api";

const UserName = ({ username, sendHandler, userImg, _id }) => {
  const { user, sharewith, setsharewith, friends, setfriends, users } =
    useContext(CreateTaskContext);

  const [send, setsend] = useState("select");
  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/srijan450/best-task-app/gh-pages/images/nouserimage.webp"
  );
  useEffect(() => {
    getImage();
    if (friends.length > 0)
      if (friends.includes(username)) {
        setsend("remove");
      } else {
        setsend("select");
      }
  }, [[], user, friends, users]);

  const getImage = async () => {
    const img = await axios.get(
      `http://localhost:5000/profile-image/${username}`
    );
    const { data } = await img;
    if (data) setImage(`http://localhost:5000/profile-image/${username}`);
  };

  return (
    // <div className="d-flex align-items-center justify-content-between border px-2 py-2">
    //   <div className="d-flex align-items-center">
    //     <div className="usericon">
    //       <img src={image} alt="cannot display image" title="user image" />
    //     </div>
    //     <h6 className="mx-2 text-uppercase py-0">{username}</h6>
    //   </div>

    //   <div className="">
    //     <button
    //       className={`btn py-0 me-2 pb-1 btn-${
    //         send === "select" ? "primary" : "secondary"
    //       } `}
    //       onClick={() => sendHandler(username)}
    //     >
    //       {send}
    //     </button>
    //   </div>
    // </div>
    <tr className="border px-2 py-2 d-flex justify-content-between">
      <td>
        <div className="d-flex align-items-center">
          <div className="usericon">
            <img src={image} alt="cannot display image" title="user image" />
          </div>
          <h6 className="mx-2 text-uppercase py-0">{username}</h6>
        </div>
      </td>
      <td>
        <div className="">
          <button
            className={`btn py-0 me-2 pb-1 btn-${
              send === "select" ? "primary" : "secondary"
            } `}
            onClick={() => sendHandler(username)}
          >
            {send}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserName;
