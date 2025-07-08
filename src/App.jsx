import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./components/Mainpage";
import SecondPage from "./components/SecondPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="edit/:id" element={<SecondPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
