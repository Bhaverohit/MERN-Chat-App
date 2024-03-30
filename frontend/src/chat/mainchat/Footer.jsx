import { Box, Button, TextField } from '@mui/material'
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import { useState } from 'react'

const Footer = ({ handleMessageSend }) => {

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setMsg(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (msg) {
            handleMessageSend(msg)
        }
        setMsg(msg)
    }

    return (
        <Box sx={{ p: 1, display: "flex", }}>
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
