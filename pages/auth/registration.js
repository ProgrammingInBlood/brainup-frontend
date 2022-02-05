import styles from "../../styles/login.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";

import Head from "next/head";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/Authentication";

function Registration() {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useSelector((state) => state.authentication);

  const { isAuthenticated } = auth;
  if (isAuthenticated) {
    router.replace("/");
  }

  const [spinner, setSpinner] = useState(false);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [color, setColor] = useState("none");

  useEffect(() => {
    setError("");
  }, [username, age]);

  useEffect(() => {
    const checkUsername = async () => {
      setUsernameError("");
      setColor("none");
      if (username !== "") {
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

  console.log(username.length);

  async function submitLogin(e) {
    e.preventDefault();
    setSpinner(true);
    setError("");

    if (username.length > 20 || username.length < 3) {
      setUsernameError(
        "Username should be 3-20 characters long, try something else."
      );
      setColor("red");
      setSpinner(false);
      return;
    }

    if (!age) {
      setError("Please Select your age");
      setSpinner(false);
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/firstRegestration`,
        {
          username: username,
          age: age,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
        <title>Complete registration</title>
        <meta name="description" content="Registration-Samaan" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <div className={styles.login}>
        <div className={styles.title}>
          <h1>Complete registration</h1>
          <p>
            Tell us a bit about yourself. We need this information to keep
            Brainup safe place
          </p>
        </div>

        <div className={styles.fields}>
          <p className={styles.text}>Username:</p>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: color }}
          />
          <p
            style={{
              color: "#cf1d00",
              fontWeight: 700,
              fontSize: 14,
              marginTop: 8,
            }}
          >
            {usernameError}
          </p>
          <p className={styles.text}>Your age:</p>
          <select
            className={styles.selectAge}
            onChange={(e) => setAge(e.target.value)}
            value={age}
          >
            <option value="">Select Your Age</option>
            {Array.from(Array(95), (e, i) => {
              return (
                <option key={i} value={i + 3}>
                  {i + 3}
                </option>
              );
            })}
          </select>
        </div>
        <p
          style={{
            color: "#cf1d00",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {error}
        </p>

        <div className={styles.loginDiv} style={{ padding: 0 }}>
          <button onClick={submitLogin} style={{ height: 40 }}>
            {spinner ? (
              <SpinnerCircular size={20} color={"white"} />
            ) : (
              "CREATE ACCOUNT"
            )}
          </button>
        </div>
        <p className={styles.infoprivacy}>
          We won't spam you. We value your privacy.
        </p>
        <p className={styles.signup} style={{ fontSize: 12 }}>
          By signing up, you accept the{" "}
          <span onClick={() => router.push("/auth/signup")}>
            Brainup Terms of Service
          </span>{" "}
          &{" "}
          <span onClick={() => router.push("/auth/signup")}>
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

export default Registration;

//server side props
// export async function getServerSideProps(context) {
//   const { token } = context.query;
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/isRegistered`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (res.data.success) {
//     //redirect to home page
//     context.res.writeHead(302, {
//       Location: "/",
//     });
//     context.res.end();
//   }

//   return {
//     props: {},
//   };
// }
