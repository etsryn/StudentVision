import subprocess
import time
from pywinauto import Desktop

script1_dir = r"../src/Backend/Application-Programming-Interfaces/Log-of-Landing"
script2_dir = r"../src/Backend/Application-Programming-Interfaces/OAuth-User-Verified-Registration"
script3_dir = r"../src/Backend/Application-Programming-Interfaces/OTP-Verification"
npm_dir     = r"../"

cmd1 = (
    f'start powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle=\'LandingData\'; '
    f'cd \'{script1_dir}\' ; python landingData.py"'
)
cmd2 = (
    f'start powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle=\'SignUpOAuth\'; '
    f'cd \'{script2_dir}\' ; python signUpOAuth.py"'
)
cmd3 = (
    f'start powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle=\'OtpVerification\'; '
    f'cd \'{script3_dir}\' ; python otp-verification.py"'
)
cmd4 = (
    f'start powershell -NoExit -Command "$Host.UI.RawUI.WindowTitle=\'NpmRunDev\'; '
    f'cd \'{npm_dir}\' ; npm run dev"'
)

subprocess.Popen(cmd1, shell=True)
subprocess.Popen(cmd2, shell=True)
subprocess.Popen(cmd3, shell=True)
subprocess.Popen(cmd4, shell=True)

print("Waiting for windows to appear...")
time.sleep(5)

desktop = Desktop(backend="uia")

def send_keys_to_window(title, keys):
    try:
        win = desktop.window(title=title)
        win.set_focus()
        print(f"Sending keys '{keys}' to window '{title}'")
        win.type_keys(keys, with_spaces=True)
    except Exception as e:
        print(f"Error sending keys to window '{title}': {e}")

action = input("Press k to kill powershells : ")

if action.lower() == 'k':
    for title in ["LandingData", "SignUpOAuth", "OtpVerification"]:
        send_keys_to_window(title, "^c")
        time.sleep(1)
        send_keys_to_window(title, "exit{ENTER}")

print("All Servers Aborted.")
