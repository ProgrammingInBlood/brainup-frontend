import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./styles/query.module.scss";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAnswerById,
  getQuestionById,
  getUserById,
} from "../../redux/actions/User";
import Loading from "../../components/Loading";
import axios from "axios";

function Question() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/question`));
  const auth = useSelector((state) => state.authentication);
  const { user } = auth;
  const [activeUsers, setActiveUsers] = useState([]);

  const [answerable, setAnswerable] = useState(true);
  const [author, setAuthor] = useState({});
  const [answerAuthor, setAnswerAuthor] = useState([]);
  const [thanks, setThanks] = useState(false);

  const userDetails = useSelector((state) => state.user);
  const { question, loading, data, answer } = userDetails;

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
      dispatch(getAnswerById(id));
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      if (user?.userId == question?.author) {
        setAnswerable(false);
      }
    }
  }, [user, question]);

  console.log(answer);

  useEffect(async () => {
    const myself = answer.filter((a) => a.author === user?.userId);
    if (myself.length > 0) {
      setAnswerable(false);
    }

    answer.map(async (a) => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get/${a.author}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setAnswerAuthor((oldData) => [...oldData, res.data.user]);
        });
    });
  }, [answer]);

  console.log(answerAuthor);

  useEffect(() => {
    const getAuthorDetails = async () => {
      if (question?.author) {
        const authorDetails = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/get/${question.author}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAuthor(authorDetails.data.user);
      }
    };
    getAuthorDetails();
  }, [question]);

  console.log(author);

  useEffect(() => {
    if (id) {
      socket.current.emit("active", user?.userId, id);
    }
    socket.current.on("getActiveUsers", (users) => {
      setActiveUsers(users?.activeUsers);
      console.log({ active: users });
    });

    return () => {
      socket.current.disconnect();
    };
  }, [id]);

  const handleAnswer = async () => {
    router.push(`/answer/${id}`);
  };

  const handleThanks = async (answerId) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/thanks`,
        { answerId: answerId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setThanks(true);
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
        <div className={styles.header__text}>
          <h3>{question?.subject}</h3>
          <p>{question?.points} points</p>
        </div>
      </div>
      <div className={styles.questionTextConatiner}>
        <p>{question?.question}</p>
      </div>
      <div className={styles.authorDetails}>
        <span>
          <Image
            src={author?.avatar ? author?.avatar : "/images/no-avatar.png"}
            alt="avatar"
            width={30}
            height={30}
            className={styles.authorDetails__avatar}
          />
        </span>
        <h4>{author?.username}</h4>
      </div>
      <div className={styles.liveWatching}>
        <p style={{ display: activeUsers.length > 0 ? "block" : "none" }}>
          watching ({activeUsers.length})
        </p>
        <div className={styles.liveusers}>
          {activeUsers?.map((user) => (
            <span
              className={styles.liveavatarcontainer}
              title={user?.username}
              key={user?.userId}
              onClick={() => router.push(`/users/${user?.userId}`)}
            >
              <Image
                src={user?.avatar ? user?.avatar : "/images/no-avatar.png"}
                alt="avatar"
                width={25}
                height={25}
                className={styles.liveusers__avatar}
              />
            </span>
          ))}
        </div>
      </div>
      <div className={styles.answers}>
        {answer?.map((answer, index) => {
          const authorDetails = answerAuthor[index];
          const thanked = answer.likes.find((t) => t === user?.userId);

          return (
            <div className={styles.answer}>
              <p>{answer.answer}</p>
              <div className={styles.authorDetails} style={{ padding: 0 }}>
                <span>
                  <Image
                    src={
                      authorDetails?.avatar
                        ? authorDetails?.avatar
                        : "/images/no-avatar.png"
                    }
                    alt="avatar"
                    width={30}
                    height={30}
                    className={styles.authorDetails__avatar}
                  />
                </span>
                <h4>{authorDetails?.username}</h4>
              </div>
              <div className={styles.answer__actions}>
                <div className={styles.answer__action}>
                  <span>
                    <svg
                      id="SvgjsSvg1011"
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlnsSvgjs="http://svgjs.com/svgjs"
                    >
                      <defs id="SvgjsDefs1012"></defs>
                      <g id="SvgjsG1013" transform="matrix(1,0,0,1,0,0)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M43.98 8c0-2.21-1.77-4-3.98-4h-32c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28l8 8-.02-36z"
                            fill="#57b2f8"
                            class="color000 svgShape"
                          ></path>
                          <path fill="none" d="M0 0h48v48h-48z"></path>
                        </svg>
                      </g>
                    </svg>
                  </span>
                  <h3 style={{ color: "#57b2f8" }}>COMMENT</h3>
                </div>
                <div
                  className={styles.answer__action}
                  onClick={() => (!thanked ? handleThanks(answer._id) : null)}
                >
                  <span>
                    <svg
                      id="SvgjsSvg1017"
                      width="28"
                      height="28"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlnsSvgjs="http://svgjs.com/svgjs"
                    >
                      <defs id="SvgjsDefs1018"></defs>
                      <g id="SvgjsG1019" transform="matrix(1,0,0,1,0,0)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="#ff7f72"
                            d="m -936.69875,909.3642 c -0.88914,-0.047 -1.75905,0.2466 -2.4043,0.8925 -1.29049,1.2919 -1.17491,3.4894 0.25977,4.9258 l 0.51562,0.5156 4.66016,4.6641 4.6582,-4.6641 0.51563,-0.5156 c 1.43474,-1.4364 1.55025,-3.6339 0.25976,-4.9258 -1.29048,-1.2918 -3.48322,-1.1745 -4.91797,0.2618 l -0.51562,0.5175 -0.51758,-0.5175 c -0.71734,-0.7181 -1.62453,-1.1072 -2.51367,-1.1543 z"
                            transform="translate(942 -906.362)"
                            class="colorf05542 svgShape"
                          ></path>
                        </svg>
                      </g>
                    </svg>
                  </span>
                  <h3 style={{ color: "#ff7f72" }}>
                    {thanked ? "THANKED" : "THANK YOU"}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={styles.answerButtonConatiner}
        style={{ display: answerable ? "flex" : "none" }}
      >
        <button className={styles.answerButton} onClick={handleAnswer}>
          give answer
        </button>
      </div>
    </div>
  );
}

export default Question;
