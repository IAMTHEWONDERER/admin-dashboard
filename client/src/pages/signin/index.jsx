import { Routes, Route, } from "react-router-dom";
import SignIn from "../../scenes/signin";
function LogIn() {
    return (
     <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
    );
  }
  
  export default LogIn;
  