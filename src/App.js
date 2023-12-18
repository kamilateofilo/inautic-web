import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Login from "./scenes/login/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!window.location.pathname.includes("/login") && (
            <Sidebar isSidebar={isSidebar} />
          )}
          <main className="content">
            {!window.location.pathname.includes("/login") && (
              <Topbar setIsSidebar={setIsSidebar} />
            )}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/Dashboard" />} />
              <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
