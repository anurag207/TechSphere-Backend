const {Schema,model}=require("mongoose");
const userSchema=new Schema({
    // name: String,
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
    
},{
    timestamps: true
});
// console.log(user);  
const User=model('users',userSchema);
module.exports={User};