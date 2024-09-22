import LoginIcon from '@mui/icons-material/Login';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Box } from '@mui/material';
import ClickExtendButton from '../buttons/ClickExtendButton';
import React from 'react';

export default function NavigateBar({handleLogout}) {
    return(
        <>
            <Box sx={{
                height: "30%",
                width: "100%",
                display:"flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                backgroundColor: "success.main"
            }}>
                <ClickExtendButton  element={<LoginIcon sx={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                }}
                />} handleClick={handleLogout} text={"Logout"}/>
                <ClickExtendButton  element={<ChatOutlinedIcon sx={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                }}
                />} text={"Feed"}/>
                <ClickExtendButton element={<AccountCircleOutlinedIcon sx={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                }}
                />} text={"Profil"}/>

            </Box>
        </>
    )
}