import { messaging } from "./config/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";


export const initializeNotifications = async () => {
  try {
  
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
      { type: "classic" }
    );
    console.log("Service Worker registered:", registration);

 
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission denied.");
        return;
      }
    }

  
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      console.log("FCM Token Generated:", token);
    } else {
      console.warn("Failed to generate FCM Token.");
    }
  } catch (error) {
    console.error("Error during notification initialization:", error);
  }
};


export const handleForegroundNotifications = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    alert(
      `Title: ${payload.notification?.title}\nBody: ${payload.notification?.body}`
    );
  });
};


export const checkTokenRefresh = async () => {
  try {
    const refreshedToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (refreshedToken) {
      console.log("Token refreshed:", refreshedToken);
    } else {
      console.warn("Failed to refresh FCM Token.");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};
