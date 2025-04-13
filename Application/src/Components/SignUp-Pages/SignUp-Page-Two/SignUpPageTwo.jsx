import React, { useEffect, useState } from "react";
import styles from "./SignUpPageTwo.module.css";
import { UserPlus, LogIn } from "lucide-react";
import aiIcon from "../../../assets/aiIcon.svg";
import { useRegistration } from "../../Student-Registration-Context/RegistrationContext";
import { Link, useNavigate } from "react-router-dom";
import urlRoutes from "../../../Constant/Navigation/Routes/landing-signup-routes";

// Complete list of all 195 sovereign states (per ISO 3166) with their international dialing codes
const countryCodes = [
  { name: "Afghanistan", code: "+93" },
  { name: "Albania", code: "+355" },
  { name: "Algeria", code: "+213" },
  { name: "Andorra", code: "+376" },
  { name: "Angola", code: "+244" },
  { name: "Antigua and Barbuda", code: "+1-268" },
  { name: "Argentina", code: "+54" },
  { name: "Armenia", code: "+374" },
  { name: "Australia", code: "+61" },
  { name: "Austria", code: "+43" },
  { name: "Azerbaijan", code: "+994" },
  { name: "Bahamas", code: "+1-242" },
  { name: "Bahrain", code: "+973" },
  { name: "Bangladesh", code: "+880" },
  { name: "Barbados", code: "+1-246" },
  { name: "Belarus", code: "+375" },
  { name: "Belgium", code: "+32" },
  { name: "Belize", code: "+501" },
  { name: "Benin", code: "+229" },
  { name: "Bhutan", code: "+975" },
  { name: "Bolivia", code: "+591" },
  { name: "Bosnia and Herzegovina", code: "+387" },
  { name: "Botswana", code: "+267" },
  { name: "Brazil", code: "+55" },
  { name: "Brunei", code: "+673" },
  { name: "Bulgaria", code: "+359" },
  { name: "Burkina Faso", code: "+226" },
  { name: "Burundi", code: "+257" },
  { name: "Cambodia", code: "+855" },
  { name: "Cameroon", code: "+237" },
  { name: "Canada", code: "+1" },
  { name: "Cape Verde", code: "+238" },
  { name: "Central African Republic", code: "+236" },
  { name: "Chad", code: "+235" },
  { name: "Chile", code: "+56" },
  { name: "China", code: "+86" },
  { name: "Colombia", code: "+57" },
  { name: "Comoros", code: "+269" },
  { name: "Congo", code: "+242" },
  { name: "Costa Rica", code: "+506" },
  { name: "Croatia", code: "+385" },
  { name: "Cuba", code: "+53" },
  { name: "Cyprus", code: "+357" },
  { name: "Czech Republic", code: "+420" },
  { name: "Democratic Republic of the Congo", code: "+243" },
  { name: "Denmark", code: "+45" },
  { name: "Djibouti", code: "+253" },
  { name: "Dominica", code: "+1-767" },
  { name: "Dominican Republic", code: "+1-809" },
  { name: "Ecuador", code: "+593" },
  { name: "Egypt", code: "+20" },
  { name: "El Salvador", code: "+503" },
  { name: "Equatorial Guinea", code: "+240" },
  { name: "Eritrea", code: "+291" },
  { name: "Estonia", code: "+372" },
  { name: "Eswatini", code: "+268" },
  { name: "Ethiopia", code: "+251" },
  { name: "Fiji", code: "+679" },
  { name: "Finland", code: "+358" },
  { name: "France", code: "+33" },
  { name: "Gabon", code: "+241" },
  { name: "Gambia", code: "+220" },
  { name: "Georgia", code: "+995" },
  { name: "Germany", code: "+49" },
  { name: "Ghana", code: "+233" },
  { name: "Greece", code: "+30" },
  { name: "Grenada", code: "+1-473" },
  { name: "Guatemala", code: "+502" },
  { name: "Guinea", code: "+224" },
  { name: "Guinea-Bissau", code: "+245" },
  { name: "Guyana", code: "+592" },
  { name: "Haiti", code: "+509" },
  { name: "Honduras", code: "+504" },
  { name: "Hungary", code: "+36" },
  { name: "Iceland", code: "+354" },
  { name: "India", code: "+91" },
  { name: "Indonesia", code: "+62" },
  { name: "Iran", code: "+98" },
  { name: "Iraq", code: "+964" },
  { name: "Ireland", code: "+353" },
  { name: "Israel", code: "+972" },
  { name: "Italy", code: "+39" },
  { name: "Jamaica", code: "+1-876" },
  { name: "Japan", code: "+81" },
  { name: "Jordan", code: "+962" },
  { name: "Kazakhstan", code: "+7" },
  { name: "Kenya", code: "+254" },
  { name: "Kiribati", code: "+686" },
  { name: "Kosovo", code: "+383" },
  { name: "Kuwait", code: "+965" },
  { name: "Kyrgyzstan", code: "+996" },
  { name: "Laos", code: "+856" },
  { name: "Latvia", code: "+371" },
  { name: "Lebanon", code: "+961" },
  { name: "Lesotho", code: "+266" },
  { name: "Liberia", code: "+231" },
  { name: "Libya", code: "+218" },
  { name: "Liechtenstein", code: "+423" },
  { name: "Lithuania", code: "+370" },
  { name: "Luxembourg", code: "+352" },
  { name: "Madagascar", code: "+261" },
  { name: "Malawi", code: "+265" },
  { name: "Malaysia", code: "+60" },
  { name: "Maldives", code: "+960" },
  { name: "Mali", code: "+223" },
  { name: "Malta", code: "+356" },
  { name: "Marshall Islands", code: "+692" },
  { name: "Mauritania", code: "+222" },
  { name: "Mauritius", code: "+230" },
  { name: "Mexico", code: "+52" },
  { name: "Micronesia", code: "+691" },
  { name: "Moldova", code: "+373" },
  { name: "Monaco", code: "+377" },
  { name: "Mongolia", code: "+976" },
  { name: "Montenegro", code: "+382" },
  { name: "Morocco", code: "+212" },
  { name: "Mozambique", code: "+258" },
  { name: "Myanmar", code: "+95" },
  { name: "Namibia", code: "+264" },
  { name: "Nauru", code: "+674" },
  { name: "Nepal", code: "+977" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Nicaragua", code: "+505" },
  { name: "Niger", code: "+227" },
  { name: "Nigeria", code: "+234" },
  { name: "North Korea", code: "+850" },
  { name: "North Macedonia", code: "+389" },
  { name: "Norway", code: "+47" },
  { name: "Oman", code: "+968" },
  { name: "Pakistan", code: "+92" },
  { name: "Palau", code: "+680" },
  { name: "Panama", code: "+507" },
  { name: "Papua New Guinea", code: "+675" },
  { name: "Paraguay", code: "+595" },
  { name: "Peru", code: "+51" },
  { name: "Philippines", code: "+63" },
  { name: "Poland", code: "+48" },
  { name: "Portugal", code: "+351" },
  { name: "Qatar", code: "+974" },
  { name: "Romania", code: "+40" },
  { name: "Russia", code: "+7" },
  { name: "Rwanda", code: "+250" },
  { name: "Saint Kitts and Nevis", code: "+1-869" },
  { name: "Saint Lucia", code: "+1-758" },
  { name: "Saint Vincent and the Grenadines", code: "+1-784" },
  { name: "Samoa", code: "+685" },
  { name: "San Marino", code: "+378" },
  { name: "Sao Tome and Principe", code: "+239" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Senegal", code: "+221" },
  { name: "Serbia", code: "+381" },
  { name: "Seychelles", code: "+248" },
  { name: "Sierra Leone", code: "+232" },
  { name: "Singapore", code: "+65" },
  { name: "Slovakia", code: "+421" },
  { name: "Slovenia", code: "+386" },
  { name: "Solomon Islands", code: "+677" },
  { name: "Somalia", code: "+252" },
  { name: "South Africa", code: "+27" },
  { name: "South Korea", code: "+82" },
  { name: "South Sudan", code: "+211" },
  { name: "Spain", code: "+34" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Sudan", code: "+249" },
  { name: "Suriname", code: "+597" },
  { name: "Sweden", code: "+46" },
  { name: "Switzerland", code: "+41" },
  { name: "Syria", code: "+963" },
  { name: "Taiwan", code: "+886" },
  { name: "Tajikistan", code: "+992" },
  { name: "Tanzania", code: "+255" },
  { name: "Thailand", code: "+66" },
  { name: "Timor-Leste", code: "+670" },
  { name: "Togo", code: "+228" },
  { name: "Tonga", code: "+676" },
  { name: "Trinidad and Tobago", code: "+1-868" },
  { name: "Tunisia", code: "+216" },
  { name: "Turkey", code: "+90" },
  { name: "Turkmenistan", code: "+993" },
  { name: "Tuvalu", code: "+688" },
  { name: "Uganda", code: "+256" },
  { name: "Ukraine", code: "+380" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "United Kingdom", code: "+44" },
  { name: "United States", code: "+1" },
  { name: "Uruguay", code: "+598" },
  { name: "Uzbekistan", code: "+998" },
  { name: "Vanuatu", code: "+678" },
  { name: "Vatican City", code: "+379" },
  { name: "Venezuela", code: "+58" },
  { name: "Vietnam", code: "+84" },
  { name: "Yemen", code: "+967" },
  { name: "Zambia", code: "+260" },
  { name: "Zimbabwe", code: "+263" },
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
      // Find the new country's data based on the selection.
      const country = countryCodes.find(c => c.name === e.target.value);
      setSelectedCountry(country);
    
      // Get the current contact number (or default to an empty string).
      let currentContact = studentData.contactNumber || '';
    
      // Check against known country codes and remove the matching country code.
      for (const { code } of countryCodes) {
        if (currentContact.startsWith(code)) {
          currentContact = currentContact.slice(code.length);
          break;
        }
      }
      
      // Remove any leading white spaces from the remaining local number.
      currentContact = currentContact.trim();
      
      // Concatenate the new country code with the preserved local number.
      const updatedContact = `${country.code}${currentContact ? " " + currentContact : ""}`;
    
      // Update the studentData state.
      setStudentData({
        ...studentData,
        contactNumber: updatedContact,
      });
    };
    
  
    // Open/Close Control for ChatGPT Support -----------------------------------------------------------------------------------------
  
    const [isSupportOpen, setIsSupportOpen] = useState(false);
  
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
          <Link to={isNextEnabled ? urlRoutes.signup.email_opt_verification : "#"} className={isNextEnabled ? styles.nextEnabled : styles.nextDisabled}>
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