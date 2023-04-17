import { hashPassword, verifyPassword } from "@/helpers/auth"
import { connectToDatabase } from "@/helpers/db"
import { NextApiHandler } from "next"
import {getSession} from "next-auth/client"

const handler: NextApiHandler = async(req, res) => {
    if(req.method !== "PATCH") return

    const session = await getSession({req})

    if(!session) {
        res.status(401).json({message: "Not authenticated!"})
        return
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = await client.db().collection("users");

    const user = await usersCollection.findOne({email: userEmail})

    if(!user) {
        res.status(404).json({message: "User not found."})
        client.close();
        return
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if(!passwordsAreEqual){
        res.status(403).json({message: "Old password is not correct"})
        client.close();
        return
    }

    await usersCollection.updateOne({email: userEmail}, {$set: {password: await hashPassword(newPassword)}})
    res.status(200).json({message: "Password updated!"})
    client.close();
}

export default handler