const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {



        astroAccount: {
            type:String
        },
        userAccount:{
            type:String
        },
        status: {
            type: Boolean
        },
        token: {
            type: String
        },

        channelName: {
            type: String
        },
        expiredAt: {
            type: String
        },
        username:{
            type:String
        }


    },

    { timestamps: true }
);


module.exports = mongoose.model("sellerLiveStream", thisSchema);
