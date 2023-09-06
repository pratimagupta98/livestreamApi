const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const thisSchema = new Schema(
    {



        userid: {
            type: String

        },
        sellerid: {
            type: String
        },
        msg: {
            type: String
        },
        status: {
            type: String,
            default: "true"
        },
        type:{
            
        },  username:{
            type:String
        }

    },

    { timestamps: true }
);


module.exports = mongoose.model("liveChat", thisSchema);
