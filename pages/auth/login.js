import styles from "../../styles/login.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { login, logout } from "../../redux/actions/Authentication";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import withAuth from "../../helpers/withAuth";

function Login() {
  const router = useRouter();
  //REDUX FOR LOGIN
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authentication);
  const { loading } = authState;

  useEffect(() => {
    console.log(authState);
    if (authState.error) {
      setError(authState.error);
    }
  }, [authState]);

  const handleSignInWithCredentials = () => {
    setError("");
    if (email.length === 0) {
      setError("Username or Email cannot be empty");
      return false;
    }
    if (password.length === 0) {
      setError("Password cannot be empty");
      return false;
    }

    dispatch(login(email, password, "credentials"));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  //LOGIN VALUES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [email, password]);

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
          <h1>Welcome back</h1>
          <p>Get answers within minutes and finish your homework faster</p>
        </div>

        <div className={styles.fields}>
          <p className={styles.text}></p>
          <input
            type="text"
            placeholder="Username or email"
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
        </div>
        <p style={{ color: "#cf1d00", fontWeight: 700, fontSize: 14 }}>
          {error}
        </p>
        <div className={styles.loginDiv}>
          <button onClick={handleSignInWithCredentials}>
            {loading ? <SpinnerCircular size={20} color={"white"} /> : "Log in"}
          </button>
          <div className={styles.options}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                value="remember"
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles.label}>
                Keep me logged in
              </label>
            </div>
            <p onClick={handleLogout}>Forgot your password?</p>
          </div>
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
          Don't have an account?{" "}
          <span onClick={() => router.push("/auth/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default withAuth(Login);
