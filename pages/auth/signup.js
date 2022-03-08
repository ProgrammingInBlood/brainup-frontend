import styles from "../../styles/login.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import Head from "next/head";
import axios from "axios";
import { login } from "../../redux/actions/Authentication";
import { useDispatch, useSelector } from "react-redux";

function Login({ session }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  const auth = useSelector((state) => state.authentication);
  const { isAuthenticated } = auth;

  if (isAuthenticated) {
    router.replace("/");
  }

  //LOGIN VALUES
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [color, setColor] = useState("none");

  useEffect(() => {
    setError("");
  }, [email, password, confirmPassword, name, username]);

  useEffect(() => {
    const checkUsername = async () => {
      setUsernameError("");
      setColor("none");

      if (username.length > 3 && username.length < 15) {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/check/username`,
            {
              username: username,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              setSpinner(false);
              setColor("#30b16f");
              setUsernameError("");
            } else {
              setSpinner(false);
              setColor("red");
              setUsernameError(res.data.message);
            }
          });
      }
    };
    checkUsername();
  }, [username]);

  useEffect(() => {
    if (session) {
      router.replace("/");
    } else {
      setSpinner(false);
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
      setError("Enter a valid email address");
      setSpinner(false);
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setSpinner(false);
      return;
    }

    if (username.length > 15 || username.length < 3) {
      setUsernameError(
        "Username should be 3-20 characters long, try something else."
      );
      setColor("red");
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
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          setError("");
          setSpinner(false);
          dispatch(login("", "", "custom", res.data.token));
        } else {
          setError(res.data.message);
          setSpinner(false);
        }
      });
  }

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
            style={{ borderColor: color, outlineColor: color }}
            type="text"
            placeholder="Username"
            maxLength={15}
            value={username}
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p style={{ color: "#cf1d00", fontWeight: 700, fontSize: 14 }}>
            {usernameError}
          </p>
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
