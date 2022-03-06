// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCBnt4vc0kBJMn0WDMDKYIjzGse0pXPnho",
  authDomain: "brainfreak-b8ea2.firebaseapp.com",
  projectId: "brainfreak-b8ea2",
  storageBucket: "brainfreak-b8ea2.appspot.com",
  messagingSenderId: "773477339960",
  appId: "1:773477339960:web:2d2438c90ef5b8ca0967cd",
  measurementId: "G-JL7NL9GLQF",
});

const messaging = firebase.messaging();

//background notifications will be received here
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
