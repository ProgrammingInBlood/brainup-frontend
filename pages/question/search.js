import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import styles from "./styles/search.module.scss";

function search() {
  const router = useRouter();
  const { query } = router.query;
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setSearch(query);
    }
  }, [router]);

  useEffect(async () => {
    setLoading(true);
    if (search.length > 0) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/search?query=${search}`
        )
        .then((res) => {
          if (res.data.success) {
            setData(res.data.questions);
          }
          setLoading(false);
        });
    }

    if (search.length == 0) {
      setData([]);
      setLoading(false);
    }
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for an answer to any question..."
            className={styles.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              xmlSpace="preserve"
              fill="#687b8c"
            >
              <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
              <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
            </svg>
          </span>
        </div>
      </div>
      <div
        className={styles.body}
        style={{ display: !search ? "flex" : "none" }}
      >
        <div className={styles.body__item}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              x="0"
              y="0"
              version="1.1"
              viewBox="0 0 29 29"
              xmlSpace="preserve"
              width={80}
              height={80}
              fill="#687b8c"
            >
              <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
              <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
            </svg>
          </span>
          <h3>Search User</h3>
          <p>Search users by username</p>
        </div>
      </div>
      <div
        className={styles.body}
        style={{ display: data.length <= 0 && search ? "flex" : "none" }}
      >
        <div className={styles.body__item}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 32 32"
            >
              <path d="M16 32c8.836 0 16-7.164 16-16S24.836 0 16 0 0 7.164 0 16s7.164 16 16 16zm2-14a2 2 0 0 1-4 0V8a2 2 0 0 1 4 0v10zm-2 3.968a2 2 0 1 1-.001 4.001A2 2 0 0 1 16 21.968z" />
            </svg>
          </span>
          <h3>No search results</h3>
          <p>Maybe try with a different word</p>
        </div>
      </div>
      <div className={styles.searchResults}>
        <div
          className={styles.searchResults__item}
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
        {data.map((item) => (
          <div
            className={styles.searchResults__item}
            onClick={() => router.push(`/question/${item?._id}`)}
          >
            <p>{item?.question}</p>
          </div>
        ))}
      </div>
      <div className={styles.ask}>
        <div className={styles.text}>
          <p>Not what you're looking for?</p>
          <h3>Ask question</h3>
        </div>
        <div onClick={() => router.push(`/question/ask?query=${search}`)}>
          <Image
            src="/images/add.png"
            alt="add"
            width={60}
            height={60}
            className={styles.ask__image}
          />
        </div>
      </div>
    </div>
  );
}

export default search;
