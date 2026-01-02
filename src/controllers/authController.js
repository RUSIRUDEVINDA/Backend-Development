import { prisma } from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    const{name,email,password} = req.body;
    //check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if(userExists){
        return res.status(400) // 400 Bad Request
        .json({error:"user already exists with this email"});
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //store user in db(create user)
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
        }
    })
    //generate jwt token
    const token = generateToken(user.id,res);

    res.status(201)
    .json({status:"register successfull",
        data:{
            user:{
                id:user.id,
                name:name,
                email:email,
            },
            token,
        }
    })
}

// Login controller
const login = async (req,res)=>{
    const{email,password} = req.body
     //check if email already exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    //if email not exists
    if(!user){
        return res.status(400)
        .json({error:"user not found with this email"});
    }

    //verify password
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401)
        .json({error:"invalid email or password"});
    }

    //generate jwt token
    const token = generateToken(user.id,res);
     res.status(201)
    .json({status:"login successfully",
        data:{
            user:{
                id:user.id,
                email:email,
            },
            token,
        }
    })
}

// Logout controller
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
}

export { register,login,logout };