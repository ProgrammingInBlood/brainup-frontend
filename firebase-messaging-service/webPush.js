import "firebase/compat/messaging";
import firebase from "firebase/compat/app";
import localforage from "localforage";

export const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },
  //initializing firebase app
  init: async function () {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCBnt4vc0kBJMn0WDMDKYIjzGse0pXPnho",
        authDomain: "brainfreak-b8ea2.firebaseapp.com",
        projectId: "brainfreak-b8ea2",
        storageBucket: "brainfreak-b8ea2.appspot.com",
        messagingSenderId: "773477339960",
        appId: "1:773477339960:web:2d2438c90ef5b8ca0967cd",
        measurementId: "G-JL7NL9GLQF",
      });
      try {
        const messaging = firebase.messaging();
        const { NEXT_PUBLIC_VAPID_KEY } = process.env;
        const vapidKey = NEXT_PUBLIC_VAPID_KEY;
        const tokenInLocalForage = await this.tokenInlocalforage();
        //if FCM token is already there just return the token
        // if (tokenInLocalForage !== null) {
        //   return tokenInLocalForage;
        // }
        //requesting notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
          console.log("granted");
          //getting token from FCM
          const fcm_token = await messaging.getToken({ vapidKey });
          if (fcm_token) {
            //setting FCM token in indexed db using localforage
            localforage.setItem("fcm_token", fcm_token);
            console.log("fcm token", fcm_token);
            //return the FCM token after saving it
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
