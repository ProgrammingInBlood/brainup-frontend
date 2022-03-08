import "../styles/globals.css";
//import react-redux
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { firebaseCloudMessaging } from "../firebase-messaging-service/webPush";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setToken();
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          getMessage();
        }
      } catch (error) {}
    }
    function getMessage() {
      const messaging = firebase.messaging();
      messaging.onMessage((message) => {
        const { title, body } = JSON.parse(message.data.notification);
        var options = {
          body,
        };
        self.registration.showNotification(title, options);
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        ></meta>
        <title>BrainFreak - Get Homework Done Instantly</title>
      </Head>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
