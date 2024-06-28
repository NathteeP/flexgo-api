require("dotenv").config()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function run() {
    await prisma.$executeRawUnsafe("DROP DATABASE flexgo_group_project")
    await prisma.$executeRawUnsafe("CREATE DATABAE flexgo_group_project")
}

console.log("Reset DB...")
run()
