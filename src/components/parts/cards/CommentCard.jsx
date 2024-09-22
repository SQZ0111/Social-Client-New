import React, {useEffect,useState} from 'react';
import {Box, Typography} from '@mui/material';


export function CommentCard({user, text, color, timeStamp}) {
    //comment is here "text" formattedText will be called in a helper function that processes the comment
    const styles = {
        commentBox: {
            height: '20%',
            width: '100%',
            backgroundColor: color,
            color: '#ff33cc',
            border: '1px solid #ff33cc',
            boxShadow: '0px 4px 10 rgba(0,0,0,0.3)',
            padding: 2,
            margin: 2,
            borderRadius: '10px',
            display: 'grid',
            gridTemplateAreas: `
              'user timeStamp'
              'text text'
            `,
            gridTemplateColumns: '1fr auto',
            alignItems: 'start'
        },
        userText: {
            gridArea: 'user',
            padding: '2px',
            fontSite: '14px'
        }, 
        commentText: {
            gridArea: 'text',
            width: "60%",
            padding: '1px',
            fontSize: '14px',
            maxHeight: '200px',
            overFlowY: 'auto',
            '&::-webkit-scrollbar' : {
                display: 'none'
            },
            msOverflowStyle: 'none', /*IE and Egde */
            scrollbarWidth: 'none' /* Firefox */
        },
        timeStampText: {
            gridArea: 'timestamp',
            fontSize: '12px',
            textAlign: 'right'
        }
    }
    const [formattedText, setFormattedText] = useState(text);
    const setMaximumCharaterAtLine = (text) => {
        return text.replace(/(.{60})/g, '$1\n');
    }
    useEffect(() => {
        const updatedText = setMaximumCharaterAtLine(text);
        setFormattedText(updatedText);
    },[])
    return(
        <Box sx={styles.commentBox}>
            <Typography sx={styles.userText} variant="body1">
                 {user}
            </Typography>
            <Typography sx={styles.commentText} variant="body1">
                {formattedText}
            </Typography>
            <Typography sx={styles.timeStampText} variant="body1">
                {timeStamp}
            </Typography>
        </Box>
    )
}