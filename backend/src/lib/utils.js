import jwt from "jsonwebtoken"

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
      expiresIn:"7d"//7 days
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*100,// 7days in milliseconds
        httpOnly:true,//prevent XSS attacks cross-site scripting attacks
        sameSite:"strict",//CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !=="development"
        
    });
    return token;
};
