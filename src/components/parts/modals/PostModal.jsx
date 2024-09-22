import { Box, Button, Modal, TextField } from "@mui/material";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { createPost, getPostsFromBackend } from "../../../utils/AjaxHandler";

export default function PostModal({open,setOpen,setPosts}) {
    const formRef = useRef();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = new FormData();
        formData.append("id",uuidv4());
        formData.append("title", form.title.value);
        formData.append("location", form.location.value);
        formData.append("instagramLink", form.instagramLink.value);
        formData.append("cost", form.cost.value);
        formData.append("image", form.image.files[0]);
        formData.append("hearts", 0);
        await createPost(formData);
        await getPostsFromBackend(setPosts);
    }
    return(
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* Modal styling */}
                <Box sx={{
                    postion: "relative",
                    margin: "5% auto",
                    height: "80%",
                    width: "50%",
                    background: "#FFF",
                    borderRadius: "2px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.4)"
                }}>
                    {/* Layout for input fields  */}
                    <Box
                    component="form"
                    ref = {formRef}
                    onSubmit={(e) => {handleSubmit(e)}}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: "5%"
                    }}>
                        <Button
                            variant="contained"
                            component="label"
                            >
                                <input
                                type="file"
                                accept="image/*"
                                hidden
                                name="image"
                                />Upload File
                        </Button>
                        <TextField id="outlined-basic" label="title" name="title" variant="outlined"/>
                        <TextField id="outlined-basic" label="location" name="location" variant="outlined"/>
                        <TextField id="outlined-basic" label="Instagram" name="instagramLink" variant="outlined"/>
                        <TextField id="outlined-basic" label="cost" name="cost" variant="outlined"/>
                        <Button
                         type="submit"
                         variant="contained"

                         sx={{
                            width: "30%",
                            height: "10%",
                            backgroundColor: "success.main",
                            color: "text.primary",
                            borderRadius: "15%",
                            top: "10%",
                            position: "relative"
                         }}
                        >Submit</Button>
                    </Box>
                </Box>
            </Modal>
        
        </>
    )
}