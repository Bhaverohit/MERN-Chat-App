import { Route, Routes } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ChatComponent from "./chat/ChatComponent"


function App() {

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<ChatComponent />} />
    </Routes>

  )
}

export default App
