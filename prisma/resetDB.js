require("dotenv").config()
const { PrismaClient } = require("@prisma/client")
const { execSync } = require("child_process")
const seeding = require("./seed")
const prisma = new PrismaClient()

async function run() {
    try{
        await prisma.$executeRawUnsafe("DROP DATABASE IF EXISTS flexgo_group_project")
        await prisma.$executeRawUnsafe("CREATE DATABASE flexgo_group_project")
    
        execSync("pnpm prisma db push", { stdio: "inherit" });
    
        await seeding()
    } catch (err) {
        console.log(err)
    }

}

console.log("Reset DB...")
run()
