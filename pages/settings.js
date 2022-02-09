import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/Authentication";
import styles from "../styles/Profile.module.scss";

function Settings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authentication);
  const { isAuthenticated } = auth;
  if (!isAuthenticated) {
    router.push("/");
  }

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div>
      <div className={styles.header}>
        <span onClick={() => router.back()}>
          <Image
            src="/images/back.png"
            alt="avatar"
            width={30}
            height={30}
            className={styles.header__back}
          />
        </span>
        <p>Settings</p>
      </div>
      <div className={styles.options} style={{ paddingTop: 0 }}>
        <div
          className={styles.userOptions__item}
          onClick={() => router.push("/profile/changePassword")}
        >
          <div className={styles.userOptions__item__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width={24}
              height={24}
            >
              <path d="M24,4H8A4,4,0,0,0,4,8V24a4,4,0,0,0,4,4H24a4,4,0,0,0,4-4V8A4,4,0,0,0,24,4Zm2,20a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2V8A2,2,0,0,1,8,6H24a2,2,0,0,1,2,2ZM19.819,12.421A3.572,3.572,0,0,0,16.4,15H9.6a1,1,0,0,0-1,1v2.579a1,1,0,0,0,2,0V17h1v1.579a1,1,0,0,0,2,0V17h2.8a3.572,3.572,0,1,0,3.419-4.579Zm0,5.158A1.579,1.579,0,1,1,21.4,16,1.581,1.581,0,0,1,19.819,17.579Z" />
            </svg>
          </div>
          <div className={styles.userOptions__item__text}>
            <p className={styles.mainOption}>Change Password</p>
          </div>
        </div>

        <div
          className={styles.userOptions__item}
          onClick={() => router.push("/profile/edit")}
        >
          <div className={styles.userOptions__item__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              style={{ cursor: "pointer" }}
            >
              <path
                fill="#000"
                d="M17.864 3.60051C17.4735 3.20999 16.8403 3.20999 16.4498 3.60051L15.0356 5.01472 19.2782 9.25736 20.6924 7.84315C21.0829 7.45263 21.0829 6.81946 20.6924 6.42894L17.864 3.60051zM17.864 10.6716L13.6213 6.42894 4.72185 15.3284C4.53431 15.516 4.42896 15.7703 4.42896 16.0355L4.42896 18.864C4.42895 19.4163 4.87667 19.864 5.42896 19.864H8.25738C8.5226 19.864 8.77695 19.7586 8.96449 19.5711L17.864 10.6716z"
              />
            </svg>
          </div>
          <div className={styles.userOptions__item__text}>
            <p className={styles.mainOption}>Edit Profile</p>
          </div>
        </div>
        <div className={styles.userOptions__item} onClick={handleLogout}>
          <div className={styles.userOptions__item__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
            >
              <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
            </svg>
          </div>
          <div className={styles.userOptions__item__text}>
            <p className={styles.mainOption}>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
