import React, { useEffect, useState } from "react";
import styles from "./SignUpPageOne.module.css";
import { UserPlus, LogIn } from "lucide-react";
import aiIcon from "../../../assets/aiIcon.svg";
import { useRegistration } from "../../Student-Registration-Context/RegistrationContext";
import { Link } from "react-router-dom";

const SignUpPageOne = () => {
  const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;

  const { studentData, setStudentData } = useRegistration();

  const isNextEnabled = studentData.firstName.trim() && studentData.lastName.trim();

  // Open/Close Control for ChatGPT Support -----------------------------------------------------------------------------------------

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.headerNav}>
        <Link to="/"><div className={styles.logo}>StudentVision</div></Link>
        <div className={styles.headerActions}>
          Existing User ?<Link to="/login">
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
          <h2><UserPlus size={40} strokeWidth={1.5} /><br />Student Registration</h2>
          <br />
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
          <Link to={isNextEnabled ? "/login/student/registration/SS" : "#"} className={isNextEnabled ? styles.nextEnabled : styles.nextDisabled}>
            <button className={styles.nextBtn} disabled={!isNextEnabled}>Proceed</button>
          </Link>
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

export default SignUpPageOne;