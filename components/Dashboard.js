import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSocket } from "../websocket/websocket";
import styles from "./Dashboard.module.scss";
import Navigation from "./Navigation";

function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [brainlistQuestions, setBrainlistQuestions] = useState([]);

  const socket = useSocket(`${process.env.NEXT_PUBLIC_SERVER_URL}/question`);

  useEffect(() => {
    if (socket) {
      socket.on("activeQuestions", (questions) => {
        console.log(questions);
        setQuestions(questions.top);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  console.log({ questions });

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
        <Head>
          <title>BrainFreak - Get Homework Done Instantly</title>
          <meta name="theme-color" content="#57b2f8" />
        </Head>
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

        {questions?.length <= 0 ? (
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
        {questions.map((question) => {
          let user = question.user;
          let q = question.question;
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
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <h3>{user?.username}</h3>
                    <span className={styles.liveCount}>
                      <svg
                        id="SvgjsSvg1001"
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xmlnsSvgjs="http://svgjs.com/svgjs"
                      >
                        <defs id="SvgjsDefs1002"></defs>
                        <g id="SvgjsG1008">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 48 48"
                          >
                            <path fill="none" d="M0 0h48v48h-48z"></path>
                            <path
                              d="M24 9c-10 0-18.54 6.22-22 15 3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                              fill="#ffffff"
                              class="color000 svgShape"
                            ></path>
                          </svg>
                        </g>
                      </svg>
                      <p>{question.count}</p>
                    </span>
                  </span>
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
