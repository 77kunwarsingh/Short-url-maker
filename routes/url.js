const express = require('express');
const {handleGenerateNewShortURL,handleGetAnalytics,handleGetAllUrl} = require("../controllers/url");
const router = express.Router();
router.get("/",handleGetAllUrl)
router.post('/', handleGenerateNewShortURL);
router.get('/analytics/:shortId', handleGetAnalytics)
module.exports = router;