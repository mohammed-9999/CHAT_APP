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

export const login=(req,res)=>{
    res.send("login route");
};

export const logout=(req,res)=>{
    res.send("logout route");
};