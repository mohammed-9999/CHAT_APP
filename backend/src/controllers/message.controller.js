import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersForSidebar=async (req , res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers)

    }catch (error){
        console.error("Error in getUserForSidebar:",error.message);
        res.status(500).json({error:"Internal server error"});
        
    }

}

export const getMessages=async (req,res)=>{
    try {
        const{id:userToChatId} =req.params;
        const senderId=req.user._id;

        const messages=await Message.find({
            //finde all message whene i am a sender or whene i am a reciver and also whene the  user is a sender or whene he is a reciver

            $or:[
                {
                    senderId:myId,receiverId:userToChatId
                },
                {
                    senderId:userToChatId,receiverId:myId
                }
            ]
        });
        res.status(200).json(messages);

        
    } catch (error) {
        console.log("Error in getMessages controller:",error.message);
        res.status(500).json({error:"Iternal server error"}); 
    }
};