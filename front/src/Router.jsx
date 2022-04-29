import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import MyPage from "./components/MyPage";
import SearchWine from "./components/SearchWine/SearchWine";
import SignUp from "./components/User/SignUp/SignUp";

function RouterFile() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/search/:id" element={<SearchWine />} />
      </Routes>
    </Router>
  );
}

export default RouterFile;
