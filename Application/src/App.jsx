import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing-Page/LandingPage";
import LoginPage from "./Components/Login-Page/LoginPage";
import SignUpPageOne from "./Components/SignUp-Pages/SignUp-Page-One/SignUpPageOne";
import SignUpPageTwo from "./Components/SignUp-Pages/SignUp-Page-Two/SignUpPageTwo";
import { RegistrationProvider } from "./Components/Student-Registration-Context/RegistrationContext";
function App() {
  return (
    <RegistrationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/personal" element={<SignUpPageOne />} />
          <Route path="/signup/contact" element={<SignUpPageTwo />} />
          {/* <Route path="/login/student" element={<StudentLoginPage />} /> */}
          {/* <Route path="/login/examiner" element={<ExaminerLoginPage />} /> */}
          {/* <Route path="/login/student/registration/FS" element={<StudentRegistrationFS />} /> */}
          {/* <Route path=02"/login/student/registration/SS" element={<StudentRegistrationSS />} /> */}
        </Routes>
      </Router>
    </RegistrationProvider>
  );
}

export default App;

// (login) SHA-256 Hash -> 428821350e9691491f616b754cd8315fb86d797ab35d843479e732ef90665324
// (signup/personal) SHA-256 Hash -> 1bfcdbbfc3f85e4c08a4762b5e0579ddaa3c8a66a2b6f7d2c4f82368c9c1a348
// (signup/contact) SHA-256 Hash -> e99ee8d04062a91600e21881c8be6e79f67ad9c2cd4f8f5443f1033204b8b52b