import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/giveAnswer.module.scss";
import moment from "moment";
import { SpinnerCircular } from "spinners-react";
import Navigation from "../components/Navigation";

function giveAnswer() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) <=
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      return;
    }
    setIsFetching(true);
  };

  const fetchData = async () => {
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
            setQuestions((question) => {
              return [...question, ...res.data.Allquestions];
            });
            setTotalPages(res.data.totalPages);
            setPage(page + 1);
          }
        });
    }
  };

  console.log({ page, totalPages, questions });

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  return (
    <div style={{ paddingBottom: 100 }}>
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
      <div
        className={styles.question}
        style={{
          display: isFetching ? "flex" : "none",
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
      <Navigation />
    </div>
  );
}

export default giveAnswer;
