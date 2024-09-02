const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url)return res.status(400).json({error: "url is required"})
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render('home' , {id: shortID,})
    // return res.json({id: shortID});
}
async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitHistory.length,
         analytics: result.visitHistory})
}
async function handleGetAllUrl(req,res){
    const allUrl = await URL.find({});
    return res.json(allUrl);
}
async function handleDeleteUrl(req, res) {
    try {
        const url = req.params.url;
        const result1 = await URL.findOneAndDelete( {url} );

        if (!result1) {
            return res.status(404).json({ message: "URL not found in the database." });
        }

        return res.json({ message: `Successfully deleted from the database: ${result1}` });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while deleting the URL.", error: error.message });
    }
}
module.exports = {
    handleGenerateNewShortURL,handleGetAnalytics,handleGetAllUrl,handleDeleteUrl
} 
