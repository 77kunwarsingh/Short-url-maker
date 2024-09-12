require("dotenv").config();
const express = require("express");
const { connectToMongoDb } = require("./connetion");
const path = require('path');
const URL = require("./models/url");
const cookieParser = require("cookie-parser")

const staticRoute = require("./routes/staticRouter")
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user")
const { checkForAuthentication,restrictTo } = require("./middlewares/auth")
const app = express();
const port = process.env.PORT || 8002;


// const { connectToMongoDb } = require("./connetion");

connectToMongoDb(process.env.MONGO_URL).then(() =>
  console.log("MongoDB connect successfully")
);
app.set("view engine" , "ejs");
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthentication);


// app.get("/test", async(req,res)=>{
//   const allUrls = await URL.find({});
//   return res.render('home' , {
//     urls : allUrls
//   });
// })

app.use("/url", restrictTo(["NORMAL" , "ADMIN"]),urlRoute);
app.use('/user' , userRoute)
app.use("/" ,staticRoute); 
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
