import React, {useRef,useEffect,useState} from "react";
import {DateTime} from 'luxon';
import { TextField,Modal,Typography,Box} from "@mui/material";
//CommentCard
import { CommentCard } from "../cards/CommentCard";
import axios from "axios";
import showNotification from "../notification/showNotification";
import { getPostsFromBackend } from "../../../utils/AjaxHandler";
export function CommentModal({open,setOpen,id,posts,setPosts}) {
    const CommentStyles = {
        box: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '90vh',
            width: '90vw',
            display: 'grid',
            gridTemplateRows: '5% 80% 15%',
            justifyItems: 'center',
            gap: '3%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        commentBox: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            overflowX: 'hidden',
            '&::webkit-scrollbar': {
                display: 'none'
            },
            msOverflowStyle: 'none', /*IE and Egde */
            scrollbarWidth: 'none' /* Firefox */
        }
    };
    const [token,setToken] = useState("");
    const [comments,setComments] = useState([]);
    const textfieldRef = useRef();
    const sendComment = async(e) => {
            e.preventDefault();
            const userComment = textfieldRef.current.comment.value;
            console.log(userComment);
            const commentTime = getTwitterLike();
            const commentData = {
                postId: id,
                comment: userComment,
                time: commentTime
            }
            const config = {
                url: "http://localhost:3003/api/postAction/comment",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: commentData
            }
            console.log(config);
            const response = await axios(config);
            console.log(response);
            showNotification(response.data.message,"normal");
            getPostsFromBackend(setPosts);
        // } catch(e) {
        //     showNotification(e.response.data.message,"red");
        // }
    }
    //filter id of current post from posts
    //to show the comments of the corresponding post
    const filterPostOnId = () => {
        return posts.filter(element => {
            return element.id === id ? element : null
        })
    }
    //to show the comments of the corresponding post
    const setCommentsOnFilter = () => {
        //console.log(filterPostOnId()[0].comments);
        if(filterPostOnId  != null) {
            const postWithComments = filterPostOnId();
            setComments(postWithComments[0].comments);
        }
    } 
    //Erzeuge ein Array mit vielen Farbwerten (hexwerte)
    //Wähle mit einer random Funktion einen Farbwert für den user aus -https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    //return den farbwert
    const stringToColor = (string) => {
        let hash = 0;
        for(let i= 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#'; // const hexcolor = '#'; const hexColDictionary =  {'a': 'F', 'b': 'A'};   string.forEach(char => hexColor += hexColDictionary.char )
        for(let i= 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(2);
        }
        return color;
    }
    const getTwitterLike = () => {
        return DateTime.now().toFormat('HH:mm');
    }
    useEffect(() => {
        setCommentsOnFilter();
        setToken(localStorage.getItem("token"));
    },[posts])
    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
               aria-labelledby="modal-modal-comment-section"
               aria-describedby="make your comments here"    
        >
        <Box sx={CommentStyles.box}>
            <Typography id="modal-modal-title" variant="h4" component="h4">
                Share Your Thoughts 🍁
            </Typography>
            <Box sx={CommentStyles.commentBox}>
                {
                    comments.map((element) => {
                        const color = stringToColor(element.user);
                        return(
                            <CommentCard user={element.user} text={element.commented}
                             color={color} timeStamp ={element.timeStamp}/>
                        )
                    })
                }
            </Box>
                <Box
                  component='form'
                  ref={textfieldRef}
                  onSubmit={(e) => sendComment(e)}
                >
                    <TextField
                           required
                           id="comment-textfield"
                           label="Comment Your Thought"
                           defaultValue="Hi y'all"
                           variant="standard"
                           name="comment"
                    />
                </Box>
        </Box>
        </Modal>
    )
}

