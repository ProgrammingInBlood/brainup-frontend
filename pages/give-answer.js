import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/giveAnswer.module.scss";
import moment from "moment";

function giveAnswer() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  useEffect(async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/allQuestions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(JSON.parse(res.data.Allquestions[0].author));
        if (res.data.success) {
          setQuestions(res.data.Allquestions);
        }
      });
  }, []);

  console.log(questions);
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
        <p>Give Answer</p>
      </div>
      {questions.map((q) => {
        const author = JSON.parse(q.author);

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
    </div>
  );
}

export default giveAnswer;
