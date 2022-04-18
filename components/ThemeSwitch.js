import { useState } from "react";
import DarkTheme from "./DarkTheme";

function loadDarkMode() {
  // We do this because the local storage isn't define initialy on the server.
  // If it is undefine it means that we are running initially at the server.
  if (typeof localStorage === "undefined") {
    return false;
  }
  //JSON.parse Converts a JavaScript Object Notation (JSON) string into an object.
  // In this case it convert this value back to a boolean value.
  const value = localStorage.getItem("darkMode");
  return value === null ? false : JSON.parse(value);
}

function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(loadDarkMode);

  const handleClick = () => {
    // We don't need to ckeck here if localStorage is available on the server, becuse
    // This click event always happen on the broser not on the server.
    // darkMode is a boolean but localStoreage expects a string.
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };

  console.log("[ThemeSwitch] darkMode:", darkMode);
  const text = darkMode ? "Light Mode" : "Dark Mode";
  return (
    <>
      {/* suppressHydrationWarning says It is ok to override the state set in the server by the browser  */}
      <button onClick={handleClick} suppressHydrationWarning>
        {text}
      </button>

      <style jsx>{`
        button {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
        }
      `}</style>
      {darkMode && <DarkTheme />}
    </>
  );
}

export default ThemeSwitch;
