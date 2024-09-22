import React from "react"
import { Button,Box, TextField} from "@mui/material";
import { useState,useEffect } from "react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import axios from "axios";
import ChatCard from "./ChatCard";
import { chatHandler,getChats } from "../../../utils/AjaxHandler";

export const ChatbotCard = () => {
    const [expand,setExpand] = useState(false);
    const [inputText, setInputText] = useState(""); 
    const [messages, setMessages] = useState([]);
    const [token,setToken] = useState("");
    const handleButtonClick = (event) => {
        if (event.detail === 0) {
            event.preventDefault();
            return;
        }
        setExpand(!expand);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await chatHandler({
            data: inputText,
            token: token,
            setMessages: setMessages,
        });
        setInputText("");
        };

    
    const boxStyleShort = {
        height: "5vh",
        width: "10vw",
        top: "90vh",
        position: "fixed",
        boxShadow: '0 0 15px 5px #ff69b4, 0 0 20px 10px #00bfff, 0 0 25px 15px #7fff00', // Radiating box-shadow
        backgroundColor: "success.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "10px",
        color: "black",
        padding: '10px', // Dynamic sizing with padding
    };
    const boxStyleLarge = {
        height: "60vh",
        width: "20vw",
        top: "35vh",
        zIndex: "1",
        borderRadius: "10px",
        position: "fixed",
        backgroundColor: "success.main",
        display: "flex",
        flexDirection: "column",
        overflowY: 'scroll',

    }
    
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    },[expand]);    
    useEffect(() => {
    if (messages) {
        localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
    }, [messages]);


    if(expand == false) {
        return(
            <>
                <Button onClick={(e) => setExpand(!expand)}>
                    <Box sx={boxStyleShort}>
                        <SmartToyIcon/>
                        <p>Chat with me</p>
                    </Box>
                </Button>     
            </>
        )
    } else if(expand == true) {
        return(
            <>
                <Button onClick={handleButtonClick}> 
                    <Box sx={boxStyleLarge}>
                        {
                        messages?.map((message, index) => (
                            <ChatCard
                            key={index}
                            userChat={message.userChat}
                            chatbotChat={message.chatAnswer}
                            />
                        ))
                        }
                        <TextField 
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            autoFocus
                            value={inputText}
                            onChange={(e) => setInputText(e.currentTarget.value)}
                            onKeyDown={(e) => e.key == "Enter" ? handleSubmit(e)  : null}
                            sx={{

                                backgroundColor: "#c0c0c0",
                                width: "90%",
                                bottom: 10,
                                left: 5,
                                right: 5, 
                            }}
                        />
                    </Box>
                </Button>     
            </>
        )
    }
}
