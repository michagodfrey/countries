import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Country from "./Country";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path=":cca3" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
