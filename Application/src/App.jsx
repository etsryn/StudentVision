import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing-Page/LandingPage";
import LoginPage from "./Components/Login-Page/LoginPage";
import SignUpPage from "./Components/SignUp-Pages/SignUp-Page-One/SignUpPageOne";
import { RegistrationProvider } from "./Components/Student-Registration-Context/RegistrationContext";
function App() {
  return (
    <RegistrationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/personal" element={<SignUpPage />} />
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
