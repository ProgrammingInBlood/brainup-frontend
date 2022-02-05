import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/ProfileEdit.module.scss";
import {
  getUserDetails,
  updateAvatar,
  updateUser,
} from "../redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
function EditProfile() {
  const avatarUploadRef = useRef();
  const dispatch = useDispatch();
  //REDUX FOR USER
  const user = useSelector((state) => state.user);
  const { loading, data, error } = user;

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const handleUserUpdate = () => {
    dispatch(updateUser({ username, description }));
    if (avatar) {
      dispatch(updateAvatar(avatar));
    }
  };

  //set initial input values
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState();

  const handleUsernameChange = (e) => {
    //regex for username and also allow removing text
    if (e.target.value.match(/^[a-zA-Z0-9_]*$/)) {
      setUsername(e.target.value);
    }
  };

  useEffect(() => {
    if (data.username || data.description || data.avatar) {
      setUsername(data?.username);
      setDescription(data?.description);
      setImage(data?.avatar);
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.conatiner}>
      <div className={styles.EditProfile}>
        <div className={styles.avatar}>
          <Image
            src={image ? image : "/images/no-avatar.png"}
            alt="avatar"
            width={100}
            height={100}
            className={styles.avatar__image}
          />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => avatarUploadRef.current.click()}
          >
            <input
              ref={avatarUploadRef}
              style={{ display: "none" }}
              onChange={(e) => setAvatar(e.target.files[0])}
              type="file"
              accept="image/*"
              name="avatar"
            />
            <p>Edit Avatar </p>
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
          </span>
        </div>
        <div className={styles.info}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
          />
          <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <p style={{ color: "#cf1d00", fontWeight: 700, fontSize: 14 }}>
          {error}
        </p>

        {/* <div className={styles.security}>
          <p className={styles.securityTitle}>Security</p>
          <button className={styles.button} onClick={handlePasswordContainer}>
            Change Password
          </button>

          <div
            className={styles.info}
            style={{ display: showPasswordContainer ? "block" : "none" }}
          >
            <input type="text" placeholder="Old password" />
            <input type="text" placeholder="New password" />
            <input type="text" placeholder="Confirm new password" />
          </div>


        </div> */}

        <button className={styles.saveButton} onClick={handleUserUpdate}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
