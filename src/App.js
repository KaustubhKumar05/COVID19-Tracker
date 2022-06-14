import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";

initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
