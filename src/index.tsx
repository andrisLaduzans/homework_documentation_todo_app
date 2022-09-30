import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg5qED-XZdBmrnaBLn0TC3eQxhhseuRoI",
  authDomain: "todo-app-andris-laduzans.firebaseapp.com",
  projectId: "todo-app-andris-laduzans",
  storageBucket: "todo-app-andris-laduzans.appspot.com",
  messagingSenderId: "1039036911461",
  appId: "1:1039036911461:web:651154ae4d5c6ff57adb8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
