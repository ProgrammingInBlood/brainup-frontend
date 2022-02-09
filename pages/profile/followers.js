import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import styles from "../../styles/Search.module.scss";

function Followers() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/followers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setData(res.data.followers);
          }
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

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
        <p>My followers</p>
      </div>
      <div className={styles.searchResults}>
        <div
          className={styles.result}
          style={{
            display: loading ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SpinnerCircular
            size={30}
            color={"#00a550"}
            secondaryColor={"#b2b2b2"}
          />
        </div>
        {data.map((user) => {
          //set only 20 characters of description
          let description = user?.description;
          if (description) {
            if (user?.description?.length > 40) {
              description = user.description.substring(0, 40) + "...";
            }
          }
          return (
            <div
              className={styles.result}
              key={user._id}
              onClick={() => router.push(`/users/${user._id}`)}
            >
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className={styles.result__avatar}
              />
              <div className={styles.result__info}>
                <h3>{user.username}</h3>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Followers;
