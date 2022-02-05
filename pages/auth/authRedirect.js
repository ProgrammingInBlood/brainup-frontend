import { SpinnerCircular } from "spinners-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/Authentication";

function AuthLoading() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const { token } = query;

  const checkIfRegistered = async (token) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/isRegistered`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          dispatch(login("", "", "custom", token));
          router.replace("/");
        } else {
          router.replace("/auth/registration");
        }
      });
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      checkIfRegistered(token);
    } else {
      router.replace("/");
    }
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <SpinnerCircular size={40} color={"#00a550"} secondaryColor={"#b2b2b2"} />
    </div>
  );
}

export default AuthLoading;
