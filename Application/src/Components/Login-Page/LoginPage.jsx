import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import { LogIn, UserPlus } from "lucide-react";
import aiIcon from "../../assets/aiIcon.svg";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import urlRoutes from "../../Constant/Navigation/Routes/landing-signup-routes";

const LandingPage = () => {
  const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;

  // Open/Close Control for ChatGPT Support -----------------------------------------------------------------------------------------

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.headerNav}>
        <Link to={urlRoutes.landing}><div className={styles.logo}>StudentVision</div></Link>
        <div className={styles.headerActions}>
          New to us ?
          <Link to={urlRoutes.signup.personal}><button className={styles.signupBtn}>
            Sign Up{" "}
            <UserPlus
              size={iconSize}
              strokeWidth={2}
              className={styles.signupIcon}
            />
          </button></Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.loginWrapper}>
          <div className={styles.loginContainer}>
            <h2>
              <GraduationCap size={50} strokeWidth={1.5} />
              <br />
              Student Login
            </h2>
            <form>
              <div className={styles.inputBox}>
                <input type="email" required />
                <label>Email</label>
              </div>
              <div className={styles.inputBox}>
                <input type="password" required />
                <label>Password</label>
              </div>
              <button className={styles.submitButton} type="submit">
                Login <LogIn size={iconSize} strokeWidth={2} className={styles.loginIcon}/>
              </button>
            </form>
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
    </div>
  );
};

export default LandingPage;
