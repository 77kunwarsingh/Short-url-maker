const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics,handleGetAllUrl , handleDeleteUrl} = require("../controllers/url");
const router = express.Router();
router.get("/",handleGetAllUrl)
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics)
router.delete("/:redirectUrl", handleDeleteUrl)
module.exports = router;