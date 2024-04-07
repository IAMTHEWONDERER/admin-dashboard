import { CssBaseline, ThemeProvider } from "@mui/material";
import { UseSelector, useSelector } from "react-redux";
import { createTheme } from "@mui/material/styles";
import {themeSettings} from "theme";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import {useMemo} from "react";
import Dashboard from "scenes/dashboard";



function App() {
  const mode = useSelector ((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <>
    <div className="app">
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Routes>
      <Route element={<layout/>} />
      <Route path="/" element={<Navigate to ="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </ThemeProvider>
  </div>
    </>
  )
}

export default App
