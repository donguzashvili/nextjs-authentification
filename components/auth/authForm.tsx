import { FormEvent, useRef, useState } from "react";
import classes from "./authForm.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Something went wrong!");

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;

    if (isLogin) {
      const result = await signIn("credentials", { redirect: false, email: enteredEmail, password: enteredPassword });
      if (result && !result.error) router.replace("/profile");
    } else {
      if (!enteredEmail || !enteredPassword) return;
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
