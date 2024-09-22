import { Box,Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import React from "react";



export default function QuoteCard() {
    const [author,setAuthor] = useState("Unknown");
    const [quote, setQuote] = useState("Birth is a new bond");
    const handleLoad = async(handleAuthor,handleQuote) => {
        const resp = await axios("http://localhost:3001/api/quotes")
        const randomItem = Math.floor(Math.random() * 50)
        console.log(resp.data);
        handleAuthor(resp.data[randomItem].a);
        handleQuote(resp.data[randomItem].q);
    }
    return(
        <Box
        sx={{
            width: "40%",
            height: "80%",
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50%",
            textAlign: "center",
            boxShadow: "rgba(0,0,0,0.35) 0px 5px 15px"
        }}>
            <p>{`${quote} - ${author}`}</p>
            <Button onClick={() => handleLoad(setAuthor,setQuote)}>
                Inspire me
            </Button>
        </Box>
    )
}