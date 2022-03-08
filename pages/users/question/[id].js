import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../question/styles/index.module.scss";

function Index() {
  const router = useRouter();
  const { id } = router.query;
  const [questions, setQuestions] = useState([]);
  useEffect(async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/author/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setQuestions(res.data.question);
        }
      });
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
        <p>User questions</p>
      </div>
      {questions.map((q) => {
        return (
          <div
            className={styles.question}
            key={q._id}
            onClick={() => router.push(`/question/${q?._id}`)}
          >
            <h6 className={styles.subject}>{q.subject}</h6>
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

export default Index;
