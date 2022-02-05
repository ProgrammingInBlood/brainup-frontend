import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./styles/ask.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";
import axios from "axios";

function ask() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [point, setPoint] = useState(10);
  const [error, setError] = useState("");

  const { query } = router.query;

  useEffect(() => {
    setError("");
  }, [question, subject, point]);

  useEffect(() => {
    if (query) {
      setQuestion(query);
    }
  }, [query]);

  const handleQuestionSubmit = async () => {
    setError("");
    if (question.length < 10) {
      setError("Question must be at least 10 characters long");
      return;
    }
    if (!subject) {
      setError("Please select a subject");
      return;
    }
    if (!point) {
      setError("Please select a point");
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question/create`,
        { question, subject, points: point },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          router.push(`/question/${res.data.question._id}`);
        }
      });
  };

  return (
    <div className={styles.container}>
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
        <p>Ask your Question</p>
      </div>
      <div className={styles.questionTextConatiner}>
        <div className={styles.questionText}>
          <TextareaAutosize
            onChange={(e) => setQuestion(e.target.value)}
            className={styles.textarea}
            placeholder="Write your question here..."
            minRows={15}
            maxRows={20}
            maxLength={5000}
            value={question}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <select
          className={styles.select}
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        >
          <option>Select Subject</option>
          <option value="hindi">Hindi</option>
          <option value="english">English</option>
          <option value="maths">Maths</option>
          <option value="science">Science</option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => setPoint(e.target.value)}
          value={point}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={60}>60</option>
          <option value={70}>70</option>
          <option value={80}>80</option>
          <option value={90}>90</option>
          <option value={100}>100</option>
        </select>

        <p
          style={{
            display: error ? "block" : "none",
            color: "#cf1d00",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {error}
        </p>
        <button className={styles.askButton} onClick={handleQuestionSubmit}>
          Ask Question
        </button>
      </div>
    </div>
  );
}

export default ask;
