import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styles from "./Dashboard.module.scss";
import Navigation from "./Navigation";

function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [brainlistQuestions, setBrainlistQuestions] = useState([]);

  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/question`));

  useEffect(() => {
    socket.current.on("activeQuestions", (questions) => {
      console.log(questions.top);
      setQuestions(questions.top);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(async () => {
    setQuestionDetails([]);
    if (questions.length > 0) {
      questions.map(async (q) => {
        if (q?.questionId) {
          console.log(q?.questionId);
          await axios
            .get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/${q.questionId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            .then((res) => {
              if (!questionDetails.find((q) => q.questionId === q.questionId)) {
                setQuestionDetails((old) => [...old, res.data.question]);
              }
            });
        }
      });
    }
  }, [questions]);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      search ? router.push(`/question/search?query=${search}`) : null;
    } else {
      setSearch(e.target.value);
    }
  };

  useEffect(() => {
    const getBrainlistQuestions = async () => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/brainlist`)
        .then((res) => {
          if (res.data.success) {
            setBrainlistQuestions(res.data.question);
          }
        });
    };
    getBrainlistQuestions();
  }, []);

  console.log(brainlistQuestions);

  return (
    <>
      <div className={styles.conatiner}>
        <div className={styles.header}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for an answer to any question..."
              className={styles.search}
              onKeyUp={(e) => handleSearch(e)}
            />
            <span
              onClick={() =>
                search ? router.push(`/question/search?query=${search}`) : null
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                x="0"
                y="0"
                version="1.1"
                viewBox="0 0 29 29"
                xmlSpace="preserve"
                fill="#687b8c"
                width={24}
                height={24}
              >
                <path d="M11.854 21.854c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.588-8-8-8z" />
                <path d="M26.146 27.146a.997.997 0 0 1-.707-.293l-7.694-7.694a.999.999 0 1 1 1.414-1.414l7.694 7.694a.999.999 0 0 1-.707 1.707z" />
              </svg>
            </span>
          </div>
        </div>

        <div
          className={styles.buttonContainer}
          onClick={() => router.push(`/question/ask`)}
        >
          <button className={styles.askButton}>ASK QUESTION</button>
        </div>

        <h2 className={styles.pageTitle}>Live</h2>

        {questionDetails.length <= 0 ? (
          <h1
            style={{
              fontFamily: "proxima-bold",
              textAlign: "center",
              color: "gray",
            }}
          >
            No Live Answers
          </h1>
        ) : null}
        {questionDetails.map((q) => {
          let user = q.author;
          return (
            <div
              className={styles.live}
              key={q?._id}
              onClick={() => router.push(`/question/${q._id}`)}
            >
              <div className={styles.live__item}>
                <div className={styles.live__user}>
                  <Image
                    src={user?.avatar ? user?.avatar : "/images/no-avatar.png"}
                    alt="avatar"
                    width={30}
                    height={30}
                    className={styles.live__item__avatar}
                  />
                  <h3>{user?.username}</h3>
                </div>
                <div className={styles.live__question}>
                  <h3>{q.question}</h3>
                </div>
              </div>
            </div>
          );
        })}

        <h2 className={styles.pageTitle}>Brainliest Questions</h2>
        {brainlistQuestions.map((q) => {
          let user = q.author;
          return (
            <div
              className={styles.live}
              key={q?._id}
              onClick={() => router.push(`/question/${q._id}`)}
            >
              <div className={styles.live__item}>
                <div className={styles.live__user}>
                  <Image
                    src={user?.avatar ? user?.avatar : "/images/no-avatar.png"}
                    alt="avatar"
                    width={30}
                    height={30}
                    className={styles.live__item__avatar}
                  />
                  <h3>{user?.username}</h3>
                </div>
                <div className={styles.live__question}>
                  <h3>{q.question}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Navigation />
    </>
  );
}

export default Dashboard;
