import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPage from "./pages/TopPage";

export default function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
