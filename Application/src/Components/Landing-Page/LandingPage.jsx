import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import aiIcon from "../../assets/aiIcon.svg";
import landingImage from "../../assets/landing-image.png";
import axios from "axios";
import { Link } from "react-router-dom";
import urlRoutes from "../../Constant/Navigation/Routes/landing-signup-routes";
// import { useRegistration } from "../Student-Registration-Context/RegistrationContext";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const iconSize = `${0.085 * (window.innerWidth / 100)}vw`;
  const [userInfo, setUserInfo] = useState({
    ip: "Fetching...",
    location: "Fetching...",
    timezone: "Fetching...",
    browser: "Fetching...",
    os: "Fetching...",
    screenSize: "Fetching...",
    geolocation: "Fetching...",
    deviceType: "Fetching...",
    connectionType: "Fetching...",
    referrer: document.referrer || "Direct Visit",
    language: navigator.language || "Unknown",
    timeFormat: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    adBlocker: "Checking...",
    cpuInfo: "Fetching...",
    gpuInfo: "Fetching...",
    battery: "Fetching...",
    ram: "Fetching...",
    storage: "Fetching...",
    audioDevices: "Not Provided",
    mediaDevices: "Not Provided",
    fonts: "Not Provided",
    webGLRenderer: "Fetching...",
    touchSupport: "Fetching...",
    userAgent: navigator.userAgent,
  });

  // Utility: Detect Browser, OS, and Device Type synchronously.
  const detectDeviceDetails = () => {
    const userAgent = navigator.userAgent;
    let browser = "Unknown",
      os = "Unknown",
      deviceType = "Desktop";

    if (/chrome|chromium|crios/i.test(userAgent)) browser = "Chrome";
    else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
    else if (/safari/i.test(userAgent)) browser = "Safari";
    else if (/opr\//i.test(userAgent)) browser = "Opera";
    else if (/edg/i.test(userAgent)) browser = "Edge";

    if (/windows/i.test(userAgent)) os = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) os = "MacOS";
    else if (/linux/i.test(userAgent)) os = "Linux";
    else if (/android/i.test(userAgent)) {
      os = "Android";
      deviceType = "Mobile";
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
      os = "iOS";
      deviceType = "Mobile";
    }

    return { browser, os, deviceType };
  };

  // Utility: Fetch IP, location, and timezone
  const fetchIPInfo = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const { ip, city, region, country_name, timezone } = response.data;
      return {
        ip,
        location: `${city}, ${region}, ${country_name}`,
        timezone,
      };
    } catch (error) {
      return {
        ip: "Error",
        location: "Error",
      };
    }
  };

  // Utility: Fetch Geolocation (wrapped in a promise)
  const fetchGeolocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            resolve({
              geolocation: `Lat: ${latitude}, Lng: ${longitude} (±${accuracy}m)`,
            });
          },
          () => {
            resolve({ geolocation: "Permission Denied" });
          }
        );
      } else {
        resolve({ geolocation: "Not Supported" });
      }
    });
  };

  // Utility: Detect Connection Type
  const detectConnectionType = () => {
    if (navigator.connection) {
      return {
        connectionType: `${navigator.connection.effectiveType} (${navigator.connection.downlink} Mbps)`,
      };
    }
    return { connectionType: "Unknown" };
  };

  // Utility: Detect AdBlocker (wrapped in a promise)
  const detectAdBlocker = () => {
    return new Promise((resolve) => {
      const ad = document.createElement("div");
      ad.innerHTML = "&nbsp;";
      ad.className = "adsbox";
      document.body.appendChild(ad);
      setTimeout(() => {
        const adBlocker = ad.offsetHeight === 0 ? "Enabled" : "Disabled";
        ad.remove();
        resolve({ adBlocker });
      }, 100);
    });
  };

  // Utility: Fetch GPU and CPU Info from WebGL
  const fetchSystemInfo = () => {
    let gpuInfo = "Unknown";
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
    return {
      cpuInfo: navigator.hardwareConcurrency
        ? `${navigator.hardwareConcurrency} Cores`
        : "Unknown",
      gpuInfo,
      webGLRenderer: gpuInfo,
    };
  };

  // Utility: Fetch Battery Status
  const fetchBatteryInfo = async () => {
    if (navigator.getBattery) {
      try {
        const battery = await navigator.getBattery();
        return {
          battery: `${(battery.level * 100).toFixed(0)}% ${
            battery.charging ? "(Charging)" : "(Not Charging)"
          }`,
        };
      } catch (error) {
        return { battery: "Error" };
      }
    }
    return { battery: "Not Supported" };
  };

  // Utility: Fetch RAM Info
  const fetchRAMInfo = () => {
    if (navigator.deviceMemory) {
      return { ram: `${navigator.deviceMemory} GB` };
    }
    return { ram: "Unknown" };
  };

  // Utility: Fetch Available Storage Info
  const fetchStorageInfo = async () => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      try {
        const { quota, usage } = await navigator.storage.estimate();
        return {
          storage: `Used: ${(usage / (1024 * 1024)).toFixed(2)} MB / ${(
            quota /
            (1024 * 1024)
          ).toFixed(2)} MB`,
        };
      } catch (error) {
        return { storage: "Error" };
      }
    }
    return { storage: "Not Supported" };
  };

  // Utility: Detect Touch Support
  const detectTouchSupport = () => {
    return {
      touchSupport:
        "ontouchstart" in window || navigator.maxTouchPoints > 0
          ? "Supported"
          : "Not Supported",
    };
  };

  // Utility: Send data to backend
  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/user-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      console.log("Response from Backend:", resData);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // Group all updates in one useEffect
  useEffect(() => {
    const updateUserInfo = async () => {
      // Synchronous update of basic info
      const { browser, os, deviceType } = detectDeviceDetails();
      const updatedData = {
        browser,
        os,
        deviceType,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || "Unknown",
        timeFormat:
          Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        referrer: document.referrer || "Direct Visit",
        userAgent: navigator.userAgent,
        adBlocker: "Checking...", // Will be updated below
      };

      // Run async functions concurrently where possible
      const [ipData, geoData, batteryData, storageData, adBlockerData] =
        await Promise.all([
          fetchIPInfo(),
          fetchGeolocation(),
          fetchBatteryInfo(),
          fetchStorageInfo(),
          detectAdBlocker(),
        ]);

      // Synchronous or immediately available data
      const connectionData = detectConnectionType();
      const systemData = fetchSystemInfo();
      const ramData = fetchRAMInfo();
      const touchData = detectTouchSupport();

      // Merge all fetched data
      const finalData = {
        ...updatedData,
        ...ipData,
        ...geoData,
        ...connectionData,
        ...batteryData,
        ...ramData,
        ...storageData,
        ...adBlockerData,
        ...systemData,
        ...touchData,
      };

      // Update state in one go
      setUserInfo((prev) => ({ ...prev, ...finalData }));

      // Send the updated user info to the backend
      sendDataToBackend(finalData);
    };

    updateUserInfo();
  }, []);

  // Open/Close Control for ChatGPT Support -----------------------------------------------------------------------------------------

  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Function to Send Data to Python Backend API  -----------------------------------------------------------------------------------

  // Returning Landing Page to App.jsx ----------------------------------------------------------------------------------------------
  // const { studentData, setStudentData } = useRegistration();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
        console.log("User Name:", user?.name);
        console.log("User Given-Name:", user?.given_name);
        console.log("User Nick-Name:", user?.nickname);
        console.log("User Family-Name:", user?.family_name);
        console.log("User Email:", user?.email);
        console.log("User Picture:", user?.picture);
        console.log("User Email-Verified:", user?.email_verified);
        console.log("User Sub:", user?.sub);
        console.log("User Updated At:", user?.updated_at);

        // const loginButtonVisibility = document.getElementById("loginButtonVisibility");
        // loginButtonVisibility.style.display = "none"; // Ensure the element is visible

        const loginButtonVisibility = document.getElementById("loginButtonVisibility");
        loginButtonVisibility.style.display = "none"; // ✅ This disables the button

        const signupButtonVisibility = document.getElementById("signupButtonVisibility");
        signupButtonVisibility.style.display = "none"; // ✅ This disables the button

        const logoutButtonVisibility = document.getElementById("logoutButtonVisibility");
        logoutButtonVisibility.style.display = "block"; // ✅ This disables the button


        
    }
  }, [user, isAuthenticated, isLoading]);

  useEffect(() => {
    const OAuthUserRegiser = async () => {
      if (!isLoading && isAuthenticated && user) {
        try {
          const res = await axios.post("http://localhost:8002/register-oauth-user", {
            name: user?.name,
            givenName: user?.given_name,
            nickName: user?.nickname,
            familyName: user?.family_name,
            email: user?.email,
            isEmailVerified: String(user?.email_verified),
            sub: user?.sub,
            picture: user?.picture,
            updatedAt: user?.updated_at,
          });
          console.log("hyyyyyy", res.data.message);
        } catch (err) {
          console.error(err.response?.data?.error || "Failed to Register OAuth Authorized User");
        }
      }
    };

    OAuthUserRegiser();
  }, [user, isAuthenticated, isLoading]);

  return (
    <div className={styles.container}>
      {/* Header / Navigation */}
      <header className={styles.headerNav}>
        <Link to={urlRoutes.landing}>
          <div className={styles.logo}>StudentVision</div>
        </Link>
        <nav className={styles.nav}>
          <a href="#tech">Technologies</a>
          <a href="#features">Features</a>
          <a href="#community">Community</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className={styles.headerActions}>
          <Link to={urlRoutes.login}>
            <button className={styles.loginBtn} id="loginButtonVisibility">
              Login{" "}
              <LogIn
                size={iconSize}
                strokeWidth={2}
                className={styles.loginIcon}
              />
            </button>
          </Link>
          <Link to={urlRoutes.signup.personal}>
            <button className={styles.signupBtn} id="signupButtonVisibility">
              Sign Up{" "}
              <UserPlus
                size={iconSize}
                strokeWidth={2}
                className={styles.signupIcon}
              />
            </button>
          </Link>
          <button className={styles.logoutBtn} id="logoutButtonVisibility" style={{ display: "none" }}>
              Logout{" "}
              <LogOut 
                size={iconSize}
                className={styles.logoutIcon}
              />
            </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            <span>Embark on </span>StudentVision;
            <span> Journey to Your Growth</span>
          </h1>
          <p>
            StudentVision is a student-centric AI-powered learning platform for
            DS, AI, ML, and more, delivering personalized study insights through
            a custom dashboard, a research hub, and live coding environments. It
            integrates Google Colab, Modelverse & Dataverse, plus AI-driven
            study recommendations for an efficient, personalized learning
            experience.
          </p>
          <Link to="https://etsryn.github.io/rayyandigitalspace">
            <button className={styles.ctaButton}>Developer</button>
          </Link>
          <h3>
            ~ Developed By <span>A Student</span>, For <span>The Students</span>
          </h3>
        </div>
        <div className={styles.heroImage}>
          {/* Here you could replace with an animated SVG or dynamic ML illustration */}
          <img
            src={landingImage}
            className={styles.landing_Image}
            alt="Futuristic AI Illustration"
          />
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

      {/* Features / Technologies Section */}
      <section className={styles.features} id="tech">
        <h2>Powering Advanced Technologies</h2>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <img src="/assets/neuralnet.svg" alt="Dataverse" />
            <h3>Dataverse</h3>
            <p>Discover and build deep learning models with ease.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/assets/datascience.svg" alt="Google Colab" />
            <h3>Integrated Google Colab</h3>
            <p>Transform raw data into actionable insights.</p>
          </div>
          <div className={styles.featureItem}>
            <img src="/assets/code.svg" alt="Live Coding" />
            <h3>Real-time Coding</h3>
            <p>Practice coding in Python, Java, C++ and more – live!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          All rights reserved &copy; {new Date().getFullYear()} StudentVision |
          Version @ 1.0.0
        </p>
      </footer>

      {/* User Information to Sent to DB */}
      {/* <div>
            <h1>User Information</h1>
            {Object.entries(userInfo).map(([key, value]) => (
                <p key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1").trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}:</strong> {value}
                </p>
            ))}
            </div> */}
      {/*  */}
    </div>
  );
};

export default LandingPage;
