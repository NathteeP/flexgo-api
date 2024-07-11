const { equal } = require("joi")
const prisma = require("../models/prisma")
const accomNearbyService = require("./accomNearbyService")

const accomService = {}

accomService.findUserIdByAccomId = (id) =>
    prisma.accom.findUnique({
        where: {
            id,
        },
        select: {
            userId: true,
        },
    })

accomService.findAccomByAccomId = (id) =>
    prisma.accom.findUnique({
        where: { id },
    })

accomService.createAccomTx = (accom, nearByPlaceId) =>
    prisma.$transaction(async (tx) => {
        try {
            const response = await accomService.createAccom({
                ...accom,
            })
            const accomNearby = nearByPlaceId.map((item) => {
                item.accomId = response.id
                return item
            })
            const result = await accomNearbyService.createMany(accomNearby)
            return { result, response }
        } catch (err) {
            next(err)
        }
    })

accomService.createAccom = (data) =>
    prisma.accom.create({
        data,
    })

accomService.findAccomByLatLng = (lat, lng) =>
    prisma.accom.findFirst({
        where: {
            lat: lat,
            lng: lng,
        },
    })

accomService.findAccomByAddress = (address) =>
    prisma.accom.findFirst({
        where: {
            address: {
                equals: address,
            },
        },
    })

accomService.findAllAccomByUserId = (userId) =>
    prisma.accom.findMany({
        where: {
            userId,
        },
    })

accomService.findStartedYearOfUser = (userId) =>
    prisma.accom.findFirst({
        where: {
            userId,
        },
        select: {
            createdAt: true,
        },
    })

accomService.editAccomDetailsByAccomId = (data, id) =>
    prisma.accom.update({
        where: {
            id,
        },
        data,
    })

accomService.changeAccomStatusToInactive = (id) =>
    prisma.accom.update({
        where: {
            id,
        },
        data: {
            status: "INACTIVE",
        },
    })

accomService.findAccomWithInBoundingBox = (latMax, latMin, lngMax, lngMin) =>
    prisma.accom.findMany({
        where: {
            lat: {
                gte: latMin,
                lte: latMax,
            },
            lng: {
                gte: lngMin,
                lte: lngMax,
            },
            status: "ACTIVE",
        },
    })

// เพิ่ม ดึง accom ทั้งหมด
// ฟังก์ชันช่วยสร้าง search filters
const createSearchFilters = (searchTerm) => {
    const filters = [
        { name: { contains: searchTerm } },
        { address: { contains: searchTerm } },
        { province: { contains: searchTerm } },
        { district: { contains: searchTerm } },
    ]

    if (!isNaN(parseInt(searchTerm))) {
        filters.push({ id: { equals: parseInt(searchTerm) } })
    }

    return filters
}

// จัดการเรื่อง Search
accomService.findAllAccoms = async (page, sortKey, sortOrder, searchTerm) => {
    const take = 10 // จำนวนรายการที่จะแสดงต่อหน้า
    const skip = (page - 1) * take
    const searchFilters = createSearchFilters(searchTerm)

    const order = sortOrder === "asc" ? "asc" : "desc"
    const validSortKeys = ["id", "name", "address", "province", "district", "createdAt"]
    const sortKeyToUse = validSortKeys.includes(sortKey) ? sortKey : "createdAt"

    const accoms = await prisma.accom.findMany({
        where: {
            OR: searchFilters,
        },
        orderBy: {
            [sortKeyToUse]: order,
        },
        skip,
        take,
    })

    const totalAccoms = await prisma.accom.count({
        where: {
            OR: searchFilters,
        },
    })
    const totalPages = Math.ceil(totalAccoms / take)

    return {
        accoms,
        totalPages,
        currentPage: page,
    }
}

// นับ accoms
accomService.countAccoms = (searchTerm) => {
    const searchFilters = createSearchFilters(searchTerm)

    return prisma.accom.count({
        where: {
            OR: searchFilters,
        },
    })
}

accomService.updateAccomStatus = (accomId, status) => {
    return prisma.accom.update({
        where: { id: accomId },
        data: { status },
    })
}

accomService.deleteAccomById = (accomId) =>
    prisma.accom.delete({
        where: { id: accomId },
    })

module.exports = accomService
