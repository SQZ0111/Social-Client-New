import { Box } from "@mui/material";
import { useState } from "react";
import Headline from "../header/Headline";
//icons
//icons
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import SavingOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';

import SubmitButton from "../buttons/SubmitButton";
import ClickExtendButton from "../buttons/ClickExtendButton";
import axios from "axios";
import showNotification from "../notification/showNotification";
import { CommentModal } from "../modals/CommentModal";
import { getPostsFromBackend } from "../../../utils/AjaxHandler";


export default function PostCard({id,pictureUrl,title,location,instagramLink,cost,hearts,setPosts,posts}) {
    const [open,setOpen] = useState(false);
    const onModal = () => {
        setOpen(!open);
    }
    const addLike = async(id,posts,setPosts) => {
        const newPosts = await Promise.all(
            posts.map(async(post) => {
                if(post.id === id) {
                    console.log(`log without addlike,${id}`);
                    console.log(post.id);
                    const postId = post.id;
                    console.log(`Bearer ${localStorage.getItem("token")}`);
                    try {
                        const config = {
                            url: `http://localhost:3003/api/postAction/${postId}/like`,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                            },
                        };
                                
                        const response = await axios(config);
                        showNotification(response.data.message);
                        return response.data.post; //changed post
                    } catch(error) {
                        console.log(error);
                        showNotification(error.response.data.message,"red");
                        return post;
                    }
                }
                return post; //"normal post"
            })
        );
      getPostsFromBackend(setPosts);
    }

    return(
        <>
            <Box sx={{
                height: "45vh",
                width: "80%",
                backgroundColor: "primary.main",
                display: "grid",
                gridTemplateRows: "30% 70%"
            }}>
                {/* Picture */}
                <img style={{
                    width: "auto",
                    height: "100%",
                    justifySelf: "center"
                }}
                alt="Feed-image"
                src={pictureUrl}/>
                {/* Content */}
                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "25% 75"
                }}>
                <Headline size={"28px"} text={title}/>
                <Box sx={{
                    height: "100",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "60% 40%"
                }}>
                    {/* Content - left side */}
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}>
                    <ClickExtendButton  element={<LocationOnOutlinedIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />} text={location}/>
                    <ClickExtendButton  element={<LinkOutlinedIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />} text={instagramLink}/>
                    <ClickExtendButton  element={<SavingOutlinedIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />} text={cost}/>
                    </Box>
                    {/* Content - right side */}
                    <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        rowGap: "30%",
                        alignItems: "center"
                    }}
                    >
                        <SubmitButton text={"Info"} onHandleClick={onModal}/>
                        <ClickExtendButton handleClick={addLike} id={id} posts={posts} setPosts={setPosts}  element={<Diversity2OutlinedIcon sx={{
                            display: "block",
                            width: "32px",
                            height: "32px",
                            color: "text.primary",
                            borderRadius: "15%"
                        }}
                    />} text={`${hearts} Bonds`}/>
                    </Box>
                </Box>
                </Box>
                {open ?  <CommentModal setPosts={setPosts} posts={posts} open={open} setOpen={setOpen} id={id}/> : null}
            </Box>

        </>
    )
}