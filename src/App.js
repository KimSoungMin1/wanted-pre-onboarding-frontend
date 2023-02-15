import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import NavBar from "./components/Nav";
function App() {
  let token = localStorage.getItem("access_token");
  console.log(!token);
  return (
    <div className="App">
      <NavBar />
      {!token ? (
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/todo"
            element={<Navigate to="/signin"></Navigate>}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/signin"
            element={<Navigate to="/todo"></Navigate>}
          ></Route>
          <Route
            path="/signup"
            element={<Navigate to="/todo"></Navigate>}
          ></Route>
          <Route path="/todo" element={<Todo />}></Route>
          <Route path="/" element={<Todo />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
