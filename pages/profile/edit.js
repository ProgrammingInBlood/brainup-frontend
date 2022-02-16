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
import axios from "axios";
import { useRouter } from "next/router";
import { SpinnerCircular } from "spinners-react";
import TextareaAutosize from "react-textarea-autosize";
function EditProfile() {
  const router = useRouter();
  const avatarUploadRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  //REDUX FOR USER
  const user = useSelector((state) => state.user);
  const { loading, data } = user;

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  //set initial input values
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (data.username || data.description || data.avatar) {
      setUsername(data?.name);
      setDescription(data?.description);
      setImage(data?.avatar);
    }
  }, [data]);

  const handleUserUpdate = async () => {
    setUpdateLoading(true);
    try {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
          { name: username, description },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            if (!avatar) {
              router.push("/profile");
              setUpdateLoading(false);
            }
          } else {
            setError(res.data.message);
            setUpdateLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
      setError(err.message);
      setUpdateLoading(false);
    }
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      try {
        await axios
          .put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/avatar`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              router.push("/profile");
              setUpdateLoading(false);
            } else {
              setError(res.data.message);
              setUpdateLoading(false);
            }
          });
      } catch (err) {
        if (err?.response?.data) {
          setError(
            "Only .png, .jpg and .jpeg format allowed! and should less than 5MB"
          );
        } else {
          setError(err.message);
        }
        setUpdateLoading(false);
      }
    }
  };

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
              accept="image/png, image/jpeg , image/jpg"
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
            maxLength={20}
            placeholder="Full name"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
          />
          <TextareaAutosize
            type="text"
            placeholder="Description"
            value={description}
            maxLength={250}
            minRows={6}
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
          {updateLoading ? (
            <SpinnerCircular size={20} color={"white"} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
