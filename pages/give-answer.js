import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/giveAnswer.module.scss";
import moment from "moment";
import { SpinnerCircular } from "spinners-react";
import Navigation from "../components/Navigation";
import InfiniteScroll from "react-infinite-scroll-component";

function giveAnswer() {
  const router = useRouter();
  const mainConatiner = useRef();
  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setHasMore(page <= totalPages);
  }, [page, totalPages]);

  console.log({ hasMore });

  const fetchData = async () => {
    console.log("fetching");
    if (page <= totalPages) {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/allQuestions?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            console.log({ res });
            setQuestions((question) => [...question, ...res.data.Allquestions]);
            setTotalPages(parseInt(res.data.totalPages));
            setPage(parseInt(res.data.currentPage) + 1);
          }
        });
    }
  };

  return (
    <div ref={mainConatiner}>
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
        <p>Give Answer</p>
      </div>

      <InfiniteScroll
        dataLength={questions.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        height={window.innerHeight - 100}
        loader={
          <h4>
            <div
              className={styles.question}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {questions.map((q) => {
          const author = q.author;
          //time ago with moment
          const time = moment(q.created_at).fromNow();

          return (
            <div
              className={styles.question}
              key={q._id}
              onClick={() => router.push(`/question/${q?._id}`)}
            >
              <div className={styles.questionDetails}>
                <Image
                  src={author.avatar}
                  alt="avatar"
                  width={20}
                  height={20}
                  className={styles.questionDetails__avatar}
                />

                <h5 className={styles.questionDetails__name}>
                  {author.username}
                </h5>
                <p className={styles.dots}>•</p>
                <h6>{time}</h6>
                <p className={styles.dots}>•</p>
                <h6 className={styles.subject}>{q.subject}</h6>
              </div>
              <p className={styles.questiontext}>{q.question}</p>
              <p className={styles.answers}>
                {q.answers.length}{" "}
                {q.answers.length <= 1 ? " answer" : " answers"}
              </p>
            </div>
          );
        })}
      </InfiniteScroll>

      <Navigation />
    </div>
  );
}

export default giveAnswer;
