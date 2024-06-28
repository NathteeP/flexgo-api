const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()
const { hashed } = require("../src/utils/bcrypt")

// ## Seeding data by Type node prisma/seed.js in console
// ### Check function to seed before type
// #### Have fun with seeding data!

const userSeeding = [
    {
        username: "john123",
        email: "John@mail.com",
        fullName: "John Doe",
        phoneNumber: "0112345671",
    },
    {
        username: "john124",
        email: "john12@mail.com",
        fullName: "John Dim",
        phoneNumber: "0123456712",
    },
    {
        username: "jack123",
        email: "Jack@mail.com",
        fullName: "Jack Die",
        phoneNumber: "0112345673",
    },
    {
        username: "abby1243",
        email: "abbie@mail.com",
        fullName: "Abby Brown",
        phoneNumber: "0112345121",
    },
    {
        username: "bob12321",
        email: "Bob@mail.com",
        fullName: "Bobby Carter",
        phoneNumber: "0112341271",
    },
    {
        username: "cathy12321",
        email: "cathy@mail.com",
        fullName: "Catherine Carline",
        phoneNumber: "0112121271",
    },
    {
        username: "dim12321",
        email: "Dim@mail.com",
        fullName: "Dimon Long",
        phoneNumber: "0258341271",
    },
]

const accomSeeding = [
    {
        userId: 1,
        name: "Best Western Plus Wanda Grand Hotel",
        lat: "13.9037776",
        lng: "100.5281616",
        address: "111 M.4 Chaeng Watthana Rd Tambon Khlong Klua",
        province: "Nonthaburi",
        district: "Pak Kret",
        type: "HOTEL",
        status: "ACTIVE",
        description:
            "In addition to the standard of SHA, all guests get free Wi-Fi in all rooms and free parking if arriving by car. Conveniently situated in the Don Mueang International Airport part of Bangkok, this property puts you close to attractions and interesting dining options. Don't leave before paying a visit to the famous Wat Phra Chetuphon. Rated with 4 stars, this high-quality property provides guests with access to restaurant and fitness center on-site.",
    },
]

const accomPhotoSeeding = [
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/avzjktrcma2giv0ysugb.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/mb1fsux7jf1dg8jshnur.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/i5i1nf0er26gdkxjmvsl.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/owj36wnvyjo9dyxag9lz.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/mdzemsefo6vthfgtqcr5.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/lan2i0i417d07vbyodk7.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/lvm7kqpcw9qgqsw99naz.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/akqcskbuwlvmt16owy2b.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/a56cylgegpbx2vl2udib.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/zsd0mqpwvgzfr070fwpi.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/lh72g0s5waw5nh9rojkq.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/fdkzu9eu89qjzpdoj96g.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/pvuskw8kt1onrowe3t7m.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/ldjtbfymo7yhawhkuqin.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/e8kd2xmrmtlfmytiuyek.webp",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/suvx7w6kf9tjp4loaerp.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/cgj7lylbbgndwhtxp5fg.webp",
        accomId: 1,
    },
]

const houseRulesSeeding = [
    {
        checkIn: "From 15.00 to 00.00",
        checkOut: "Available 24 hours",
        petsRule: "Pets are not allowed",
        ageRule: "There is no age requirement for check-in",
        cancelPolicy: "STRICT",
        accomId: 1,
    },
]

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

const roomSeeding = [
    {
        name: "A201",
        roomType: "Deluxe",
        bedRoom: 1,
        bathRoom: 1,
        size: 20,
        capacity: 3,
        accomId: 1,
    },
]

const roomBedSeeding = [
    {
        roomId: 1,
        bedTypeId: 1,
        amount: 1,
    },
    {
        roomId: 1,
        bedTypeId: 3,
        amount: 1,
    },
]

