const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()

// ## Seeding data by Type node prisma/seed.js in console
// ### Check function to seed before type
// #### Have fun with seeding data!

const bedTypeSeeding = [
    {
        name: "Single bed",
    },
    {
        name: "Semi double-bed",
    },
    {
        name: "Double bed",
    },
    {
        name: "Queen bed",
    },
    {
        name: "King bed",
    },
    {
        name: "Super king bed",
    },
    {
        name: "Sofa bed",
    },
]

// async function seeding() {
//     await prisma.user.create({
//         data: {
//             username: "admin",
//             password: "admin1234",
//             role: Role.ADMIN,
//             firstName: "admin",
//             lastName: "cc16",
//         },
//     })
// }

async function bedSeeding() {
    const response = await prisma.bedType.createMany({
        data: bedTypeSeeding,
    })
    console.log(response)
}

// ----- Uncomment This line to seed bed type -----
// bedSeeding()
// ---------------------------------------------

// seeding()
