import { Box } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrayUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState, useEffect,Fragment } from "react";
import React from "react";
import axios from "axios";
//components
import ClickExtendButton from "../parts/buttons/ClickExtendButton";
import NavigateBar from "../parts/bars/Navigationbar";
import PostCard from "../parts/cards/PostCard";
import PostModal from "../parts/modals/PostModal";
import { ChatbotCard } from "../parts/cards/ChatbotCard";
import {v4 as uuidv4} from 'uuid';
import SubmitButton from "../parts/buttons/SubmitButton";
import { getPostsFromBackend } from "../../utils/AjaxHandler";
export default function Feed({handleLogout}) {
    const [expand,setExpand] = useState(true);
    const [open,setOpen] = useState(false);
    const onModal = () => {
        setOpen(!open);
    }
    const [posts,setPosts] = useState([]);
    // const getPostsFromBackend = async () => {
    //     try {
    //         const response = await axios("http://localhost:3003/api/posts");
    //         console.log(response.data);
    //         setPosts(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        getPostsFromBackend(setPosts);
    },[])
    return(
        <>  
            {/* Overall App Layout-Box */}
            <Box
            sx={{
                height: "100vh",
                width: "100vw",
                overflowY: "scroll",
                display: "grid",
                gridTemplateColumns: "10% 65% 25%",
                fontSize: "32px"
            }}> 
                {/*Navigatebar left*/}
                <Box sx={{
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    height: "100%",
                    width: "100%"
                }}> 
                    <ClickExtendButton element={expand ? 
                    <ExpandMoreIcon onClick={(e) => {setExpand(false)}} sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    /> : <KeyboardArrayUpIcon onClick={(e) => console.log("a")} sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}/>} handleLogout={handleLogout} showBar={true} handleParam={!expand} handleClick={setExpand}/>
                </Box>
                {/* Posts of feed */}
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    rowGap: "10vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    {
                        posts.map((post) => {
                            return(
                                <Fragment key={post.id}>
                                    <PostCard id={post.id} pictureUrl={post.imageUrl} 
                                    title={post.title} location={post.location} instagramLink={post.instagramLink}
                                    cost={post.cost} hearts={post.hearts} setPosts={setPosts} posts={posts}/>
                                </Fragment>
                            )
                        })
                    }
                </Box>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    rowGap: "10vh"
                }}>
                    <SubmitButton text={"Make a new Bond"} positionValue={"sticky"} onHandleClick={onModal}/>
                    <ChatbotCard/>
                </Box>
                  {open ? <PostModal setPosts={setPosts} open={open} setOpen={setOpen} getPostsFromBackend={getPostsFromBackend}/>: null}
            </Box>
        </>
    )
}