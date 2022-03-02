import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SpinnerCircular } from "spinners-react";
import styles from "../../../styles/Search.module.scss";

function Followers() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    setHasMore(page <= totalPages);
  }, [page, totalPages]);

  const fetchData = async () => {
    console.log("fetching");
    console.log({ page, totalPages });
    if (page <= totalPages) {
      if (id) {
        try {
          await axios
            .get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/followers/${id}?page=${page}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              console.log({ res });
              if (res.data.success) {
                setData((old) => [...old, ...res.data.followers]);
                setTotalPages(parseInt(res.data.totalPages));
                setPage(parseInt(res.data.currentPage) + 1);
              } else {
                setData([]);
              }
              setLoading(false);
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
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
        <p>Followers</p>
      </div>
      <div>
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
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          height={window.innerHeight - 100}
          loader={
            <h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <SpinnerCircular
                  size={30}
                  color={"#00a550"}
                  secondaryColor={"#b2b2b2"}
                />
              </div>{" "}
            </h4>
          }
        >
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Followers;
