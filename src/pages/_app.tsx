import React from "react";
import { ThemeProvider } from "next-themes";
import { GlobalProvider } from "../context/Provider";
import "../styles/globals.scss";
import DarkModeToggle from "../components/Globals/DarkModeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <div className="general">
      <GlobalProvider>
        <ThemeProvider enableSystem={false}>
          <DarkModeToggle />
          <Component {...pageProps} />
        </ThemeProvider>
      </GlobalProvider>
    </div>
  );
}

export default MyApp;
