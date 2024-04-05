import { ImportContacts } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UseSelector, useSelector } from "react-redux";
import { createTheme } from "@mui/material";
import {themeSettings} from "theme";



function App() {
  const mode = useSelector ((state)=>state.global.mode);
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <>
    </>
  )
}

export default App
