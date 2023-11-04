import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import css from "./RedirectToLandingPage.module.css";
import Button from "./Button";
const RedirectToLandingPage = () => {
  const [time, setTime] = useState<number>(5);

  useEffect(() => {
    var timeout = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  if (time === 0) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className={css["img-container"]}>
        <img src="https://blog.eduonix.com/wp-content/uploads/2015/02/404-Error.jpg"></img>
        <h2>Automatically redirecting to home in : {time} seconds</h2>
        <NavLink to={"/"}>
          <Button className="btn btn-outline-dark"> Go to Home</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default RedirectToLandingPage;
