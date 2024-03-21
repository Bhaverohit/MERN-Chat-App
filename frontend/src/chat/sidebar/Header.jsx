import { Avatar, Card, CardHeader, IconButton, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Header = ({ user }) => {
    return (
        <Card sx={{ bgcolor: "primary.dark", borderRadius: 0, color: "primary.contrastText" }}>

            <CardHeader avatar={<Avatar>R</Avatar>}
                action={
                    <IconButton aria-label="settings"
                        sx={{ color: "primary.contrastText" }}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={user.name}
                subheader={
                    <Typography variant="caption">{user.email}</Typography>
                }
            >

            </CardHeader>

        </Card >
    )
}

export default Header
