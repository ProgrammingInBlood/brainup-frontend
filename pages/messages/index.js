import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../.././components/Loading";
import {
  getConversations,
  getMessages,
  getUserDetails,
} from "../.././redux/actions/User";
import styles from "../.././styles/Messages.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import io from "socket.io-client";
import moment from "moment";
import { useSocket } from "../../websocket/websocket";

function profile() {
  const router = useRouter();
  const { id } = router.query;
  const socket = useSocket(`${process.env.NEXT_PUBLIC_SERVER_URL}/chats`);
  const messagesContainerRef = useRef();
  //REDUX FOR USER
  const userDetails = useSelector((state) => state.user);
  const { loading, conversations, error, messages, data } = userDetails;

  console.log(conversations);
  const [selectedConversationUser, setSelectedConversationUser] = useState("");
  const [message, setMessage] = useState("");

  const auth = useSelector((state) => state.authentication);
  const { user } = auth;
  const [messagesContainer, setMessagesContainer] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
    dispatch(getUserDetails());
  }, []);

  const handleConversation = (id) => {
    router.push(`/messages/${id}`);
  };

  useEffect(() => {
    if (socket) {
      socket.emit("active", user?.userId);
      socket.on("online", (users) => {
        console.log(users);
        console.log("online");
      });
      socket.on("getMessage", (message) => {
        console.log(message);
        setMessagesContainer((previousMessages) => [
          ...previousMessages,
          message,
        ]);
        console.log("getMessage");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        <div className={styles.messages__header}>
          <h1>Messages</h1>
        </div>
        {conversations?.conversation?.map((conversation) => {
          const user = conversation?.members?.find(
            (member) => member._id !== data?.userId
          ); //checking users from members array from DB

          return (
            <div
              className={styles.user}
              key={conversation._id}
              onClick={() => handleConversation(user._id)}
            >
              <div className={styles.avatar}>
                <Image
                  src={user?.avatar ? user?.avatar : "/images/no-avatar.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                  layout="fixed"
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
    </div>
  );
}

export default profile;
