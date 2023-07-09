const express=require('express');
const router=express.Router();
const userController=require('../../controllers/user_controller')
const passport=require('passport')

router.post('/create',userController.create)
router.post('/create-session',(req,res,next)=>{
    passport.authenticate('local',async (err,user,info)=>{
        if(err){
            return res.status(500).json({err})
        }
        if(!user){
            return res.status(401).json({msg:"no user found"})
        }
        req.logIn(user,(err)=>{
            if(err) return res.status(500).json({err})
            next();
        });
        
    })(req, res, next);
}, userController.createSession);
router.get('/getuser',passport.checkAuthentication, userController.getuser);
router.post('/checkuser',userController.checkUser)
router.post('/sendOtp', userController.sendOTP);
router.get('/sign-out', userController.destroySession);


module.exports=router;