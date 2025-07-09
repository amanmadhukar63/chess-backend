import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

async function login(req, res){

  try {

    const {email, password} = req.body;
  
    if(!email || !password){
      console.log('🛑 Email or Password not available',{email,password});
      return res.status(400).json({
        msg: 'Please fill all the fields',
        status: 'warn',
        statusCode: 400
      });
    }
  
    const user = await User.findOne({email});
    if(!user){
      console.log('🛑 User not found with this email',{email});
      return res.status(400).json({
        msg: 'User with this email id does not exists, Try to signup',
        status: 'warn',
        statusCode: 400
      });
    }
  
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
      console.log('🛑 Incorrect Password',{password});
      return res.status(400).json({
        msg: 'Incorrect password',
        status: 'warn',
        statusCode: 400
      });
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
  
    // Set cookie in response
    res.cookie('token',token);
  
    console.log('🟢 Login Successful');
    return res.status(200).json({
      msg: 'User logged in successfully',
      status: 'success',
      statusCode: 200,
      data: user
    });

  } catch (error) {

    console.log('🛑 Something went wrong',{error});
    return res.status(400).json({
      msg: 'Something Went Wrong',
      status: 'error',
      statusCode: 400,
      error
    });
  }
};

async function logout(req, res){
  try {
    res.clearCookie('token');
  
    console.log('🟢 Logged out Successful');
    return res.status(200).json({
      msg: 'User logged out successfully',
      status: 'success',
      statusCode: 200
    });

  } catch (error) {
    console.log('🛑 Something went wrong',{error});
    return res.status(400).json({
      msg: 'Something Went Wrong',
      status: 'error',
      statusCode: 400,
      error
    });
  }
}

async function signup(req, res){

  try {
    const {email, password, username} = req.body;
  
    if(!email || !password || !username){
      console.log('🛑 Email or Password or Username not available',{email,password,username});
      return res.status(400).json({
        msg: 'Please fill all the fields',
        status: 'warn',
        statusCode: 400
      });
    }
  
    const userExist = await User.exists({email});
    if(userExist){
      console.log('🛑 User already exist with this email',{email});
      return res.status(400).json({
        msg: 'User already exists with this email id, Try to login',
        status: 'warn',
        statusCode: 400
      });
    }
  
    // Create new user
    const user = await User.create({
      email,
      password,
      username
    });
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
  
    // Set cookie in response
    res.cookie('token',token);
  
    console.log('🟢 Signup Successful');
    return res.status(200).json({
      msg: 'User signed up successfully',
      status: 'success',
      statusCode: 200,
      data: user
    });
    
  } catch (error) {
    console.log('🛑 Something went wrong',{error});
    return res.status(400).json({
      msg: 'Something Went Wrong',
      status: 'error',
      statusCode: 400,
      error
    });
  }
};

export {
  login,
  logout,
  signup
};