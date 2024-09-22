
import Headline from "../parts/header/Headline";
import { Box } from "@mui/material";
import React from "react";
import SubmitButton from "../parts/buttons/SubmitButton";
import WelcomePicture from "../parts/pictures/WelcomePicture";

import { useNavigate } from "react-router-dom";

export default function Welcome(){
    const navigator = useNavigate();
    const handleClick = () => {
            navigator("/login");
    }
    return(
        <Box sx={{
            height: "80vh",
            fontSize: "32px",
            width: "100vw",
            display: "flex",
            rowGap: "5%",
            flexDirection: "column",
            alignItems:"center",
            justifyContent: "center"
        }}>
          <Headline size={"32px"}/>
          <WelcomePicture/>     
          <SubmitButton text="Continue" onHandleClick={handleClick}/>
        </Box>   

    )
}