import styles from "../../styles/login.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";

import Head from "next/head";
import { css } from "@emotion/react";
import axios from "axios";

function Login({ session }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);

  //LOGIN VALUES
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //verify email function

  useEffect(() => {
    setError("");
  }, [email, password, confirmPassword, name]);

  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      setLoading(false);
    }
  }, [router, session]);

  async function submitLogin(e) {
    e.preventDefault();
    setSpinner(true);
    setError("");

    if (email.length === 0) {
      setError("Email is required");
      setSpinner(false);

      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email address");
      setSpinner(false);

      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setSpinner(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setSpinner(false);
      return;
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/createuser`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setError("");
          setSpinner(false);
          router.replace(
            "/auth/confirmotp?token=" + res.data.token + "&email=" + email
          );
        } else {
          setError(res.data.message);
          setSpinner(false);
        }
      });
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleGoogleSignIn = async () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google?web=true`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login-Samaan" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Get verified answers to improve your grades</h1>
          <p>
            Create an account now to get verified answers from our community of
            350+ million teachers and students
          </p>
        </div>

        <div className={styles.fields}>
          <p className={styles.text}></p>
          <input
            type="text"
            placeholder="Full name"
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
          />
          <p className={styles.text}></p>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className={styles.text}></p>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={styles.text}></p>
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p style={{ color: "#cf1d00", fontWeight: 700, fontSize: 14 }}>
          {error}
        </p>
        <div className={styles.loginDiv}>
          <button onClick={submitLogin}>
            {spinner ? (
              <SpinnerCircular size={20} color={"white"} />
            ) : (
              "Sign up"
            )}
          </button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleGoogleSignIn}>
            <Image
              alt="google"
              src="/icons/google.png"
              height="24"
              width="24"
              layout="fixed"
            />{" "}
            <span> Google</span>
          </button>
          <button className={styles.button}>
            <Image
              alt="facebook"
              src="/icons/fb.png"
              height="24"
              width="24"
              layout="fixed"
            />{" "}
            <span> Facebook</span>
          </button>
        </div>
        <p className={styles.infoprivacy}>
          We never share anything on your behalf
        </p>
        <p className={styles.signup}>
          Already have an account?{" "}
          <span onClick={() => router.push("/auth/login")}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
