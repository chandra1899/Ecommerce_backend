const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


// hash password
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
})

const User=mongoose.model('User',userSchema);

module.exports=User;