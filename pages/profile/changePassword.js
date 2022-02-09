import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/ProfileEdit.module.scss";
import {
  getUserDetails,
  updateAvatar,
  updateUser,
} from "../../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../.././components/Loading";
import { useRouter } from "next/router";
import axios from "axios";
function EditProfile() {
  const router = useRouter();
  const avatarUploadRef = useRef();
  const dispatch = useDispatch();
  //REDUX FOR USER
  const auth = useSelector((state) => state.authentication);
  const { isAuthenticated } = auth;
  if (!isAuthenticated) {
    router.replace("/");
  }

  //set initial input values
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [color, setColor] = useState("#cf1d00");
  const [error, setError] = useState("");

  const handlePasswordChange = async () => {
    setColor("#cf1d00");
    setError("");
    if (oldPassword.length === 0) {
      setError("Old password cannot be empty");
      return;
    }
    if (newPassword.length === 0) {
      setError("New password cannot be empty");
      return;
    }
    if (confirmPassword.length === 0) {
      setError("Confirm password cannot be empty");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setColor("#30b16f");
          setError(res.data.message);
        } else {
          setColor("#cf1d00");
          setError(res.data.message);
        }
      });
  };

  return (
    <div className={styles.conatiner}>
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
        <p>Change Password</p>
      </div>
      <div className={styles.EditProfile}>
        <div className={styles.info}>
          <input
            type="text"
            maxLength={20}
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="text"
            maxLength={20}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="text"
            maxLength={20}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p style={{ color: color, fontWeight: 700, fontSize: 14 }}>{error}</p>

        <button onClick={handlePasswordChange} className={styles.saveButton}>
          UPDATE PASSWORD
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
