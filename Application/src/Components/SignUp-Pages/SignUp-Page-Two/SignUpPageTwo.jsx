import React, { useEffect, useState } from "react";
import styles from "./SignUpPageTwo.module.css";
import { UserPlus, LogIn } from "lucide-react";
import aiIcon from "../../../assets/aiIcon.svg";
import { useRegistration } from "../../Student-Registration-Context/RegistrationContext";
import { Link, useNavigate } from "react-router-dom";

const countryCodes = [
    { name: "India", code: "+91" },
    { name: "USA", code: "+1" },
    { name: "UK", code: "+44" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "UAE", code: "+971" },
    { name: "Pakistan", code: "+92" },
    { name: "Bangladesh", code: "+880" },
  ];
  
const SignUpPageTwo = () => {
    const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;

    const { studentData, setStudentData  } = useRegistration();
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState("");
  
    useEffect(() => {
      if (!studentData.firstName?.trim() || !studentData.lastName?.trim()) {
        navigate("/signup/personal");
      }
    }, [studentData, navigate]);
  
    const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  
    const isValidContact = (contact) => /^\d{8,18}$/.test(contact.replace(/\D/g, "")); 
  
    const isNextEnabled = isValidEmail(studentData.email) && selectedCountry && isValidContact(studentData.contactNumber);
  
    const handleCountryChange = (e) => {
      const country = countryCodes.find(c => c.name === e.target.value);
      setSelectedCountry(country);
      setStudentData({ ...studentData, contactNumber: country.code });
    };
  
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
            {/* Email Field - Full Width */}
            <div className={styles.inputGroupFull}>
              <input type="email" required value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} autoFocus />
              <label>Email</label>
              {!isValidEmail(studentData.email) && studentData.email.length > 0 && (
                <span className={styles.errorMsg}>Invalid Email Id</span>
              )}
            </div>

            {/* Contact Numbers Side by Side */}
            <div className={styles.inputRow}>
              {/* Country Selection Dropdown (Leftmost) */}
              <div className={styles.inputGroup}>
                <select value={selectedCountry.name || ""} className={styles.countryCode} onChange={handleCountryChange}>
                  <option value="" disabled>Select Country Code ▼</option>
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.name}>{country.name} ({country.code})</option>
                  ))}
                </select>
              </div>

              {/* Contact Number with Country Code */}
              <div className={styles.inputGroup}>
                <input type="tel" required value={studentData.contactNumber} onChange={(e) => setStudentData({ ...studentData, contactNumber: e.target.value })} />
                <label>Contact Number</label>
                {!isValidContact(studentData.contactNumber) && studentData.contactNumber.length > 0 && (
                  <span className={styles.errorMsg}>Invalid Contact Number</span>
                )}
              </div>

              {/* Alternative Contact Number */}
              <div className={styles.inputGroup}>
                <input type="tel" required value={studentData.contactNumberAlternative} onChange={(e) => setStudentData({ ...studentData, contactNumberAlternative: e.target.value })} />
                <label>Contact Number <sup>(Opt)</sup></label>
              </div>
            </div>
          </form>

          {/* Next Button with Link */}
          <Link to={isNextEnabled ? "/login/student/registration/next-step" : "#"} className={isNextEnabled ? styles.nextEnabled : styles.nextDisabled}>
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

export default SignUpPageTwo;