const reservationSeeding = [
    {
        checkInDate: new Date("Fri Jun 22 2024 14:54:43 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 24 2024 14:54:43 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 20 2024 14:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Doe",
        customerEmail: "John@mail.com",
        customerPhone: "0112345671",
        customerCountry: "Malaysia",
    },
]

const reviewsSeeding = [
    {
        reservationId: 1,
        comment: "Hello World",
        ratingType1: 5,
        ratingType2: 4,
        ratingType3: 5,
        ratingType4: 4,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
]

const feeSeeding = [
    {
        hostFee: 0.2,
        clientFee: 0.1,
    },
]

const transactionSeeding = [
    {
        feeId: 1,
        status: "SUCCESS",
    },
]

const amenityTypeSeeding = [
    {
        name: "Free Wi-Fi",
        icon: "CiWifiOn",
    },
    {
        name: "Complimentary breakfast",
        icon: "CiWifiOn",
    },
    {
        name: "Room service",
        icon: "CiWifiOn",
    },
    {
        name: "24-hour front desk",
        icon: "CiWifiOn",
    },
    {
        name: "Fitness center",
        icon: "CiWifiOn",
    },
    {
        name: "Swimming pool",
        icon: "CiWifiOn",
    },
    {
        name: "Spa and wellness center",
        icon: "CiWifiOn",
    },
    {
        name: "Business center",
        icon: "CiWifiOn",
    },
    {
        name: "Conference/meeting rooms",
        icon: "CiWifiOn",
    },
    {
        name: "On-site restaurant",
        icon: "CiWifiOn",
    },
    {
        name: "Bar/lounge",
        icon: "CiWifiOn",
    },
    {
        name: "Concierge service",
        icon: "CiWifiOn",
    },
    {
        name: "Laundry service",
        icon: "CiWifiOn",
    },
    {
        name: "Dry cleaning service",
        icon: "CiWifiOn",
    },
    {
        name: "Shuttle service",
        icon: "CiWifiOn",
    },
    {
        name: "Airport transfer",
        icon: "CiWifiOn",
    },
    {
        name: "Valet parking",
        icon: "CiWifiOn",
    },
    {
        name: "Self-parking",
        icon: "CiWifiOn",
    },
    {
        name: "Pet-friendly rooms",
        icon: "CiWifiOn",
    },
    {
        name: "Non-smoking rooms",
        icon: "CiWifiOn",
    },
    {
        name: "Air conditioning",
        icon: "CiWifiOn",
    },
    {
        name: "Heating",
        icon: "CiWifiOn",
    },
    {
        name: "Mini-bar",
        icon: "CiWifiOn",
    },
    {
        name: "In-room safe",
        icon: "CiWifiOn",
    },
    {
        name: "Flat-screen TV",
        icon: "CiWifiOn",
    },
    {
        name: "Cable/satellite TV",
        icon: "CiWifiOn",
    },
    {
        name: "Coffee/tea maker",
        icon: "CiWifiOn",
    },
    {
        name: "Iron and ironing board",
        icon: "CiWifiOn",
    },
    {
        name: "Hairdryer",
        icon: "CiWifiOn",
    },
    {
        name: "Complimentary toiletries",
        icon: "CiWifiOn",
    },
    {
        name: "Bathrobe and slippers",
        icon: "CiWifiOn",
    },
    {
        name: "In-room dining",
        icon: "CiWifiOn",
    },
    {
        name: "Daily housekeeping",
        icon: "CiWifiOn",
    },
    {
        name: "Turndown service",
        icon: "CiWifiOn",
    },
    {
        name: "Express check-in/check-out",
        icon: "CiWifiOn",
    },
    {
        name: "Luggage storage",
        icon: "CiWifiOn",
    },
    {
        name: "Babysitting/child services",
        icon: "CiWifiOn",
    },
    {
        name: "Children's play area",
        icon: "CiWifiOn",
    },
    {
        name: "Family rooms",
        icon: "CiWifiOn",
    },
    {
        name: "Accessible rooms",
        icon: "CiWifiOn",
    },
    {
        name: "Electric vehicle charging station",
        icon: "CiWifiOn",
    },
    {
        name: "Bicycle rental",
        icon: "CiWifiOn",
    },
    {
        name: "Car rental service",
        icon: "CiWifiOn",
    },
    {
        name: "Gift shop",
        icon: "CiWifiOn",
    },
    {
        name: "Beauty salon",
        icon: "CiWifiOn",
    },
    {
        name: "Library",
        icon: "CiWifiOn",
    },
    {
        name: "Tennis court",
        icon: "CiWifiOn",
    },
    {
        name: "Golf course",
        icon: "CiWifiOn",
    },
    {
        name: "Garden",
        icon: "CiWifiOn",
    },
    {
        name: "Terrace",
        icon: "CiWifiOn",
    },
    {
        name: "BBQ facilities",
        icon: "CiWifiOn",
    },
    {
        name: "Picnic area",
        icon: "CiWifiOn",
    },
    {
        name: "Smoking area",
        icon: "CiWifiOn",
    },
    {
        name: "Soundproof rooms",
        icon: "CiWifiOn",
    },
    {
        name: "Blackout curtains",
        icon: "CiWifiOn",
    },
    {
        name: "Pillow menu",
        icon: "CiWifiOn",
    },
    {
        name: "Hypoallergenic bedding",
        icon: "CiWifiOn",
    },
    {
        name: "High-speed internet (wired)",
        icon: "CiWifiOn",
    },
    {
        name: "Meeting and banquet facilities",
        icon: "CiWifiOn",
    },
    {
        name: "Fax/photocopying service",
        icon: "CiWifiOn",
    },
    {
        name: "Currency exchange",
        icon: "CiWifiOn",
    },
    {
        name: "Tour desk",
        icon: "CiWifiOn",
    },
    {
        name: "Ticket service",
        icon: "CiWifiOn",
    },
    {
        name: "Multilingual staff",
        icon: "CiWifiOn",
    },
    {
        name: "ATM on-site",
        icon: "CiWifiOn",
    },
    {
        name: "Vending machines (snacks and drinks)",
        icon: "CiWifiOn",
    },
    {
        name: "Shared lounge/TV area",
        icon: "CiWifiOn",
    },
    {
        name: "Designated smoking area",
        icon: "CiWifiOn",
    },
    {
        name: "Bridal suite",
        icon: "CiWifiOn",
    },
    {
        name: "VIP room facilities",
        icon: "CiWifiOn",
    },
    {
        name: "Game room",
        icon: "CiWifiOn",
    },
    {
        name: "Nightclub/DJ",
        icon: "CiWifiOn",
    },
]

const amenitiesSeeding = [
    {
        amenityTypeId: 1,
        roomId: 1,
    },
    {
        amenityTypeId: 2,
        roomId: 1,
    },
]

const seeding = async () => {
    const password = await hashed("abcd1234")
    userSeeding.forEach((el) => (el.password = password))
    await prisma.user.createMany({ data: userSeeding })
    await prisma.accom.createMany({ data: accomSeeding })
    await prisma.accomPhoto.createMany({ data: accomPhotoSeeding })
    await prisma.houseRules.createMany({ data: houseRulesSeeding })
    await prisma.bedType.createMany({ data: bedTypeSeeding })
    await prisma.room.createMany({ data: roomSeeding })
    await prisma.roomBed.createMany({ data: roomBedSeeding })
    await prisma.reservation.createMany({ data: reservationSeeding })
    await prisma.reviews.createMany({ data: reviewsSeeding })
    await prisma.fee.createMany({ data: feeSeeding })
    await prisma.transaction.createMany({ data: transactionSeeding })
    await prisma.amenityType.createMany({ data: amenityTypeSeeding })
    await prisma.amenities.createMany({ data: amenitiesSeeding })

    console.log("seeding success")
}

module.exports = seeding
