import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomCursor from "./Components/Custom-Cursor/CustomCursor";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from "./Components/Landing-Page/LandingPage";
import LoginPage from "./Components/Login-Page/LoginPage";
import SignUpPageOne from "./Components/SignUp-Pages/SignUp-Page-One/SignUpPageOne";
import SignUpPageTwo from "./Components/SignUp-Pages/SignUp-Page-Two/SignUpPageTwo";
import SignUpPageThree from "./Components/SignUp-Pages/SignUp-Page-Three/SignUpPageThree";
import { RegistrationProvider } from "./Components/Student-Registration-Context/RegistrationContext";
import urlRoutes from "./Constant/Navigation/Routes/landing-signup-routes";

function App() {
  return (
    <Auth0Provider
      domain="dev-gq11ev8w5p5sdw14.jp.auth0.com"
      clientId="h9NnahBTzvE5k2nXiAWT2UYXcl6y5HeC"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RegistrationProvider>
        <Router>
          <CustomCursor />
          <Routes>
            <Route path={urlRoutes.landing} element={<LandingPage />} />
            <Route path={urlRoutes.login} element={<LoginPage />} />
            <Route path={urlRoutes.signup.personal} element={<SignUpPageOne />} />
            <Route path={urlRoutes.signup.contact} element={<SignUpPageTwo />} />
            <Route path={urlRoutes.signup.email_opt_verification} element={<SignUpPageThree />} />
            {/* <Route path="/login/student" element={<StudentLoginPage />} /> */}
            {/* <Route path="/login/examiner" element={<ExaminerLoginPage />} /> */}
            {/* <Route path="/login/student/registration/FS" element={<StudentRegistrationFS />} /> */}
            {/* <Route path=02"/login/student/registration/SS" element={<StudentRegistrationSS />} /> */}
          </Routes>
        </Router>
      </RegistrationProvider>
    </Auth0Provider>
  );
}

export default App;