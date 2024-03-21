import { Paper } from '@mui/material'
import SideBar from './sidebar/SideBar'
import ChatBox from './mainchat/ChatBox'
import UserProfile from './profile/UserProfile'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
const PATH = "http://localhost:8000";


const ChatComponent = () => {

    const socketRef = useRef();
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [allMsg, setAllMsg] = useState([]);
    const [roomData, setRoomData] = useState({ room: null, receiver: null });
    const navigate = useNavigate();
    const { state } = useLocation();


    useEffect(() => {
        if (!state) navigate("/")

        const socket = io.connect(PATH);
        socketRef.current = socket;
        socket.on("connect", () => setIsSocketConnected(true));
        socket.off("disconnect", () => setIsSocketConnected(false));
        // setIsSocketConnected(true); // Update socket connection status

    }, []);

    useEffect(() => {
        if (isSocketConnected) {
            socketRef.current.emit("ADD_USER", state)
            socketRef.current.on("USER_ADDED", (data) => {
                setOnlineUsers(data);
            });

            socketRef.current.on("RECEIVE_MSG", (data) => {
                console.log(data, "From another user");
                setAllMsg((prevState) => [...prevState, data])
            });

            return () => socketRef.current.disconnect();
        }
    }, [isSocketConnected]);

    const handleMessageSend = (msg) => {
        console.log(allMsg, "ALL MESGGSE CHAT COMPO");
        // console.log(socketRef.current, "SOCKET");
        if (socketRef.current.connected) {
            const data = {
                msg,
                receiver: roomData.receiver,
                sender: state
            }
            socketRef.current.emit("SEND_MSG", data);
            setAllMsg((prevState) => [...prevState, data])
        }
    }



    if (!state) return null;

    return (
        <Paper square elevation={0} sx={{ height: "100vh", display: "flex" }}>
            <SideBar user={state} onlineUsers={onlineUsers} setRoomData={setRoomData} roomData={roomData} />
            <ChatBox roomData={roomData} user={state} handleMessageSend={handleMessageSend} allMsg={allMsg} />
            <UserProfile user={state} />
        </Paper>

    )
}

export default ChatComponent