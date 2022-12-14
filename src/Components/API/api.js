import React, { useContext } from "react";
import { Popups, UserContext } from "../../Context";

const api = () => {
  const { setMODAL, setLOADER } = useContext(Popups);
  const { USER, setUSER } = useContext(UserContext);

  const deleteToken = () => {
    if (localStorage.key("token")) {
      localStorage.removeItem("token");
    }
  };

  const saveToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
  };

  const getToken = () => {
    if (localStorage.getItem("token"))
      return JSON.parse(localStorage.getItem("token"));
    return null;
  };

  const loginauth = (user, data) => {
    setUSER(user);
    saveToken(data);
  };

  const getTaskApi = async (uri, loader = false) => {
    try {
      const token = getToken();
      setLOADER(loader);
      const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
      });
      const sdata = await req.json();
      setLOADER(false);
      return sdata;
    } catch (e) {
      console.log(e);
      setLOADER(false);
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">No Internet</span>
          </>
        ),
        body: (
          <>
            <span className="text-danger">
              You are not connected to internet!
            </span>
          </>
        ),
        success: false,
      });
    }
    setLOADER(false);
  };

  const postApi = async (uri, loader = false, data) => {
    setLOADER(loader);
    try {
      const token = getToken();
      const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
      });
      const sdata = await req.json();
      return sdata;
    } catch (e) {
      console.log(e);
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">No Internet</span>
          </>
        ),
        body: (
          <>
            <span className="text-danger">
              You are not connected to internet!
            </span>
          </>
        ),
        success: false,
      });
    }
    setLOADER(false);
  };

  const patchAPI = async (uri, loader = false, data) => {
    setLOADER(loader);
    try {
      const req = await fetch(`https://best-task-app.herokuapp.com/${uri}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const sdata = await req.json();
      return sdata;
    } catch (e) {
      console.log(e);
      setMODAL({
        show: true,
        header: (
          <>
            <span className="text-danger">No Internet</span>
          </>
        ),
        body: (
          <>
            <span className="text-danger">
              You are not connected to internet!
            </span>
          </>
        ),
        success: false,
      });
    }
    setLOADER(false);
  };

  const markAsComplete = async (_id, func) => {
    setLOADER(true);
    await getTaskApi(`task/mark-as/${_id}?completed=true`);
    func(true);
    setLOADER(false);
  };

  const markAsIncomplete = async (_id, func) => {
    setLOADER(true);
    await getTaskApi(`task/mark-as/${_id}?incomplete=true`);
    func(false);
    setLOADER(false);
  };

  const deleteTaskHandler = async (id, setredirect) => {
    setMODAL({
      show: true,
      header: (
        <>
          <span className="text-dark">Warning</span>
        </>
      ),
      body: (
        <>
          <p className="m-0 fw-bolder">The deleted task cannot be recovered!</p>
          <span className="text-danger fw-bolder mb-1">Are You Sure?</span>
          <p className="mb-0 mt-1 d-flex justify-content-center">
            <button
              className="btn btn-danger"
              onClick={async () => {
                setLOADER(true);
                try {
                  const token = getToken();
                  const req = await fetch(
                    `https://best-task-app.herokuapp.com/task/${id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        authtoken: token,
                      },
                    }
                  );
                  const sdata = await req.json();
                  setLOADER(false);
                  const { error, success } = sdata;
                  if (success) {
                    setredirect(true);
                  }
                  if (error) {
                    setMODAL({
                      show: true,
                      header: (
                        <>
                          <span className="text-danger">Not Allowed</span>
                        </>
                      ),
                      body: (
                        <>
                          <span className="text-danger">
                            Request Denied By The Server!
                          </span>
                        </>
                      ),
                      success: false,
                    });
                  }
                } catch (e) {
                  console.log(e);
                  setMODAL({
                    show: true,
                    header: (
                      <>
                        <span className="text-danger">No Internet</span>
                      </>
                    ),
                    body: (
                      <>
                        <span className="text-danger">
                          You are not connected to internet!
                        </span>
                      </>
                    ),
                    success: false,
                  });
                }
                setLOADER(false);
                setMODAL({ show: false });
              }}
            >
              Yes
            </button>
          </p>
        </>
      ),
      success: false,
    });
  };
  return {
    getTaskApi,
    postApi,
    patchAPI,
    markAsComplete,
    markAsIncomplete,
    deleteTaskHandler,
    loginauth,
    getToken,
    deleteToken,
  };
};

export default api;
