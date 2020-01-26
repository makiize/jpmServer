/* const express = require("express");
const router = express.Router();
const unirest = require("unirest");

router.get("/", ( req , res ) => {
  var apiCall = unirest("GET",
    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
  );
  apiCall.headers({
    "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    "x-rapidapi-key": "srclZqaa9imshAk9Xzz55u27oltLp1SqdiFjsnmva9PTpf2j3f"
  });
  apiCall.end(function(result) {
    if (res.error) throw new Error(result.error);
    console.log(result.body);
    res.send(result.body);
  });
});

module.exports = router;
 */
