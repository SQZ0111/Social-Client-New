import React from 'react';
import { Box } from "@mui/material";

const ChatCard = ({ userChat, chatbotChat }) => {
    return (
       <>
        <Box sx={{
            width: '80%', 
            minHeight: '30%',
            maxHeight: '50%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',  
            backgroundColor:'white', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignSelf: 'flex-start',
            justifyContent: 'center', 
            fontSize: "10px",
            fontFamily: 'cursive',
            maxWidth: "100ch",
            padding: '10px', 
            borderRadius: '10px', 
            margin: '10px 0',
            color: 'black'

        }}>
            {userChat}
        </Box>
        <Box sx={{
            width: '80%', 
            minHeight: '30%',
            maxHeight: '50%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',  
            backgroundColor: "#00008b", 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignSelf: 'flex-end',
            justifyContent: 'center', 
            fontSize: "10px",
            fontFamily: 'cursive',
            maxWidth: "100ch",
            padding: '10px', 
            borderRadius: '10px', 
            margin: '10px 0',
            color: "white"

        }}>
            {chatbotChat}
        </Box>
        </>
    );
};

export default ChatCard;