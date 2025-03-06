import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: "Bounce",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/public/icons/eyehide.png")) {
      ref.current.src = "/public/icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/public/icons/eyehide.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast.success("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    } else {
      toast("Error: Password not Saved");
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePassword = (id) => {
    console.log("Deleting password with id", id);
    let c = confirm("Do you want to delete");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast.success("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-red-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="md:mycontainer p-2 md:p-0 min-h-[87.7vh]">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-red-500">&lt;</span>
          Log
          <span className="text-red-500">In&gt;</span>
        </h1>

        <p className="text-red-500 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border border-red-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-10">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-red-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-red-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[5px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={25}
                  src="/public/icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-red-400 hover:bg-red-300 rounded-full px-6 border border-red-800 py-1 w-fit gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Password</h2>
          {passwordArray.length === 0 && <div>No Password</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md mb-8">
              <thead className="bg-red-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-red-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-5 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-5 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-5 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center text-center py-2 border border-white">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
