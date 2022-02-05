import styles from "../../styles/login.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import Head from "next/head";
import axios from "axios";

function Login() {
  const router = useRouter();
  const { query } = router;
  const [spinner, setSpinner] = useState(false);
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [OTP]);

  async function submitLogin(e) {
    e.preventDefault();
    setSpinner(true);
    setError("");

    if (OTP.length !== 4) {
      setError("OTP must be 4 digits long");
      setSpinner(false);
      return;
    }

    await axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/createuser/verify`, {
        otp: OTP,
        token: query.token,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setError("");
          setSpinner(false);
          localStorage.setItem("token", res.data.token);
          router.replace("/auth/authRedirect?token=" + res.data.token);
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
          <h1>Email Verification</h1>
          <p>A OTP (One Time Password) has been sent to {query?.email}</p>
        </div>

        <div className={styles.fields}>
          <p className={styles.text}></p>
          <input
            type="text"
            placeholder="OTP"
            className={styles.input}
            onChange={(e) => setOTP(e.target.value)}
            style={{ textAlign: "center", marginTop: 20 }}
          />
          <p className={styles.text}></p>
        </div>
        <p style={{ color: "#cf1d00", fontWeight: 700, fontSize: 14 }}>
          {error}
        </p>

        <div className={styles.loginDiv} style={{ padding: 0 }}>
          <button onClick={submitLogin} style={{ height: 40 }}>
            {spinner ? <SpinnerCircular size={20} color={"white"} /> : "VERIFY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
