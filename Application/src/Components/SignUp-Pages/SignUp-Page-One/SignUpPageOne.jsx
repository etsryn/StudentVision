import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./SignUpPageOne.module.css";
import { UserPlus, LogIn } from "lucide-react";
import aiIcon from "../../../assets/aiIcon.svg";
import { useRegistration } from "../../Student-Registration-Context/RegistrationContext";
import { Link } from "react-router-dom";
import urlRoutes from "../../../Constant/Navigation/Routes/landing-signup-routes";
import { useAuth0 } from "@auth0/auth0-react";
import GoogleLogo from "../../../assets/GoogleLogo.png";
import GitHubLogo from "../../../assets/GitHubLogo.png";





const SignUpPageOne = () => {
  
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, loginWithPopup } = useAuth0();
  const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;

  const { studentData, setStudentData } = useRegistration();

  const isNextEnabled = studentData.firstName.trim() && studentData.lastName.trim();

  // Open/Close Control for ChatGPT Support -----------------------------------------------------------------------------------------

  const [isSupportOpen, setIsSupportOpen] = useState(false);
// Function to trigger Google sign-up
const handleOAuthSignUp = (provider) => {
    loginWithRedirect({
      connection: provider, // either "google-oauth2" or "github"
      scope: "openid profile email",
    });
  };
// Function to trigger Google sign-up using a popup
// const handleGoogleSignUp = async () => {
//   try {

//     await loginWithPopup({
//       connection: "google-oauth2", // Ensure this is set up correctly in Auth0
//       scope: "openid profile email",
//     });
//     // You can fetch the user here if needed
//     // const user = await getUser();
//     // console.log("User info:", user);
//   } catch (error) {
//     console.error("Popup sign-in error:", error);
//   }
// };
// const handleGoogleSignUp = () => {
//   const width = 500;
//   const height = 600;
//   const left = (window.innerWidth - width) / 2;
//   const top = (window.innerHeight - height) / 2;

//   const authUrl = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/authorize?` +
//     new URLSearchParams({
//       response_type: "token id_token",
//       client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
//       redirect_uri: window.location.origin, // or a specific callback URL
//       scope: "openid profile email",
//       connection: "google-oauth2",
//     }).toString();

//   const authWindow = window.open(
//     authUrl,
//     "GoogleLoginPopup",
//     `width=${width},height=${height},top=${top},left=${left},popup=true`
//   );

//   // Optional: Listen for auth completion if you want to trigger something
// };

useEffect(() => {
  if (isAuthenticated && user) {
    console.log("User Info:", user);
    
    // Optionally store this info in your global context or local state
    setStudentData(prev => ({
      ...prev,
      firstName: user.given_name || prev.firstName,
      lastName: user.family_name || prev.lastName,
      email: user.email || "",
      profilePic: user.picture || "",
      authProvider: "google"
    }));
  }
}, [isAuthenticated, user]);

  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.headerNav}>
        <Link to={urlRoutes.landing}><div className={styles.logo}>StudentVision</div></Link>
        <div className={styles.headerActions}>
          Existing User ?<Link to={urlRoutes.login}>
            <button className={styles.loginBtn}>
              Login{" "}
              <LogIn
                size={iconSize}
                strokeWidth={2}
                className={styles.loginIcon}
              />
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2><UserPlus size={40} strokeWidth={1.5} className={styles.userplus}/><br />Student Registration</h2>
          {/* <br /> */}
          <form className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <input type="text" required value={studentData.firstName} onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}/>
              <label>First Name</label>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" required value={studentData.middleName} onChange={(e) => setStudentData({ ...studentData, middleName: e.target.value })} />
              <label>Middle Name <sup>(Opt)</sup></label>
            </div>
            <div className={styles.inputGroup}>
              <input type="text" required value={studentData.lastName} onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}/>
              <label>Last Name</label>
            </div>
          </form>

          {/* Next Button */}
          <Link to={isNextEnabled ? urlRoutes.signup.contact : "#"} className={isNextEnabled ? styles.nextEnabled : styles.nextDisabled}>
            <button className={styles.nextBtn} disabled={!isNextEnabled}>Proceed</button>
          </Link>
          <div className={styles.oAuthButtonContainer}>
                <div className={styles.googleSignup}>
                    <button onClick={() => handleOAuthSignUp("google-oauth2")} className={styles.googleButton}>
                      <img src={GoogleLogo} alt="Google Logo" />
                      Login with Google
                    </button>
                </div>
                <div className={styles.githubSignup}>
                    <button onClick={() => handleOAuthSignUp("github")} className={styles.githubButton}>
                    <img src={GitHubLogo} alt="Github Logo" />
                    Login with GitHub
                    </button>
                </div>
            </div>
        </div>
      </div>
      </section>

      {/* Chatbot - Dark Mode, Futuristic AI Assistant */}
      <div
        className={styles.entireAIAssistent}
        onClick={() => setIsSupportOpen(!isSupportOpen)}
      >
        <img src={aiIcon} alt="AI Assistant" />
      </div>
      {/* Support Div (Shown when AI Assistant is clicked) */}
      <div
        className={styles.supportContainer}
        style={{ display: isSupportOpen ? "block" : "none" }}
      >
        <div className={styles.supportBox}>
          {/* Header Section */}
          <div className={styles.header}>
            <img src={aiIcon} alt="" style={{ width: 40 }} />
            <h3>SV-GPT</h3>
            <button
              onClick={() => setIsSupportOpen(false)}
              className={styles.closeButton}
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className={styles.chatContainer}>
            <div className={styles.botMessage}>
              <p>👋 Hi there! How can I assist you today?</p>
            </div>
            {/* User Messages Will Be Dynamically Added Here */}
            {/* <p>Explain Machine Learning ?</p> */}
          </div>

          {/* Input Box */}
          <div className={styles.inputContainer}>
            <input type="text" placeholder="Send a message..." />
            <button className={styles.sendButton}>➤</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          All rights reserved &copy; {new Date().getFullYear()} StudentVision |
          Version @ 1.0.0
        </p>
      </footer>
      {/* {isAuthenticated && user && (
  <div>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <img src={user.picture} alt="User profile" width={80} />
  </div>
)} */}

    </div>
  );
};

export default SignUpPageOne;