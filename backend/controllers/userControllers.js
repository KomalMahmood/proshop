import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth User && get Token
// @route POST/api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
 const { email, password } = req.body;
//  res.send(email, password);

const user = await User.findOne({email});
if(user && (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),

    });
}
else{
    //  (HTTP) 401 Unauthorized client error status response code indicates that the client
    //  request has not been completed because it lacks valid authentication credentials for the requested resource.
    
    res.status(401); // not authorized
    throw new Error("Invalid email or password");
}

});

const getUserProfile = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        //  (HTTP) 401 Unauthorized client error status response code indicates that the client
        //  request has not been completed because it lacks valid authentication credentials for the requested resource.
        
        res.status(401); // not authorized
        throw new Error("Invalid email or password");
    }


});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

const registerUser = asyncHandler(async(req,res)=>{
    
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});

    if(userExists){
        // 400 bad request code
        res.status(400);
        throw new Error("User Already exists");

    }
    const user = await User.create({name, email, password});
    if(user){
        //  The HTTP 201 Created success status response code indicates that the request
   //   has succeeded and has led to the creation of a resource.
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),

        });
    }
    else{
         // 400 bad request code
         res.status(400);
         throw new Error("invalid user data");
    }

   

});

const getUser = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async(req,res) => {
    // req.params.id
    const user = User.findById(req.params.id);
    if(user){
        await user.remove();
        res.send({ message: "User removed" });
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
   if (user) {
    res.json(user)
    } else {
    res.status(404)
    throw new Error('User not found')
    }
   });
   

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
    
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});


export { authUser , getUserProfile, registerUser,updateUserProfile, getUser,deleteUser,getUserById,updateUser};
