// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  push,
  child,
  onValue,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8TF7pWsVWG-kKqe4P_mE0OqmmwZJU2xo",

  authDomain: "tajnyprojekt-b6fa9.firebaseapp.com",

  databaseURL:
    "https://tajnyprojekt-b6fa9-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "tajnyprojekt-b6fa9",

  storageBucket: "tajnyprojekt-b6fa9.appspot.com",

  messagingSenderId: "330784905876",

  appId: "1:330784905876:web:0e018f1f494ae146b7b281",

  measurementId: "G-JJ9NGMN1VF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

const sBtn = document.getElementById("message-btn");
const refreshBtn = document.getElementById("getData");
const mInput = document.getElementById("message-input");

// write data
sBtn.addEventListener("click", (e) => {
  if (mInput.value == "") {
    alert("wpisz");
    return;
  }
  var uname = "root";
  var message = mInput.value;

  const userId = push(child(ref(database), "messages")).key;

  set(ref(database, "messages/" + userId), {
    uname: uname,
    message: message,
  });
});

// read data

const newMsg = ref(database, "messages/");
onChildAdded(newMsg, (data) => {
  const messages = data.val();
  const message = `<li><span>${messages.uname}: </span>${messages.message}</li>`;
  console.log(message.uname);
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
