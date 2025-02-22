import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body //fetch data send by user and save it in the variable (fullName , email and password)
    try {

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        //hash password using bcyryptjs
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 charachters"});
        }

        const user= await User.findOne({email}) //return true or false
        if(user) return res.status(400).json({message:"Email already exists"});

        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser =new User({
            fullName:fullName,// for short i can creat just fullName, because key and valus have same name
            email, // like here i dont creat=> email:email, 
            password:hashedPassword,
        })
        if(newUser){
            //genert jwt (json web token) here 
            //i creat a utils.js fils to define this function 
            generateToken(newUser._id,res);
            await newUser.save();//save the new user in database
            
            res.status(201).json({
                _id:newUser.id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });


        }else{
            res.status(400).json({message:"Invalid user data"});
        }




    }catch (error){
        console.log("Error in signup contoller",error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
};

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user.id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        })

    }catch (error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal server Error"});

    }
};


export const logout=(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"});
   }catch (error){
    console.log("Error is logout controller",error.messages);
    res.status(500).json({message:"Internal Server Error"});
   }
};

export const updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body;
        const userId=req.user._id;//whene function protectRouter start it add a user a request 

        if(!profilePic){
            return res.status(400).json({messsage:"Profile pic is required"});

        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic);
        const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json(updatedUser);

    }catch(error){
       console.log("error in update profile:",error);
       res.status(500).json({message:"Internal error server"});
    }

}

export const checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user);

    }catch (error){
        console.log("Error in checkAuth constroller",error.message);
        res.status(500).json({message:"Internal Server Error"});

    }
}