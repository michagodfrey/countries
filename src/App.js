import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Country from "./Country";
import NotFound from "./NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:name" element={<Country />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
