const userModel = require('../models/userModel');
const authorModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const authorCreate = async function (req, res) {
  try {
    let data=req.body
    const { fname, lname, title, email, phone, password } = data

    if (!fname) {
      return res.status(400).send({ msg: 'First name is required' });
    }

    if (!lname) {
      return res.status(400).send({ msg: 'Last name is required' });
    }

    if (!title) {
      return res.status(400).send({ msg: 'Title is required' });
    }

    if (!email) {
      return res.status(400).send({ msg: 'Email is required' });
    }

    const emailExists = await userModel.findOne({ email: email });

    if (emailExists) {
      return res.status(400).send({ msg: 'Email already exists' });
    }

    if (!phone) {
      return res.status(400).send({ msg: 'Phone is required' });
    }

    if (!password) {
      return res.status(400).send({ msg: 'Password is required' });
    }

   
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordPattern.test(password)) {
      return res.status(400).send({
        msg: 'Password must be at least 6 characters long and start with an uppercase letter',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    data.password = hashedPassword;

   
   const createNew=await userModel.create(data)

   return res.status(201).json({ msg: 'User registered successfully',data:data });

  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: 'Server error' });
  }
};


// for getting all the users

const getUser=async function(req,res){

    try{

        const userFind=await userModel.find({}, { password: 0 })
        return res.status(200).send({status:true,message:"user_details",data:userFind})


    }
    catch(error){
        console.log(error)
        res.status(500).send({ msg: 'Server error' });
    }
}








const updateUser = async function (req, res) {
    try {
      const { userId } = req.params; // Assuming you have a userId parameter in the URL
      const updateData = req.body; // The data to update
  
  
      const user = await userModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.fname = updateData.fname || user.fname;
      user.lname = updateData.lname || user.lname;
      user.title = updateData.title || user.title;
      user.email = updateData.email || user.email;
      user.phone = updateData.phone || user.phone;
  
  
      if (updateData.password) {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  
        if (!passwordPattern.test(updateData.password)) {
          return res.status(400).json({
            msg: 'Password must be at least 6 characters long and start with an uppercase letter',
          });
        }
  
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
        user.password = hashedPassword;
      }
  
      await user.save();
  
     
      return res.status(200).json({ msg: 'User updated successfully', data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };




  
// Delete a user by ID
const deleteUser = async function (req, res) {
    try {
      const { userId } = req.params; 
  
      const result = await userModel.deleteOne({ _id: userId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
 
      return res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };


  //user Login

  const loginUser = async function (req, res) {
    try {
      const { email, password } = req.body;
  
    
      const user = await userModel.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
   
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ msg: 'Invalid password' });
      }
  
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        'akshay', 
        { expiresIn: '1h' } 
      );
  
   
      return res.status(200).json({ msg: 'Login successful', token: token, data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
  

  module.exports={authorCreate,getUser,updateUser,deleteUser,loginUser}