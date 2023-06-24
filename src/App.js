import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./context/Context";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  return (
    <AppContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </AppContext>
  );
}

export default App;
