import { hashPassword } from "@/helpers/auth";
import { connectToDatabase } from "@/helpers/db"
import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";

const handler:NextApiHandler = async (req, res) =>{
    if(req.method !== "POST") return
    const {email, password} = req.body

    if(!email || !email.includes("@") || !password || password.trim().length < 7){
        res.status(422).json({message: "Invalid input - password should also be at least 7 characters long!"})
        return
    }

    let client: MongoClient;
    try{
        client = await connectToDatabase();
    }catch(err){
        res.status(500).json({message: "Connection to database failed!"})
        
        return
    }
    const db = client.db();

    const existingUser = await db.collection("users").findOne({email})

    if(existingUser){
        res.status(422).json({message: "User already exists!"})
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(password)
    try{
        await db.collection("users").insertOne({
            email, password: hashedPassword
        });
    
        res.status(201).json({message: "Created user!"})

    }catch(err){
        res.status(500).json({message: "User creation failed!"})
        client.close();

        return
    }
    client.close();


}

export default handler