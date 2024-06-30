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
    {
        name: "A202",
        roomType: "Superior King Size",
        bedRoom: 3,
        bathRoom: 2,
        size: 50,
        capacity: 7,
        accomId: 1,
    },
    {
        name: "A203",
        roomType: "Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 10,
        capacity: 2,
        accomId: 1,
    },
    {
        name: "A204",
        roomType: "Double Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 1,
    },
]

const roomPhotoSeeding = [
    { imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719731224/Room/df2urwe3fspl5iy48cdj.jpg", roomId: 1 },
    { imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719731224/Room/df2urwe3fspl5iy48cdj.jpg", roomId: 2 },
    { imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719731224/Room/df2urwe3fspl5iy48cdj.jpg", roomId: 3 },
    { imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719731224/Room/df2urwe3fspl5iy48cdj.jpg", roomId: 4 },
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
    {
        roomId: 2,
        bedTypeId: 5,
        amount: 1,
    },
    {
        roomId: 2,
        bedTypeId: 4,
        amount: 1,
    },
    {
        roomId: 2,
        bedTypeId: 6,
        amount: 1,
    },
    {
        roomId: 3,
        bedTypeId: 1,
        amount: 1,
    },
    {
        roomId: 3,
        bedTypeId: 7,
        amount: 1,
    },
    {
        roomId: 4,
        bedTypeId: 1,
        amount: 2,
    },
]

const reservationSeeding = [
    {
        checkInDate: new Date("Fri Jun 15 2024 14:54:43 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 17 2024 14:54:43 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 14 2024 14:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Doe",
        customerEmail: "John@mail.com",
        customerPhone: "0112345671",
        customerCountry: "Malaysia",
    },
    {
        checkInDate: new Date("Fri Jun 18 2024 14:54:43 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 19 2024 14:54:43 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 17 2024 14:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Jack Dim",
        customerEmail: "Jack@mail.com",
        customerPhone: "0112345821",
        customerCountry: "Norway",
    },
    {
        checkInDate: new Date("Fri Jun 22 2024 14:54:43 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 24 2024 14:54:43 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 20 2024 14:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Bobby Brown",
        customerEmail: "Bobby@mail.com",
        customerPhone: "0197345671",
        customerCountry: "Finland",
    },
    {
        checkInDate: new Date("Fri Jun 25 2024 14:54:43 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 18 2024 14:54:43 GMT+0700 (Indochina Time)"),
        userId: 4,
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
    {
        reservationId: 2,
        comment: "ห้องน้ำอร่อย เตียงเยอะ ลานจอดนุ่มสบาย ",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 1,
        ratingType4: 5,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: 3,
        comment: "ABCDEFG HIJKMLNOP",
        ratingType1: 5,
        ratingType2: 3,
        ratingType3: 2,
        ratingType4: 5,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: 4,
        comment: "Tottaly love this place! Won't come back again",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 5,
        ratingType4: 5,
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
    {
        amenityTypeId: 3,
        roomId: 1,
    },
    {
        amenityTypeId: 4,
        roomId: 1,
    },
    {
        amenityTypeId: 5,
        roomId: 1,
    },
    {
        amenityTypeId: 6,
        roomId: 1,
    },
    {
        amenityTypeId: 7,
        roomId: 1,
    },
    {
        amenityTypeId: 8,
        roomId: 1,
    },
    {
        amenityTypeId: 9,
        roomId: 1,
    },
    {
        amenityTypeId: 10,
        roomId: 1,
    },
    {
        amenityTypeId: 11,
        roomId: 1,
    },
    {
        amenityTypeId: 12,
        roomId: 1,
    },
    {
        amenityTypeId: 13,
        roomId: 1,
    },
    {
        amenityTypeId: 14,
        roomId: 1,
    },
    {
        amenityTypeId: 15,
        roomId: 1,
    },
    {
        amenityTypeId: 16,
        roomId: 1,
    },
    {
        amenityTypeId: 17,
        roomId: 1,
    },
    {
        amenityTypeId: 18,
        roomId: 1,
    },
    {
        amenityTypeId: 19,
        roomId: 1,
    },
    {
        amenityTypeId: 20,
        roomId: 1,
    },
    {
        amenityTypeId: 21,
        roomId: 1,
    },
    {
        amenityTypeId: 22,
        roomId: 1,
    },
    {
        amenityTypeId: 23,
        roomId: 1,
    },
    {
        amenityTypeId: 24,
        roomId: 1,
    },
    {
        amenityTypeId: 25,
        roomId: 1,
    },
    {
        amenityTypeId: 26,
        roomId: 1,
    },
    {
        amenityTypeId: 27,
        roomId: 1,
    },
    {
        amenityTypeId: 28,
        roomId: 1,
    },
    {
        amenityTypeId: 29,
        roomId: 1,
    },
    {
        amenityTypeId: 30,
        roomId: 1,
    },
    {
        amenityTypeId: 31,
        roomId: 1,
    },
    {
        amenityTypeId: 32,
        roomId: 1,
    },
    { amenityTypeId: 1, roomId: 2 },
    { amenityTypeId: 2, roomId: 2 },
    { amenityTypeId: 3, roomId: 2 },
    { amenityTypeId: 4, roomId: 2 },
    { amenityTypeId: 5, roomId: 2 },
    { amenityTypeId: 6, roomId: 2 },
    { amenityTypeId: 7, roomId: 2 },
    { amenityTypeId: 8, roomId: 2 },
    { amenityTypeId: 9, roomId: 2 },
    { amenityTypeId: 10, roomId: 2 },
    { amenityTypeId: 11, roomId: 2 },
    { amenityTypeId: 12, roomId: 2 },
    { amenityTypeId: 13, roomId: 2 },
    { amenityTypeId: 14, roomId: 2 },
    { amenityTypeId: 15, roomId: 2 },
    { amenityTypeId: 16, roomId: 2 },
    { amenityTypeId: 17, roomId: 2 },
    { amenityTypeId: 18, roomId: 2 },
    { amenityTypeId: 19, roomId: 2 },
    { amenityTypeId: 20, roomId: 2 },
    { amenityTypeId: 21, roomId: 2 },
    { amenityTypeId: 22, roomId: 2 },
    { amenityTypeId: 23, roomId: 2 },
    { amenityTypeId: 24, roomId: 2 },
    { amenityTypeId: 25, roomId: 2 },
    { amenityTypeId: 26, roomId: 2 },
    { amenityTypeId: 27, roomId: 2 },
    { amenityTypeId: 28, roomId: 2 },
    { amenityTypeId: 29, roomId: 2 },
    { amenityTypeId: 30, roomId: 2 },
    { amenityTypeId: 31, roomId: 2 },
    { amenityTypeId: 32, roomId: 2 },
    { amenityTypeId: 33, roomId: 2 },
    { amenityTypeId: 34, roomId: 2 },
    { amenityTypeId: 35, roomId: 2 },
    { amenityTypeId: 36, roomId: 2 },
    { amenityTypeId: 1, roomId: 3 },
    { amenityTypeId: 2, roomId: 3 },
    { amenityTypeId: 3, roomId: 3 },
    { amenityTypeId: 4, roomId: 3 },
    { amenityTypeId: 5, roomId: 3 },
    { amenityTypeId: 6, roomId: 3 },
    { amenityTypeId: 7, roomId: 3 },
    { amenityTypeId: 8, roomId: 3 },
    { amenityTypeId: 9, roomId: 3 },
    { amenityTypeId: 10, roomId: 3 },
    { amenityTypeId: 11, roomId: 3 },
    { amenityTypeId: 12, roomId: 3 },
    { amenityTypeId: 13, roomId: 3 },
    { amenityTypeId: 14, roomId: 3 },
    { amenityTypeId: 15, roomId: 3 },
    { amenityTypeId: 16, roomId: 3 },
    { amenityTypeId: 17, roomId: 3 },
    { amenityTypeId: 18, roomId: 3 },
    { amenityTypeId: 19, roomId: 3 },
    { amenityTypeId: 20, roomId: 3 },
    { amenityTypeId: 21, roomId: 3 },
    { amenityTypeId: 22, roomId: 3 },
    { amenityTypeId: 23, roomId: 3 },
    { amenityTypeId: 24, roomId: 3 },
    { amenityTypeId: 25, roomId: 3 },
    { amenityTypeId: 26, roomId: 3 },
    { amenityTypeId: 27, roomId: 3 },
    { amenityTypeId: 28, roomId: 3 },
    { amenityTypeId: 29, roomId: 3 },
    { amenityTypeId: 30, roomId: 3 },
]

const nearByPlaceSeeding = [
    {
        id: "ChIJF4p8eRSWAjERr9Ix4ELDf3U",
        lat: "12.9261459",
        lng: "100.8732129",
        name: "P72 Hotel Walking Street Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJyajlDOO9AjERQbsuRkMHXCs",
        lat: "12.9585512",
        lng: "100.8860123",
        name: "Centara Grand Mirage Beach Resort Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ38OdPWuWAjERa1lfgLvO2S8",
        lat: "12.9212656",
        lng: "100.8700068",
        name: "Signature Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ0ZBzXf69AjERbICrtybzanU",
        lat: "12.928384",
        lng: "100.884384",
        name: "18 Coins Cafe & Hostel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJgRxDnf6VAjER7P53hSMBVhk",
        lat: "12.939067",
        lng: "100.893915",
        name: "The Mooks Residence",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ38OdPWuWAjERa1lfgLvO2S8",
        lat: "12.9212656",
        lng: "100.8700068",
        name: "Signature Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ_aQJ5vqVAjERMXY6jcMMXpk",
        lat: "12.9334473",
        lng: "100.8988807",
        name: "LOAF BAKERS & BREWERS",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJZ0VaiwyWAjERVM1KIDaCnNA",
        lat: "12.924797",
        lng: "100.8832882",
        name: "Tamar Bakery and Restaurant",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJFS4Q6hGWAjERr3Y47sU58EU",
        lat: "12.9297222",
        lng: "100.8777778",
        name: "Starbucks",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJzaqrmxOWAjEREN8s-7nF72I",
        lat: "12.9262017",
        lng: "100.8743623",
        name: "The Dollhouse",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJEQG78BSWAjERebO4_lKJrr0",
        lat: "12.9252868",
        lng: "100.8709524",
        name: "Tony’s by Nashaa Club",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJM9ybqwaWAjER8E9V4FmV8mk",
        lat: "12.9393628",
        lng: "100.8842562",
        name: "Hard Rock Cafe Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJpXKj9wG-AjERM2ozMfKhylI",
        lat: "12.945218",
        lng: "100.8957089",
        name: "[Office] Elephant Jungle Sanctuary Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        iconBgClr: "#7B9EB0",
    },
    {
        id: "ChIJhw7QJMy_AjERnXkuiEXk_64",
        lat: "12.9573965",
        lng: "100.9413683",
        name: "The Million Years Stone Park & Pattaya Crocodile Farm",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
        iconBgClr: "#4DB546",
    },
    {
        id: "ChIJF4p8eRSWAjERr9Ix4ELDf3U",
        lat: "12.9261459",
        lng: "100.8732129",
        name: "P72 Hotel Walking Street Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJXXqUfQGWAjER2nCUzFINqBo",
        lat: "12.9412129",
        lng: "100.888749",
        name: "Centara Pattaya Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJyajlDOO9AjERQbsuRkMHXCs",
        lat: "12.9585512",
        lng: "100.8860123",
        name: "Centara Grand Mirage Beach Resort Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJaXf06hGWAjERbFIOajaQZV4",
        lat: "12.9293064",
        lng: "100.8780717",
        name: "Royal Garden Plaza",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJCYMQjg-WAjEROQ-Y60w7dDc",
        lat: "12.9323258",
        lng: "100.8819892",
        name: "Tipp Plaza",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJT3LoxGCWAjERqauSMdCGvBY",
        lat: "12.90492",
        lng: "100.8696753",
        name: "Food Mart",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJeZjFRA2WAjERIcp3PUv4kbU",
        lat: "12.9235754",
        lng: "100.8798099",
        name: "Friendship Supermarket",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJT1aPldaVAjER_Q_rjdC1LS8",
        lat: "12.9063834",
        lng: "100.8949506",
        name: "Lotus's South Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJ6cHTAxOWAjERuNNrPj0S_To",
        lat: "12.9259664",
        lng: "100.8765398",
        name: "Wat Chai Mongkhon",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/worship_dharma-71.png",
        iconBgClr: "#7B9EB0",
    },
    {
        id: "ChIJdUmnphKWAjERhsMkkFrBk30",
        lat: "12.9239254",
        lng: "100.8787692",
        name: "Tukcom South Pattaya",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJGyhn0uCe4jARKsHCvBXG7Dw",
        lat: "12.9551857",
        lng: "100.9088535",
        name: "Mini Siam",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        iconBgClr: "#13B5C7",
    },
]

const accomNearbyPlacesSeeding = [
    {
        nearbyPlaceId: "ChIJF4p8eRSWAjERr9Ix4ELDf3U",
        distance: "2.376",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJyajlDOO9AjERQbsuRkMHXCs",
        distance: "2.560",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJ38OdPWuWAjERa1lfgLvO2S8",
        distance: "2.957",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJ0ZBzXf69AjERbICrtybzanU",
        distance: "1.248",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJgRxDnf6VAjER7P53hSMBVhk",
        distance: "0.337",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJ38OdPWuWAjERa1lfgLvO2S8",
        distance: "2.957",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJ_aQJ5vqVAjERMXY6jcMMXpk",
        distance: "0.770",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJZ0VaiwyWAjERVM1KIDaCnNA",
        distance: "1.628",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJFS4Q6hGWAjERr3Y47sU58EU",
        distance: "1.754",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJzaqrmxOWAjEREN8s-7nF72I",
        distance: "2.264",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJEQG78BSWAjERebO4_lKJrr0",
        distance: "2.637",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJM9ybqwaWAjER8E9V4FmV8mk",
        distance: "0.947",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJpXKj9wG-AjERM2ozMfKhylI",
        distance: "1.043",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJhw7QJMy_AjERnXkuiEXk_64",
        distance: "5.793",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJF4p8eRSWAjERr9Ix4ELDf3U",
        distance: "2.376",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJXXqUfQGWAjER2nCUzFINqBo",
        distance: "0.669",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJyajlDOO9AjERQbsuRkMHXCs",
        distance: "2.560",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJdUmnphKWAjERhsMkkFrBk30",
        distance: "2.030",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJaXf06hGWAjERbFIOajaQZV4",
        distance: "1.746",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJCYMQjg-WAjEROQ-Y60w7dDc",
        distance: "1.220",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJT3LoxGCWAjERqauSMdCGvBY",
        distance: "4.283",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJeZjFRA2WAjERIcp3PUv4kbU",
        distance: "1.977",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJT1aPldaVAjER_Q_rjdC1LS8",
        distance: "3.348",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJ6cHTAxOWAjERuNNrPj0S_To",
        distance: "2.078",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJdUmnphKWAjERhsMkkFrBk30",
        distance: "2.030",
        accomId: 1,
    },
    {
        nearbyPlaceId: "ChIJGyhn0uCe4jARKsHCvBXG7Dw",
        distance: "2.743",
        accomId: 1,
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
    await prisma.roomPhoto.createMany({ data: roomPhotoSeeding })
    await prisma.reservation.createMany({ data: reservationSeeding })
    await prisma.reviews.createMany({ data: reviewsSeeding })
    await prisma.fee.createMany({ data: feeSeeding })
    await prisma.transaction.createMany({ data: transactionSeeding })
    await prisma.amenityType.createMany({ data: amenityTypeSeeding })
    await prisma.amenities.createMany({ data: amenitiesSeeding })
    await prisma.nearbyPlace.createMany({ data: nearByPlaceSeeding, skipDuplicates: true })
    await prisma.accomNearbyPlaces.createMany({ data: accomNearbyPlacesSeeding })
    console.log("seeding success")
}

module.exports = seeding
