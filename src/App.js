import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContext from "./context/Context";
import Login from "./views/Login";

function App() {
  return (
    <AppContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </AppContext>
  );
}

export default App;
