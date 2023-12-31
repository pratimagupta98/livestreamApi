const express = require("express");
const router = express.Router();


const {
    astroLiveStreaming,
    seller_liveChat,
    liveChat_byseller,
    dltliveChat,
    UerLiveStreamingToken,
    disConnectLiveStream,
    liveStreamlist
   

} = require("../controller/sellerLivestream");



router.post("/user/astroLiveStreaming", astroLiveStreaming);
router.post("/user/UerLiveStreamingToken", UerLiveStreamingToken);

router.post("/user/seller_liveChat", seller_liveChat);
router.get("/user/liveChat_byseller/:id", liveChat_byseller);
router.delete("/user/dltliveChat/:id", dltliveChat);
router.get("/user/disConnectLiveStream/:astroAccount", disConnectLiveStream);

router.get("/user/liveStreamlist", liveStreamlist);

//localost
 



module.exports = router;

