const userService = {}

userService.createUser = data => prisma.user.create({data})
userService.findAlreadyExistedUser = (username,email,phoneNumber) => 
    prisma.user.findFirst({
        where:{
            OR:[
                {username},{email},{phoneNumber}
            ]
        }
    })

userService.findUserById = userId => 
    prisma.user.findUnique({
        where: {
            id: userId
        }
    })

module.exports = userService