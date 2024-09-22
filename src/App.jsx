import { ThemeProvider } from "@emotion/react";
import {  Button, CssBaseline } from "@mui/material";
import customTheme from "./components/customStyles/customTheme";
//import map does not recognize custom components, you need to define the import once that it appears
import Login from "./components/pages/Login";
import Welcome from "./components/pages/Welcome";
import Feed from "./components/pages/Feed";
import Register from "./components/pages/Register";
import ResetPage from "./components/pages/ResetPage";
//states und router
import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [resetAllowed, setResetAllowed] = useState(false);
  const [resetNumber, setResetNumber] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setLoggedIn(true);
    }
  },[])
  const handleLogout = () => {
    setLoggedIn(false);
  }
  const handleLogin = () => {
    setLoggedIn(true);
  }
  return (
    <>
        <ThemeProvider theme={customTheme}>
          <CssBaseline>
            <BrowserRouter>
              <Routes>
                <Route path="/welcome" element={<Welcome/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                <Route path="/feed" element={isLoggedIn ? <Feed handleLogout={handleLogout}/>: <Navigate to="/login"/>}/>
                <Route path="/" element={isLoggedIn ? <Navigate to="/feed"/> : <Navigate to="/welcome"/> }/>
                            <Route path="/reset/askEmail" element={<ResetPage  text={
              "Type in your Email to reset passwort"
            } resetAllowed={resetAllowed} setResetAllowed={setResetAllowed} resetNumber={resetNumber} setResetNumber={setResetNumber}
            />}></Route>
            <Route path="/reset/verify" element={<ResetPage text={
              "Type in the code you received via Email"
            } resetAllowed={resetAllowed} setResetAllowed={setResetAllowed} resetNumber={resetNumber} setResetNumber={setResetNumber}
            />}></Route>
            <Route path="/reset/newPassword" element={resetAllowed ?<ResetPage text={
              "Type in your new Password"
            }/> : <Navigate to="/login"/>}></Route>
              </Routes>
            
            </BrowserRouter>
            {/*Seiten hier importieren */}
            {/* <Login/> */}
            {/* <Feed/> */}
            {/* <Welcome/> */}
            {/* <Register/> */}
          </CssBaseline>
        </ThemeProvider>
    </>
  )
}

export default App
