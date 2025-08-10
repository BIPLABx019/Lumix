import FriendRequest from "../models/FriendRequest.js";
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
        req.status(200).json(recommendedUsers);
    } catch (error) {

        console.error("Error in Get Recommendations controller", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
}

export async function getMyFriends(req,res) {
    try {
        const user = await User.findById(req.user.id)
        .select("friends")
        .populate("friends","userName profilePic bio");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in Get My Friends controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function sendFriendRequest(req,res) {
    try {
        const myId = req.user.id;
        const {id:recipientId} = req.params;

        if (myId===recipientId) { 
            return res.status(400).json({message:"You cannot send friend request to yourself"});
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({message:"Recipient not found"});
        }

        if (recipient.friends.includes(myId)) {
            return res.status(400).json({message:"You are already friends with this user"});
        }

        const existingRequest = FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId}]
        });

        if (existingRequest) {
            return res.status(400).json({message:"Friend request already sent"});
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json({
            success: true,
            message: "Friend request sent successfully",
            friendRequest
        });
            
    } catch (error) {
        console.error("Error in Send Friend Request controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if (friendRequest.recipient.toString() !== myId) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        if (friendRequest.status === "accepted") {
            return res.status(400).json({ message: "Friend request already accepted" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        const sender = await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet: { friends: friendRequest.recipient }
        }, { new: true });

        const recipient = await User.findByIdAndUpdate(friendRequest.recipient,
            { $addToSet: { friends: friendRequest.sender } },
            { new: true }
        );

        await sender.save();
        await recipient.save();

        res.status(200).json({
            success: true,
            message: "Friend request accepted successfully",
            friendRequest
        });

    } catch (error) {
        console.error("Error in Accept Friend Request controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getFriendRequests(req, res) {
    try {
        const myId = req.user.id;

        const friendRequests = await FriendRequest.find({
            recipient: myId,
            status: "pending"
        }).populate("sender", "userName fullName profilePic");

        const acceptedRequests = await FriendRequest.find({
            recipient: myId,
            status: "accepted"
        }).populate("sender", "userName profilePic");


        res.status(200).json({friendRequests, acceptedRequests});

    } catch (error) {
        console.error("Error in Get Friend Requests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getSentFriendRequests(req, res) {
    try {
        const myId = req.user.id;

        const sentRequests = await FriendRequest.find({
            sender: myId,
            status: "pending"
        }).populate("recipient", "userName fullName profilePic bio");

        res.status(200).json(sentRequests);

    } catch (error) {
        console.error("Error in Get Sent Friend Requests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}