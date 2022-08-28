import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPage from "../pages/TopPage";

export default function MainRouter() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
