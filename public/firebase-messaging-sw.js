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
messaging.setBackgroundMessageHandler(function (payload) {
  // Customize notification here
  console.log({ payload });

  const { title, body, icon } = JSON.parse(payload.data.notification);
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
    icon: icon || "/icons/android-icon-144x144.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
