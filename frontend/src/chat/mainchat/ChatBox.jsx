import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'
import ChatArea from './ChatArea'
import Footer from './Footer'

const ChatBox = ({ roomData, handleMessageSend, allMsg, user, handleDelete, setReplyMessage, replyMessage }) => {
    return (
        <Box sx={{ width: "50vw", display: "flex", flexDirection: "column", height: "100%" }}>

            {
                roomData.room ?
                    (
                        <>
                            <Header roomData={roomData} />
                            <ChatArea allMsg={allMsg} user={user} handleDelete={handleDelete} setReplyMessage={setReplyMessage} />
                            <Footer handleMessageSend={handleMessageSend} replyMessage={replyMessage} setReplyMessage={setReplyMessage} />
                        </>
                    )
                    :
                    <>
                        Please select a chat room
                    </>
            }

        </Box >

    )
}

export default ChatBox