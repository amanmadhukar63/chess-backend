import User from "../models/user.model.js";

async function login(req, res){

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

  console.log('🟢 Login Successful');
  return res.status(200).json({
    msg: 'User logged in successfully',
    status: 'success',
    statusCode: 200,
    data: user
  });
};

export {
  login
};