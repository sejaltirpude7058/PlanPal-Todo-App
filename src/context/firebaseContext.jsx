import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, firestoreDB } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  setDoc,
  doc,
  addDoc,
  collection,
  Timestamp,
  getDocs,
  where,
  query,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import dayjs from "dayjs";
import { messaging } from "../config/firebaseConfig";
import { onMessage } from "firebase/messaging";



const FirebaseContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({children}) => {
  const [user , setUser] = useState(null);

//get current user
useEffect(() => {
  onAuthStateChanged(firebaseAuth, (user) => {
    // console.log(user);
    if(user){
      setUser(user)
    }else{
      setUser(null);
    }
  })
}, []);

 useEffect(() => {
   // Listen for foreground messages
   onMessage(messaging, (payload) => {
     console.log("Message received in foreground:", payload);
     alert(
       `Title: ${payload.notification.title}\nBody: ${payload.notification.body}`
     );
   });
 }, []);



//Sign up user
const signUpUser = async (email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const user = userCredential.user;

    // console.log("User created:", user);

    // Update profile
    await updateProfile(user, { displayName: fullName });
    // console.log("Profile updated with display name:", fullName);

    
    await user.reload();
    // console.log("User after reload:", user);

    
    await setDoc(doc(firestoreDB, "users", user.uid), {
      displayName: fullName,
      email: user.email,
      uid: user.uid,
    });

    return ("User created successfully with a display name!");
  } catch (error) {
    console.error("Error signing up:", error.message);
    return (error.message);
  }
};

// login user   
const signInUser = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password)

// login or signing up user through google
const signInOrUpWithGoogle = () => {
  signInWithPopup(firebaseAuth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in with Google:", user);
    })
    .catch((error) => {
      console.error("Error during Google sign-in:", error.message);
    });
};

const handleAddTask = async (
  title,
  description,
  selectedCategory,
  selectedPriority,
  dueDate
) => {
  const curUser = firebaseAuth.currentUser;
  if (!curUser) {
    console.error("No user logged in");
    return;
  }

  try {
    // Validate and parse dates using dayjs
    
    const validDueDate = dayjs(dueDate);

    if (!validDueDate.isValid()) {
      console.error("Invalid date(s) provided");
      return;
    }

    // Add task to Firestore
    const docRef = await addDoc(collection(firestoreDB, "tasks"), {
      title,
      description,
      selectedCategory,
      selectedPriority,
      dueDate: Timestamp.fromDate(validDueDate.toDate()),
      userID: curUser.uid,
      displayName: curUser.displayName || "Anonymous",
      email: curUser.email,
      createdAt: Timestamp.now(),
      isDone: false,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Something went wrong while adding the task:", error.message);
  }
};

//display the task
const handledisplayTasks = async () => {
  const q = query(
    collection(firestoreDB, "tasks"),
    where("userID", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);

  const tasks = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      dueDate: data.dueDate?.toDate().toDateString(), //  readable date string
      createdAt: data.createdAt?.toDate().toDateString(),
    };
  });

  console.log(tasks);
  return tasks;
};

const signOutUser = async () => {
if(isLoggedIn){
   let logout = await signOut(firebaseAuth);
   console.log(logout);
}
}


//delete task by taskid
const deleteTask = async (taskId) => {
 try {
   const taskRef = doc(firestoreDB, "tasks", taskId);
     await deleteDoc(taskRef); 
   console.log(`Task with ID: ${taskId} has been deleted.`);
 
 }
 catch (error) {
   console.error("Error deleting task:", error.message);
 }
}

//delete all tasks
const deleteAllTasks = async () => {
  try {
    const q = query(
      collection(firestoreDB, "tasks"),
      where("userID", "==", user.uid) // Query for tasks belonging to the current user
    );
    const querySnapshot = await getDocs(q);

    // Create a new batch instance
    const batch = writeBatch(firestoreDB);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref); 
    });

    // Commit the batch
    await batch.commit();
    console.log("All tasks have been deleted.");
  } catch (error) {
    console.error("Error deleting all tasks:", error.message);
  }
};

const handleToggleTaskCompletion = async (taskId, currentStatus) => {
  try {
    const taskRef = doc(firestoreDB, "tasks", taskId);
    await setDoc(
      taskRef,
      { isDone: !currentStatus }, 
      { merge: true } // update the `isDone` field
    );
    console.log(
      `Task with ID: ${taskId} marked as ${
        !currentStatus ? "Completed" : "Incomplete"
      }.`
    );
  } catch (error) {
    console.error("Error toggling task completion:", error.message);
  }
};


const isLoggedIn = user ? true : false;

    return (
      <FirebaseContext.Provider
        value={{
          signInUser,
          signUpUser,
          signInOrUpWithGoogle,
          handleAddTask,
          handledisplayTasks,
          signOutUser,
          isLoggedIn,
          deleteTask,
          deleteAllTasks,
          handleToggleTaskCompletion,
          user,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    );
}

export const useFirebase = () => {
    return useContext(FirebaseContext);
}
