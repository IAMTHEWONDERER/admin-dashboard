import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AdminDashboard from "pages/adminDashboard";
import { themeSettings } from "theme";
import LogIn from "pages/signin";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LogIn/>
          <AdminDashboard />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
