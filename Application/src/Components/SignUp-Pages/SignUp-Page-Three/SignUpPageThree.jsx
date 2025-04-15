import React, { useState, useEffect } from "react";
import styles from "./SignUpPageThree.module.css";
import { UserPlus, LogIn, ShieldCheck, CheckCircle } from "lucide-react";
import aiIcon from "../../../assets/aiIcon.svg";
import { useRegistration } from "../../Student-Registration-Context/RegistrationContext";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate hook
import axios from "axios";
import urlRoutes from "../../../Constant/Navigation/Routes/landing-signup-routes";
import PoR from "../../Popup/PopupOnRegisteration";
const SignUpPageThree = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  useEffect(() => {
    // let secondsLeft = 9090; // 1 minute 59 seconds in total seconds
    let secondsLeft = 90; // 1 minute 30 seconds in total seconds
    const sessionElement = document.getElementById("session-time-out");
    const timer = setInterval(() => {
      // Calculate minutes and seconds
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = secondsLeft % 60;
      
      document.getElementById("session-time-out").innerText = `Session Timeout in 0${minutes} : ${seconds.toString().padStart(2, '0')}`;


      // Decrement the timer
      secondsLeft--;
      if(secondsLeft > 60) {
        sessionElement.style.color = "White";
      }
      if(secondsLeft < 60 && secondsLeft > 30) {
        sessionElement.style.color = "Yellow";
      }
      if(secondsLeft < 31) {
        sessionElement.style.color = "Red";
      }
      // Clear the interval when time is up
      if (secondsLeft < 0) {
        clearInterval(timer); // Stop timer once done
        navigate(urlRoutes.signup.contact);
      }
    }, 1000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);
  
  const [isPopupOpen, setPopupOpen] = useState(false);
  const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;
  const { studentData, setStudentData } = useRegistration();
  useEffect(() => {
    if (!studentData.email?.trim() || !studentData.contactNumber?.trim()) {
      navigate(urlRoutes.signup.contact);
    }
  }, [studentData, navigate]);
  const isNextEnabled = studentData.otp.trim().length === 6;

  // Open/Close Control for ChatGPT Support
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  useEffect(() => {
    // Auto-send OTP on page load if email is available
    const sendOTP = async () => {
      if (studentData.email) {
        try {
          const res = await axios.post("http://localhost:8001/send-otp", {
            email: studentData.email,
            firstName: studentData.firstName,
          });
          console.log(res.data.message); // You can log or show any success message here
        } catch (err) {
          console.error(err.response?.data?.error || "Failed to send OTP.");
        }
      }
    };

    sendOTP();
  }, [studentData.email, studentData.firstName]); // Send OTP only if email exists in studentData

  const handleVerifyClick = async () => {
      if (isNextEnabled) {
          try {
              // Verify the OTP by sending the email and otp to the server
              const res = await axios.post("http://localhost:8001/verify-otp", {
                  email: studentData.email,
                  otp: parseInt(studentData.otp, 10),
                });
                
                const messageElement = document.getElementById("otp-success-fail");
                messageElement.style.display = "block"; // Ensure the element is visible
                
                if (res.data.success) {
                    messageElement.style.color = "Green"; // Ensure the element is visible
                    document.getElementById("otp-success-fail").innerText = "Verification Successful";
                    
                    // navigate("/next-page");
                } else {
                    messageElement.style.color = "Red"; // Ensure the element is visible
                    document.getElementById("otp-success-fail").innerText =
            "Verification failed";
          setTimeout(() => {
              navigate("/signup/contact");
            }, 2000);
        }
    } catch (err) {
        // setPopupOpen(true);
        document.getElementById("registered-email").innerHTML = "d";
        console.error(err.response?.data?.detail || "OTP verification failed.");
        alert("An error occurred while verifying OTP. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.headerNav}>
        <Link to={urlRoutes.landing}>
          <div className={styles.logo}>StudentVision</div>
        </Link>
        <div className={styles.headerActions}>
          Existing User?{" "}
          <Link to={urlRoutes.login}>
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
            <p id="otp-success-fail" style={{ display: "none" }}></p>
            <h2>
              <ShieldCheck className="w-6 h-6 text-[#00bcd4]" />
              <br />
              Email OTP Verification
            </h2>
            <p id="session-time-out"></p>
            <br />
            <form className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  required
                  maxLength="6"
                  value={studentData.otp}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setStudentData({ ...studentData, otp: onlyNums });
                  }}
                />
                <label>Enter OTP</label>
              </div>
            </form>

            {/* Next Button */}
            <button
                className={isNextEnabled ? styles.nextBtn : styles.nextDisabled}
                disabled={!isNextEnabled}
                onClick={handleVerifyClick} // Handle the click event here
            >
                Verify <CheckCircle className="w-6 h-6 text-[#00bcd4]" />
            </button>
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

      <PoR isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
  <div style={{ color: "black" }}>
    <h2 style={{ color: "green", border: "none", borderRadius: "0.25rem", width: "100%", position: "relative", margin: "2vh 4vw"}}>
        Registration Successful
    </h2>
    <div>
        <div style={{ padding: "1vh 0vw 1vh 1vw", background: "black", color: "white", border: "none", borderRadius: "0.25rem", width: "90%"}}>
            <p>
                <strong>Please Note the Following Details</strong>
            </p>
        </div>
        <div>
            <p>User Id: <strong>SV-786-542-087</strong></p>
            <p>Registered Email: <strong><span id="registered-email"></span></strong></p>
            <p>This is your custom popup content.</p>
            <p>This is your custom popup content.</p>
        </div>
    </div>
    <button style={{ padding: "0.5rem 1rem", background: "darkblue", color: "white", border: "none", borderRadius: "0.25rem", width: "100%"}} onClick={() => setPopupOpen(false)}>
      Close
    </button>
  </div>
</PoR>

    </div>
  );
};

export default SignUpPageThree;



/*
TO BE CONSIDERED :

6. 🔁 Allow Resending OTP (Optional Enhancement)
If user’s OTP expires or fails, allow a "Resend OTP" button:
  <button onClick={sendOTP}>Resend OTP</button>
This makes your UX more user-friendly.
*/