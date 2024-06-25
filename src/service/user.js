const prisma = require("../config/prisma")

const userService = {}

userService.createUser = data => prisma.user.create({data})
userService.findAlreadyExistedUser = async (username,email,phoneNumber) => {
    const usernameExists = await prisma.user.findUnique({
        where: { username }
    })
    const emailExists = await prisma.user.findUnique({
        where: { email }
    })
    const phoneNumberExists = await prisma.user.findUnique({
        where: { phoneNumber }
    })
    return {usernameExists, emailExists, phoneNumberExists}
}

userService.findUserByUsername = username =>
    prisma.user.findUnique({where:{username}})
userService.findUserById = userId => 
    prisma.user.findUnique({where: {id: userId}})
userService.updateUser = (userId,data) => 
    prisma.user.update({where:{id:userId}, data})
userService.deleteUser = userId =>
    prisma.user.update({where:{id:userId}, data:{isActive:false}})

module.exports = userService