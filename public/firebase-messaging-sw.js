// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCKIRDsEmvHBdIDhl0OKv-7dEhtkW1KOTU",
  authDomain: "planpal-37385.firebaseapp.com",
  projectId: "planpal-37385",
  storageBucket: "planpal-37385.appspot.com",
  messagingSenderId: "612793128584",
  appId: "1:612793128584:web:f17f573eaf8bfcd7c3713d",
  measurementId: "G-13BPKZQRQB",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener("push", function (event) {
  const payload = event.data.json();
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/default-icon.png", // Add default icon if not provided
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/default-icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  const urlToOpen = "/tasks"; // Change to your desired route
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
