import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../.././components/Loading";
import { getMessages, getUserDetails } from "../.././redux/actions/User";
import styles from "../.././styles/Messages.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import io from "socket.io-client";
import moment from "moment";

function MessageLiveChat() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats`));
  const messagesContainerRef = useRef();

  //REDUX FOR USER
  const userDetails = useSelector((state) => state.user);
  const { loading, error, messages, data } = userDetails;
  const [selectedConversationUser, setSelectedConversationUser] = useState("");
  const [message, setMessage] = useState("");

  const auth = useSelector((state) => state.authentication);
  const { user } = auth;
  const [messagesContainer, setMessagesContainer] = useState([]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef?.current?.scrollHeight;
    }
  };

  useEffect(async () => {
    dispatch(getUserDetails());
    if (id) {
      dispatch(getMessages(id));
    }
  }, [id]);

  useEffect(() => {
    setMessagesContainer(messages?.message);
    setSelectedConversationUser(messages?.user);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesContainer]);

  const handleMessageSend = async () => {
    console.log({ message, receiverId: selectedConversationUser?._id });
    if (message) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
          { message: message, receiverId: selectedConversationUser._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            socket.current.emit("message", {
              message,
              senderId: user?.userId,
              receiverId: selectedConversationUser?.userId,
            });
            setMessage("");
          }
        });
    }
    scrollToBottom();
  };

  useEffect(() => {
    socket.current.emit("active", user?.userId);
    socket.current.on("online", (users) => {
      console.log(users);
      console.log("online");
    });
    socket.current.on("getMessage", (message) => {
      console.log(message);
      setMessagesContainer((previousMessages) => [
        ...previousMessages,
        message,
      ]);
      console.log("getMessage");
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
        <div className={styles.chatBox__header}>
          {!selectedConversationUser ? (
            <div style={{ padding: 20 }}>
              <h1>No messages.</h1>
              <h4>Go to someone's profile to invite them to a conversation.</h4>
            </div>
          ) : (
            <>
              <div className={styles.userDetails}>
                <div
                  className={styles.avatar}
                  onClick={() =>
                    router.push(`/users/${selectedConversationUser?.userId}`)
                  }
                >
                  <Image
                    src={
                      selectedConversationUser?.avatar
                        ? selectedConversationUser?.avatar
                        : "/images/no-avatar.png"
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className={styles.avatarImage}
                  />
                  <h3>{selectedConversationUser?.username}</h3>
                </div>
                <p>BLOCK/REPORT USER</p>
              </div>
              <div className={styles.allMessages} ref={messagesContainerRef}>
                {messagesContainer.map((message) => {
                  //convert timestamp to hour time
                  const formattedTime = moment(message.created_at).fromNow();

                  return (
                    <div
                      key={message._id}
                      className={
                        message.senderId === user.userId
                          ? styles.messageBox
                          : styles.messageBox_reciver
                      }
                    >
                      {/* show sender id Username */}
                      <div className={styles.messageBox__sender__wrapper}>
                        <div
                          className={
                            message.senderId === user.userId
                              ? styles.messageBox__sender
                              : styles.messageBox__sender_reciver
                          }
                        >
                          {message.senderId === user.userId ? (
                            <>
                              <h3>
                                {message.senderId === user.userId
                                  ? data.username
                                  : selectedConversationUser.username}
                              </h3>
                              <p>{formattedTime}</p>
                              <Image
                                src={
                                  message.senderId === user.userId
                                    ? data.avatar
                                    : selectedConversationUser.avatar
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
                              <h3>
                                {message.senderId === user.userId
                                  ? data.username
                                  : selectedConversationUser.username}
                              </h3>
                              <Image
                                src={
                                  message.senderId === user.userId
                                    ? data.avatar
                                    : selectedConversationUser.avatar
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
                            message.senderId === user.userId
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
          )}
        </div>
        <div
          className={styles.inputBox}
          style={{ display: selectedConversationUser ? "flex" : "none" }}
        >
          <TextareaAutosize
            type="text"
            placeholder="Type a message..."
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
