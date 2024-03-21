const express = require('express');
const { getMessages, deleteMessage, deleteAllMessages } = require('../controllers/messageController');
const router = express.Router();

router.get("/:id", getMessages);
router.delete("/:id", deleteMessage);

module.exports = router;