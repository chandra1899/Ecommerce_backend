const User=require('../models/user')
const Otp=require('../models/OTP');
const nodeMailer=require('../mailers/otp');
const signUpMail=require('../mailers/signUp');

module.exports.create=async (req,res)=>{
    try {
        console.log('in create user');
        let OTP=await Otp.findOne({email:req.body.email});
        if(OTP.otp!==req.body.otp){
            return res.status(401).json({msg:'otp is not valid'});
        }
        console.log('above create user');
        let user=await User.create(req.body);
        console.log('below create user');
        // signUpMail(user.email);
        return res.status(200).json({user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

module.exports.createSession=(req,res)=>{
    console.log('sucesfully logged in');
    return res.status(200).json({msg:"sucessfully created session"})
}

module.exports.checkUser=async (req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        let exist=user?true:false;
        return res.status(200).json({exist});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

const generateOtp=()=>{
    let otp='';
    for(let i=0;i<4;i++){
        otp+=Math.floor(Math.random()*10);
    }
    return otp
}

module.exports.sendOTP=async (req,res)=>{
    try {
        let email=req.body.email;
        let otp=generateOtp();
       let OTP=await Otp.findOne({email:email});
       if(OTP){
        if(Date.now()-OTP.setOn>600000){
            OTP.setOn=Date.now();
            OTP.otp=otp;
            await OTP.save();
            nodeMailer.sendOtp(email,otp);
        }else{
            nodeMailer.sendOtp(email,OTP.otp);
        }
       }else{
        let newOtp=await Otp.create({
            email:email,
            otp:otp,
            setOn:Date.now()
        })
        nodeMailer.sendOtp(newOtp.email,newOtp.otp);

       }
       return res.status(200).json({email});
        
    } catch (error) {
        console.log(error);
       return res.status(500).json({error});
        
    }
}

module.exports.getuser=async (req,res)=>{
    try {
        if(req.user){
            let can=req.user;
            return await res.status(200).json({can})
        }
        else {
            return res.status(404).json({msg:"no user"})
        }
    } catch (err) {
        return res.status(404).json({msg:"error in getting user",error:err})
    }  
}

module.exports.destroySession=(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
        }
        return res.status(200).json({msg:"successfully signed out"})
    });
}