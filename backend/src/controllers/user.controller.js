import User from "../models/User.js";

export async function getRecommendedUsers(req,res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id:{$ne: currentUserId}},
                {$id: {$nin: currentUser.friends}}
            ]
        })
        req.status(200).json({success: true,recommendedUsers});
    } catch (error) {
        console.error("Error in Get Recommendations controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getMyFriends(req,res) {
    
}