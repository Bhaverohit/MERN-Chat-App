import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import CloseIcon from "@mui/icons-material/Close"
import { useState } from 'react'

const Footer = ({ handleMessageSend, replyMessage, setReplyMessage }) => {

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (msg) {
            handleMessageSend(msg)
        }
        setMsg("")
    }

    return (
        <Box sx={{ p: 1, display: "flex", position: "relative" }}>
            {replyMessage && (
                <Box sx={{ position: "absolute", left: 0, right: 0, bottom: "57px", background: "#ddd", p: 1, borderLeft: "4px solid", borderColor: "primary.light" }}>
                    <Typography>{replyMessage.sender.name}</Typography>
                    <Typography variant='caption'>{replyMessage.msg}</Typography>
                    <IconButton aria-label='close' sx={{ position: "absolute", right: 0, top: 0 }} onClick={() => setReplyMessage(null)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>

                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <InsertEmoticonIcon />
                </Button>

                <Button sx={{ minWidth: "auto", mr: 1 }}>
                    <InsertEmoticonIcon />
                </Button>

            </Box>

            <Box sx={{ display: "flex", flex: 1 }} component="form" onSubmit={handleSubmit}>

                <TextField placeholder='Type Message...' size='small' sx={{ "& .MuiInputBase-root": { borderRadius: 0, borderRight: 0 } }}
                    fullWidth
                    value={msg}
                    onChange={handleChange} />

                <Button type="submit" variant='outlined' sx={{ borderRadius: 0, minWidth: "auto", height: "100%", ml: 0.5 }}>
                    Send
                </Button>

            </Box>

        </Box>
    )
}

export default Footer
