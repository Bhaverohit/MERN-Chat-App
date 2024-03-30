import ReplyIcon from '@mui/icons-material/Reply'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Avatar, Box, Chip, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'

const ChatArea = ({ allMsg, user, handleDelete, setReplyMessage }) => {



  return (
    <Box sx={{ overflowY: "auto", flex: "1 0 0", background: "#f9f9f9" }}>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{
          py: 2,
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "#f9f9f9",
        }}
      >
        <Chip label="Today" />
      </Stack>
      <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
        {allMsg.map((item) => (
          <ListItem
            sx={
              item.sender._id === user._id
                ? { flexDirection: "row-reverse", mb: 2 }
                : { mb: 2 }
            }
          >
            {console.log(item.sender, "ITem")}
            <Box
              sx={
                item.sender._id === user._id
                  ? {
                    display: "flex",
                    width: "80%",
                    flexDirection: "row-reverse",
                  }
                  : { display: "flex", width: "80%" }
              }
            >
              <ListItemAvatar
                sx={
                  item.sender._id === user._id && {
                    display: "flex",
                    flexDirection: "row-reverse",
                  }
                }
              >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <Paper
                sx={
                  item.sender._id === user._id
                    ? { width: "100%", p: 1.5, bgcolor: "primary.light" }
                    : { width: "100%", p: 1.5 }
                }
              >
                {item.replyMessage &&
                  <Paper
                    sx={
                      item.sender._id !== user._id ? { mb: 1, p: 1.5, bgcolor: "primary.light" } : { p: 1.5, mb: 1 }
                    }>
                    <ListItemText
                      sx={
                        item.sender._id !== user._id
                          ? { m: 0, color: "primary.contrastText" }
                          : { m: 0 }
                      }
                      primary={item.replyMessage.sender.name}
                      secondary={
                        <Typography variant="caption">{item.replyMessage.msg}</Typography>
                      }
                    />
                  </Paper>
                }

                <ListItemText
                  sx={
                    item.sender._id === user._id
                      ? { m: 0, color: "primary.contrastText" }
                      : { m: 0 }
                  }
                  primary={item.sender.name}
                  secondary={
                    <Typography variant="caption">{item.msg}</Typography>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={
                      item.sender._id === user._id && {
                        color: "primary.contrastText",
                      }
                    }
                  >
                    12:20 PM
                  </Typography>
                  <Box>
                    <IconButton onClick={() => setReplyMessage(item)} size="small">
                      <ReplyIcon fontSize="small" />
                    </IconButton>

                    {item.sender._id === user._id &&
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    }
                  </Box>
                </Box>
              </Paper>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box >
  );
};
export default ChatArea;
