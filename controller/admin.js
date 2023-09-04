const axios = require('axios');
const agora = require('agora-access-token');
const AsLive = require("../models/admin");
 const LiveChat = require("../models/liveChat");



exports.astroLiveStreaming = async (req, res) => {

    const {
        RtcTokenBuilder,
        RtcRole,
    } = agora;

    // const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount })
    //   console.log("astro", getchnlname)
    const response = await axios.get('https://keensuk.com/razorland/api/ApiCommonController/user_loginList');
    const apiData = response.data.data; // Access the "data" property
    console.log("apiData", apiData)
    const { astroAccount, userAccount, status } = req.body;
    console.log("req.body", req.body)
    // Find the user in apiData based on the astroAccount value
    const foundUser = apiData.find(user => user.id === astroAccount);
    // console.log("apiData",foundUser)
    const channelName = foundUser.channelName;



    console.log("channelName", channelName)
    const generateRtcToken = () => {
        const appId = '211ddf5d3ed341acaf8f7608e94b7c91';
        const appCertificate = 'f21d72bf4fc04011b1b116f47fb37596';
        const uid = 0;
        // const { astroAccount } = req.body;
        const expirationTimeInSeconds = 36000;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, astroAccount, privilegeExpiredTs);
        //  console.log("Token With Integer Number Uid: " + tokenA);
        //  console.log("tokenA", channelName);
        return tokenA;
    }

    const tokenA = await generateRtcToken();
    // console.log("tokenA", tokenA)
    // const { astroAccount, status, token } = req.body
    const newAsLive = new AsLive({
        astroAccount: astroAccount,
        status: status,
        token: tokenA,
        channelName: channelName

    })


    newAsLive
        .save()
        // .then((data) => resp.successr(res, data))
        // .catch((error) => resp.errorr(res, error));
        .then((data) => {
            res.status(200).json({
              status: true,
              data: data,
            });
          })
          .catch((error) => {
            res.status(400).json({
              status: false,
              msg: "error",
              error: error,
            });
          });
}
exports.UerLiveStreamingToken = async (req, res) => {

    const {
        RtcTokenBuilder,
        RtcRole,
    } = agora;

    //  const getchnlname = await Astrologer.findOne({ _id: req.body.astroAccount })
    const response = await axios.get('https://keensuk.com/razorland/api/ApiCommonController/user_loginList');
    const apiData = response.data.data; // Access the "data" property
    // console.log("apiData",apiData)
    //   console.log("astro", getchnlname)
    // const channelName = getchnlname.channelName
    const { astroAccount, userAccount, status } = req.body;
    console.log("req.body",req.body)
    // Find the user in apiData based on the astroAccount value
    const foundUser = apiData.find(user => user.id === astroAccount);
    const getUser = apiData.find(user => user.id === userAccount);

    // console.log("apiData",foundUser)
    const channelName = foundUser.channelName;
    console.log("channelName", channelName)

    const generateRtcToken = () => {
        const appId = '211ddf5d3ed341acaf8f7608e94b7c91';
        const appCertificate = 'f21d72bf4fc04011b1b116f47fb37596';
        const uid = 0;
        // const { astroAccount, userAccount } = req.body;
        // console.log("req.body",req.body)
        const expirationTimeInSeconds = 3600 * 24; // 24 hours expiration time
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, userAccount, privilegeExpiredTs);
        //  console.log("Token With Integer Number Uid: " + tokenA);
        //  console.log("tokenA", channelName);
        return tokenA;
    }

        const newAsLive = new AsLive({
            astroAccount: astroAccount,
            userAccount: userAccount,
            token: await generateRtcToken(),
            channelName: channelName,
            expiredAt: Math.floor(Date.now() / 1000) + (3600 * 24) // 24 hours from now
        })
        newAsLive
            .save()
            .then((data) => {
                res.status(200).json({
                  status: true,
                  data: data,
                });
              })
              .catch((error) => {
                res.status(400).json({
                  status: false,
                  msg: "error",
                  error: error,
                });
              });
            // .then((data) => resp.successr(res, data))
            // .catch((error) => resp.errorr(res, error));
    }


    exports.seller_liveChat = async (req, res) => {

        const { sellerid, userid, msg } = req.body;
    
        const newLiveChat = new LiveChat({
            sellerid: sellerid,
            userid: userid,
            msg: msg
    
        });
    
    
        newLiveChat
            .save()
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    }


    exports.liveChat_byseller = async (req, res) => {
        await LiveChat.find({ sellerid: req.params.id }) 
            .sort({ sortorder: 1 })
            .then((data) => resp.successr(res, data))
            .catch((error) => resp.errorr(res, error));
    };

    exports.dltliveChat = async (req, res) => {
        await LiveChat.deleteMany({ sellerid: req.params.id })
            .then((data) => resp.deleter(res, data))
            .catch((error) => resp.errorr(res, error));
    };