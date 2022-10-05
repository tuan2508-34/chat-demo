const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middleware/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(200).json({
      name:"",
    });
  }
  else{
    res.status(200).json({
      name,
      email,
      password
    });
  }
});


const createUser = asyncHandler(async (req, res) => {
  const { name, email, pass, pic } = req.body;

  const user = await User.create({
    name:name,
    email:email,
    password:pass,
    pic:pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({
      name:"",
    });
  }
});

const check = asyncHandler(async (req, res) => {
  const {iid} = req.body;

  const user = await User.find({_id:iid });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(200).json({
      name:"",
    });
  }
});

module.exports = { allUsers, registerUser, authUser,createUser };
