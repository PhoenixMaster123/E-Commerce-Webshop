import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

function App() {
    return (
      <div className="App">
        <Routes>
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        </Routes>
      </div>
    );
  }
  export default App;