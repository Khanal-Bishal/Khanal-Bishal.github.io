import User from "../models/user"
import bcrypt from 'bcrypt'
const dummyUsers = [
    {
        name: "newUser",
        email: "newUser@b.com",
        password: "password"
    },
    {
        name: "suraj",
        email: "suraj@s.com",
        password: "password"
    },
    {
        name: "ram",
        email: "ram@r.com",
        password: "password"
    },
    {
        name: "hari",
        email: "hari@s.com",
        password: "password"
    },
    {
        name: "shyam",
        email: "shyam@r.com",
        password: "password"
    },

]

const saltRounds = 10

export async function seedUsers() {
    for (const dummyUser of dummyUsers) {
        const hashedPassword = await bcrypt.hash(dummyUser.password, saltRounds)
        await User.create({ ...dummyUser, password: hashedPassword })
    }
}
