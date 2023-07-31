import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/AuthContext";
import classes from "./AuthForm.module.css";
import Header from "../Layout/Header";
import BrandName from "../Layout/BrandName";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    try {
      const url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCR645Usau9CFI7QsbvX-fL7iehx-P4xU8";

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      authCtx.login(data.idToken);
      navigate("/store");
    } catch (error) {
      alert(error.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <section>
        <Header />
        <BrandName />
      </section>
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>Login</button>}
            {isLoading && <p>Sending request...</p>}
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
