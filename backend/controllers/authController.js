const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateInputs =  (name , pass) =>{
    if(!name || !pass){
        return "All fields are required";
      }
      if(name.trim().length < 5)
        return "Name too small";
      if(pass.trim().length < 5)
        return "Password too small";
      return 'good';
}

const register = async (req, res) => {
    console.log("Posting in Register is working");
    const { name, password } = req.body;
    const check = validateInputs(name , password);
    if(check !== "good"){
         res.status(400).send({error: check});
    }
    else{
        const userCheck = await User.findOne({ name });
        if(userCheck){
            res.status(400).send({error: "Name already taken"});
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, password: hashedPassword });
            await user.save();
            res.send({ message: 'User registered successfully' });
        }
    }
};

const login = async (req, res) => {
    console.log("Posting in login is working");
    const { name, password } = req.body;
    const check = validateInputs(name , password);
    if(check !== "good"){
        return res.status(400).send({error: check});
    }
    else{

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).send({error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.send({ message: 'Logged in successfully', token });
    }
};

module.exports = { register, login };
