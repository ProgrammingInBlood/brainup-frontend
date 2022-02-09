import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./styles/GiveAnswer.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionById } from "../../redux/actions/User";
import { io } from "socket.io-client";
import Loading from "../../components/Loading";

function GiveAnswer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/question`));
  const userDetails = useSelector((state) => state.user);
  const { question, loading } = userDetails;

  const auth = useSelector((state) => state.authentication);
  const { user, isAuthenticated } = auth;

  if (!isAuthenticated) {
    router.push("/");
  }

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id]);

  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [point, setPoint] = useState(10);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [answer, subject, point]);

  const handleAnswerSubmit = async () => {
    setError("");
    if (answer.length < 10) {
      setError("Answer must be at least 10 characters long");
      return;
    }

    await axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/create`,
        { answer, questionId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          socket.current.emit("answer", {
            userId: user?.userId,
            questionId: id,
            answer,
            answerId: res.data.answer._id,
          });
          router.push(`/question/${id}`);
        } else {
          setError(res.data.message);
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

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
      <div className={styles.questionToAnswer}>
        <p>{question?.question}</p>
      </div>
      <div className={styles.questionTextConatiner}>
        <div className={styles.questionText}>
          <TextareaAutosize
            onChange={(e) => setAnswer(e.target.value)}
            className={styles.textarea}
            placeholder="Write your answer here..."
            minRows={15}
            maxRows={20}
            maxLength={5000}
            value={answer}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
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
        <button className={styles.askButton} onClick={handleAnswerSubmit}>
          GIVE ANSWER
        </button>
      </div>
    </div>
  );
}

export default GiveAnswer;
