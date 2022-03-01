import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { getMessages, getUserDetails } from "../../../redux/actions/User";
import styles from "../../../styles/Messages.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import io from "socket.io-client";
import moment from "moment";
import { SpinnerRoundFilled } from "spinners-react";

function MessageLiveChat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`));
  const messagesContainerRef = useRef();

  //REDUX FOR USER
  const userDetails = useSelector((state) => state.user);
  const { loading, error, messages, data } = userDetails;
  const [selectedConversationUser, setSelectedConversationUser] = useState("");
  const [message, setMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);

  const auth = useSelector((state) => state.authentication);
  const { user } = auth;
  console.log(user);
  const [messagesContainer, setMessagesContainer] = useState([]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef?.current?.scrollHeight;
    }
  };
  console.log(data);
  useEffect(async () => {
    dispatch(getUserDetails());
    if (id) {
      try {
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/comment/get/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              setMessagesContainer(res.data.comments);
            }
          });
      } catch (err) {
        console.log(err);
      }
      console.log(id);
      socket.current.emit("active", { userId: user?.userId, answerId: id });
    }
  }, [id]);

  console.log(messagesContainer);

  useEffect(() => {
    scrollToBottom();
  }, [messagesContainer]);

  const handleMessageSend = async () => {
    if (message) {
      console.log("sent");
      socket.current.emit("message", {
        message,
        senderId: {
          _id: data?.userId,
          username: data?.username,
          avatar: data?.avatar,
        },
        answerId: id,
      });
      try {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/answer/comment/send/${id}`,
            { message: message },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(async (res) => {
            if (res.data.success) {
              setMessage("");
            }
          });
      } catch (err) {
        console.log(err);
      }
    }

    scrollToBottom();
  };

  useEffect(() => {
    socket.current.on("online", (users) => {
      setActiveUsers(users);
    });

    socket.current.on("getMessage", (message) => {
      console.log(message);
      setMessagesContainer((previousMessages) => [
        ...previousMessages,
        message,
      ]);
      console.log("gotMessage");
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className={styles.chatBox}>
        <>
          <div style={{ display: "flex" }}>
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
                <h3>Comments / Discussions</h3>
              </div>
            </div>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                paddingRight: 20,
              }}
            >
              <SpinnerRoundFilled
                size={50}
                thickness={100}
                speed={75}
                color="#36ad47"
              />
              <p style={{ color: "#36ad47", fontFamily: "Proxima-Bold" }}>
                Live
              </p>
            </span>
          </div>
          <div className={styles.liveWatching}>
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
              <p>{activeUsers.length}</p>
            </span>

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
          <div className={styles.allComments} ref={messagesContainerRef}>
            {messagesContainer.map((message) => {
              //convert timestamp to hour time
              const formattedTime = moment(message.created_at).fromNow();

              return (
                <div
                  key={message.created_at}
                  className={
                    message.senderId?._id === user.userId
                      ? styles.messageBox
                      : styles.messageBox_reciver
                  }
                >
                  {/* show sender id Username */}
                  <div className={styles.messageBox__sender__wrapper}>
                    <div
                      className={
                        message?.senderId?._id === user.userId
                          ? styles.messageBox__sender
                          : styles.messageBox__sender_reciver
                      }
                    >
                      {message?.senderId?._id === user.userId ? (
                        <>
                          <h3 style={{ margin: "0 10px" }}>
                            {message.senderId?._id === user.userId
                              ? data.username
                              : message.senderId?.username}
                          </h3>
                          <p>{formattedTime}</p>
                          <Image
                            src={
                              message.senderId?._id === user.userId
                                ? data?.avatar
                                : message?.senderId?.avatar
                            }
                            alt="check"
                            className={styles.messageAvatar}
                            width={20}
                            height={20}
                          />
                        </>
                      ) : (
                        <>
                          <p>{formattedTime}</p>
                          <h3 style={{ margin: "0 6px" }}>
                            {message.senderId._id === user.userId
                              ? data.username
                              : message.senderId?.username}
                          </h3>
                          <Image
                            src={
                              message?.senderId?._id === user.userId
                                ? data?.avatar
                                : message?.senderId?.avatar
                            }
                            alt="check"
                            className={styles.messageAvatar}
                            width={20}
                            height={20}
                          />
                        </>
                      )}
                    </div>
                    <div
                      className={
                        message.senderId?._id === user.userId
                          ? styles.userBox
                          : styles.userBox_reciver
                      }
                    >
                      <div className={styles.messageBody}>
                        {message.message}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>

        <div className={styles.inputBox} style={{ display: "flex" }}>
          <TextareaAutosize
            type="text"
            placeholder="Add a Comment..."
            className={styles.input}
            maxLength={250}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleMessageSend} className={styles.send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageLiveChat;
