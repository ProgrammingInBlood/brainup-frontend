import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

import {
  getConversations,
  getMessages,
  getUserDetails,
} from "../redux/actions/User";
import styles from "../styles/Messages.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import io from "socket.io-client";
import moment from "moment";

function profile() {
  const router = useRouter();
  const { id } = router.query;
  const socket = useRef(io(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats`));
  const messagesContainerRef = useRef();
  //REDUX FOR USER
  const userDetails = useSelector((state) => state.user);
  const { loading, conversations, error, messages, data } = userDetails;
  const [selectedConversationUser, setSelectedConversationUser] = useState("");
  const [message, setMessage] = useState("");

  console.log(messages);
  console.log(selectedConversationUser);

  const auth = useSelector((state) => state.authentication);
  const { user } = auth;
  const [messagesContainer, setMessagesContainer] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
    dispatch(getUserDetails());
  }, []);
  const handleConversation = (id, user) => {
    setSelectedConversationUser(user);
    dispatch(getMessages(id));
    if (windowWidth < 768) {
      setShowMessageBox(true);
    }
  };
  useEffect(async () => {
    console.log(conversations);
    if (id && conversations.success) {
      console.log(conversations);
      const conversation = await conversations.conversation.find(
        (conversation) => conversation.members.includes(id)
      );
      const user = await conversations.userList.find(
        (user) => user.userId === id
      );
      handleConversation(conversation._id, user);
    }
  }, [id, conversations?.conversation]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef?.current?.scrollHeight;
    }
  };
  useEffect(() => {
    setMessagesContainer(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesContainer]);

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

  const handleMessageSend = async () => {
    if (message) {
      socket.current.emit("message", {
        message,
        senderId: user?.userId,
        receiverId: selectedConversationUser?.userId,
      });
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/messages`,
      { message: message, receiverId: selectedConversationUser.userId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setMessage("");
  };

  //get window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMessageBox, setShowMessageBox] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (window.innerWidth > 768) {
      setShowMessageBox(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  console.log(windowWidth);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.messages}>
          <div className={styles.messages__header}>
            <h1>Messages</h1>
          </div>
          {conversations?.conversation?.map((conversation, index) => {
            const user = conversations.userList.filter((user) =>
              conversation.members.includes(user.userId)
            )[0];

            return (
              <div
                className={styles.user}
                key={conversation._id}
                onClick={() => handleConversation(conversation._id, user)}
              >
                <div className={styles.avatar}>
                  <Image
                    src={user?.avatar ? user?.avatar : "/images/no-avatar.png"}
                    alt="avatar"
                    width={50}
                    height={50}
                    className={styles.avatarImage}
                  />
                </div>
                <div className={styles.info}>
                  <div className={styles.username}>
                    <h3>{user?.username}</h3>
                    <p>{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={styles.chatBox}
          style={{ display: showMessageBox ? "block" : "none" }}
        >
          <div className={styles.chatBox__header}>
            {!selectedConversationUser ? (
              <div style={{ padding: 20 }}>
                <h1>No messages.</h1>
                <h4>
                  Go to someone's profile to invite them to a conversation.
                </h4>
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
              maxLength={512}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleMessageSend} className={styles.send}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
