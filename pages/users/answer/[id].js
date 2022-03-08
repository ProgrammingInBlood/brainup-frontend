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
    if (id) {
      await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/author/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.success) {
            setQuestions(res.data.answers);
          }
        });
    }
  }, [id]);

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
        <p>User answers</p>
      </div>
      {questions.map((q) => {
        //convert created_at to date
        const date = new Date(q.created_at);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        const dateString = date.toLocaleDateString("en-US", options);

        return (
          <div
            className={styles.question}
            key={q._id}
            onClick={() => router.push(`/question/${q?.questionId}`)}
          >
            <h6 className={styles.subject}>{dateString}</h6>
            <p className={styles.questiontext}>{q.answer}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Index;
