const express = require("express");
const urlRoute = require("./routes/url");
const path = require('path');
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url");
const { connectToMongoDb } = require("./connetion");
const app = express();
const port = 8002;

connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB connect successfully")
);
app.set("view engine" , "ejs");
app.set('views', path.resolve('./views'))
app.use("/" , staticRoute);
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// app.get("/test", async(req,res)=>{
//   const allUrls = await URL.find({});
//   return res.render('home' , {
//     urls : allUrls
//   });
// })

app.use("/url", urlRoute);
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    // Handle the case where the entry is not found
    return res.status(404).send('URL not found');
}
  res.redirect(entry.redirectURL);
});
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
