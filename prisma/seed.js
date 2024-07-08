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

const userPhotoSeeding = [
    {
        userId: 1,
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719543270/Users/zgeczbelatsmr1p3uklt.jpg",
    },
    {
        userId: 2,
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719910840/Users/ao0pr08lughx4f21zehj.jpg",
    },
    {
        userId: 3,
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719910841/Users/qaqyptlgaxsimqdey512.jpg",
    },
    {
        userId: 4,
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719910844/Users/qm1tfvx6wejkr6eb739v.jpg",
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
    {
        userId: 1,
        name: "Shambhala Hotel Pattaya",
        lat: "12.936385946325817",
        lng: "100.89252255333206",
        address: "245 187 หมู่ที่ 9 ถนน พัทยา สาย 3 ตำบล หนองปรือ อำเภอบางละมุง ชลบุรี 20150",
        province: "Chonburi",
        district: "Pattaya",
        type: "HOTEL",
        status: "ACTIVE",
        description:
            "In addition to the standard of SHA, all guests get free Wi-Fi in all rooms and free parking if arriving by car. Conveniently situated in the Don Mueang International Airport part of Bangkok, this property puts you close to attractions and interesting dining options. Don't leave before paying a visit to the famous Wat Phra Chetuphon. Rated with 4 stars, this high-quality property provides guests with access to restaurant and fitness center on-site.",
    },
    {
        userId: 1,
        name: "VIC 3 Bangkok Hotel",
        lat: "13.774561280663432",
        lng: "100.54223406868991",
        address: "89 Phahon Yothin Soi 3, Phaya Thai, , Phaya Thai, Bangkok",
        province: "Bangkok",
        district: "Phaya Thai",
        type: "HOTEL",
        status: "ACTIVE",
        description:
            "In addition to the standard of SHA, all guests get free Wi-Fi in all rooms and free parking if arriving by car. Conveniently situated in the Don Mueang International Airport part of Bangkok, this property puts you close to attractions and interesting dining options. Don't leave before paying a visit to the famous Wat Phra Chetuphon. Rated with 4 stars, this high-quality property provides guests with access to restaurant and fitness center on-site.",
    },
    {
        userId: 2,
        name: "Emerald Dream Hotel",
        lat: "13.739183",
        lng: "100.553124",
        address: "123 Sukhumvit Soi 24, Khlong Tan, Khlong Toei, Bangkok",
        province: "Bangkok",
        district: "Khlong Toei",
        type: "HOTEL",
        status: "ACTIVE",
        description:
            "Experience luxury at Emerald Dream Hotel with complimentary Wi-Fi and parking. Located in the vibrant Khlong Toei district, enjoy easy access to local attractions and dining options. The hotel features a restaurant, fitness center, and a relaxing spa.",
    },
    {
        userId: 3,
        name: "Lotus Palace Inn",
        lat: "13.756331",
        lng: "100.501762",
        address: "456 Ratchadamnoen Klang Rd, Bowon Niwet, Phra Nakhon, Bangkok",
        province: "Bangkok",
        district: "Phra Nakhon",
        type: "HOTEL",
        status: "ACTIVE",
        description:
            "Stay at the Lotus Palace Inn and enjoy premium amenities including free Wi-Fi, parking, and an outdoor pool. Conveniently located in the Phra Nakhon",
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
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/avzjktrcma2giv0ysugb.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/mdzemsefo6vthfgtqcr5.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/akqcskbuwlvmt16owy2b.webp",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/lh72g0s5waw5nh9rojkq.webp",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906098/Accom/ncehabcgksgachkoszuy.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906099/Accom/fh25ttytynmxphnbwbnn.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906098/Accom/ncehabcgksgachkoszuy.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/lan2i0i417d07vbyodk7.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/zsd0mqpwvgzfr070fwpi.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906098/Accom/ncehabcgksgachkoszuy.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906099/Accom/fh25ttytynmxphnbwbnn.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719906098/Accom/ncehabcgksgachkoszuy.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561702/accomAlbumSeed/lan2i0i417d07vbyodk7.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561701/accomAlbumSeed/zsd0mqpwvgzfr070fwpi.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/e8kd2xmrmtlfmytiuyek.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/e8kd2xmrmtlfmytiuyek.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/e8kd2xmrmtlfmytiuyek.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/e8kd2xmrmtlfmytiuyek.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/suvx7w6kf9tjp4loaerp.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/v7ab3n4ocjzwb0jejn5g.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/suvx7w6kf9tjp4loaerp.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/qzuf6jbvaognt61waw3a.webp",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561703/accomAlbumSeed/togxqji3fqllvfrs4mb9.jpg",
        accomId: 5,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1719561700/accomAlbumSeed/suvx7w6kf9tjp4loaerp.jpg",
        accomId: 5,
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
    {
        checkIn: "After 14.00 of the reservation date.",
        checkOut: "Before 16.00 PM.",
        petsRule: "Every kind of pets are allowed. Only dragon and whale are restricted.",
        ageRule: "There is no age requirement for check-in",
        cancelPolicy: "FLEXIBLE",
        accomId: 2,
    },
    {
        checkIn: "From 15.00 to 00.00",
        checkOut: "Before 12.00 PM.",
        petsRule: "Our hotel are allowed only guest'aligator. Cats and dogs are restricted.",
        ageRule: "There is no age requirement for check-in",
        cancelPolicy: "MODERATE",
        accomId: 3,
    },
    {
        checkIn: "After 14.00 of the reservation date.",
        checkOut: "Before 16.00 PM.",
        petsRule: "Every kind of pets are allowed. Only dragon and whale are restricted.",
        ageRule: "There is no age requirement for check-in",
        cancelPolicy: "FLEXIBLE",
        accomId: 4,
    },
    {
        checkIn: "From 15.00 to 00.00",
        checkOut: "Available 24 hours",
        petsRule: "Pets are not allowed",
        ageRule: "There is no age requirement for check-in",
        cancelPolicy: "STRICT",
        accomId: 5,
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
        price: 199,
    },
    {
        name: "A202",
        roomType: "Superior King Size",
        bedRoom: 3,
        bathRoom: 2,
        size: 50,
        capacity: 7,
        accomId: 1,
        price: 250,
    },
    {
        name: "A203",
        roomType: "Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 10,
        capacity: 2,
        accomId: 1,
        price: 450,
    },
    {
        name: "A204",
        roomType: "Double Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 1,
        price: 2000,
    },
    {
        name: "801",
        roomType: "Deluxe pool",
        bedRoom: 1,
        bathRoom: 1,
        size: 80,
        capacity: 4,
        accomId: 2,
        price: 4000,
    },
    {
        name: "B102",
        roomType: "Executive Suite",
        bedRoom: 2,
        bathRoom: 2,
        size: 40,
        capacity: 4,
        accomId: 2,
        price: 300,
    },
    {
        name: "DE 101",
        roomType: "Standard Twin Room",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 3,
        price: 2000,
    },
    {
        name: "DE 102",
        roomType: "Standard Twin Room",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 3,
        price: 1500,
    },
    {
        name: "C301",
        roomType: "Family Room",
        bedRoom: 2,
        bathRoom: 1,
        size: 35,
        capacity: 5,
        accomId: 3,
        price: 220,
    },
    {
        name: "D401",
        roomType: "Standard Single",
        bedRoom: 1,
        bathRoom: 1,
        size: 15,
        capacity: 1,
        accomId: 4,
        price: 120,
    },
    {
        name: "D402",
        roomType: "Executive Deluxe",
        bedRoom: 2,
        bathRoom: 2,
        size: 30,
        capacity: 4,
        accomId: 4,
        price: 280,
    },
    {
        name: "E501",
        roomType: "Luxury Suite",
        bedRoom: 3,
        bathRoom: 3,
        size: 60,
        capacity: 6,
        accomId: 5,
        price: 400,
    },
    {
        name: "E502",
        roomType: "Penthouse",
        bedRoom: 4,
        bathRoom: 4,
        size: 80,
        capacity: 8,
        accomId: 5,
        price: 600,
    },
    {
        name: "E503",
        roomType: "VIP Suite",
        bedRoom: 2,
        bathRoom: 2,
        size: 40,
        capacity: 4,
        accomId: 5,
        price: 350,
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
    {
        roomId: 5,
        bedTypeId: 5,
        amount: 2,
    },
    {
        roomId: 5,
        bedTypeId: 6,
        amount: 2,
    },
    {
        roomId: 6,
        bedTypeId: 1,
        amount: 2,
    },
    {
        roomId: 7,
        bedTypeId: 1,
        amount: 2,
    },
]

const reservationSeeding = [
    {
        id: "240614000147",
        checkInDate: new Date("Fri Jun 15 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 17 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 14 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Doe",
        customerEmail: "John@mail.com",
        customerPhone: "0112345671",
        customerCountry: "Malaysia",
        userId: 1,
    },
    {
        id: "240617000107",
        checkInDate: new Date("Fri Jun 18 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 19 2024 00:00:00 GMT+0700 (Indochina Time)"),
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
        id: "240620000194",
        checkInDate: new Date("Fri Jun 22 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 24 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 20 2024 00:00:00 GMT+0700 (Indochina Time)"),
        customerName: "Bobby Brown",
        customerEmail: "Bobby@mail.com",
        customerPhone: "0197345671",
        customerCountry: "Finland",
    },
    {
        id: "240618000122",
        checkInDate: new Date("Fri Jun 25 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 26 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 18 2024 00:00:00 GMT+0700 (Indochina Time)"),
        userId: 4,
    },
    {
        id: "240614000148",
        checkInDate: "2024-07-02T17:00:00.000Z",
        checkOutDate: "2024-07-04T17:00:00.000Z",
        roomId: 2,
        status: "CHECKIN",
        customerAmount: 1,
        bookingDate: "2024-07-01T12:00:00.000Z",
        customerName: "Alice Smith",
        customerEmail: "alice@example.com",
        customerPhone: "0123456789",
        customerCountry: "United States",
    },
    {
        id: "240614000150",
        checkInDate: "2024-07-03T17:00:00.000Z",
        checkOutDate: "2024-07-05T17:00:00.000Z",
        roomId: 3,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: "2024-07-02T12:00:00.000Z",
        customerName: "Emma Brown",
        customerEmail: "emma@example.com",
        customerPhone: "0234567891",
        customerCountry: "Canada",
    },
    {
        id: "240614000256",
        checkInDate: "2024-07-04T17:00:00.000Z",
        checkOutDate: "2024-07-06T17:00:00.000Z",
        roomId: 4,
        status: "CHECKIN",
        customerAmount: 1,
        bookingDate: "2024-07-03T17:00:00.000Z",
        customerName: "David Lee",
        customerEmail: "david@example.com",
        customerPhone: "0345678912",
        customerCountry: "Australia",
    },
    {
        id: "240614000188",
        checkInDate: "2024-06-28T17:00:00.000Z",
        checkOutDate: "2024-07-03T17:00:00.000Z",
        roomId: 5,
        status: "CHECKIN",
        customerAmount: 3,
        bookingDate: "2024-07-04T12:00:00.000Z",
        customerName: "Sophia Wilson",
        customerEmail: "sophia@example.com",
        customerPhone: "0456789123",
        customerCountry: "United Kingdom",
    },
    {
        id: "240614000985",
        checkInDate: "2024-07-01T17:00:00.000Z",
        checkOutDate: "2024-07-04T17:00:00.000Z",
        roomId: 6,
        status: "CHECKIN",
        customerAmount: 3,
        bookingDate: "2024-07-07T12:00:00.000Z",
        customerName: "Olivia Garcia",
        customerEmail: "olivia@example.com",
        customerPhone: "0789123456",
        customerCountry: "Italy",
    },
    {
        id: "240614000117",
        checkInDate: "2024-06-29T17:00:00.000Z",
        checkOutDate: "2024-07-02T17:00:00.000Z",
        roomId: 10,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: "2024-07-05T12:00:00.000Z",
        customerName: "Michael Johnson",
        customerEmail: "michael@example.com",
        customerPhone: "0567891234",
        customerCountry: "Germany",
    },
    {
        id: "240614000858",
        checkInDate: "2024-06-30T17:00:00.000Z",
        checkOutDate: "2024-07-01T17:00:00.000Z",
        roomId: 11,
        status: "CHECKIN",
        customerAmount: 1,
        bookingDate: "2024-07-06T12:00:00.000Z",
        customerName: "Liam Brown",
        customerEmail: "liam@example.com",
        customerPhone: "0678912345",
        customerCountry: "France",
    },
]

const reviewsSeeding = [
    {
        reservationId: "240617000107",
        comment: "Hello World",
        ratingType1: 5,
        ratingType2: 4,
        ratingType3: 5,
        ratingType4: 4,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: "240620000194",
        comment: "ห้องน้ำอร่อย เตียงเยอะ ลานจอดนุ่มสบาย ",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 1,
        ratingType4: 5,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: "240618000122",
        comment: "ABCDEFG HIJKMLNOP",
        ratingType1: 5,
        ratingType2: 3,
        ratingType3: 2,
        ratingType4: 5,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: "240614000147",
        comment: "Tottaly love this place! Won't come back again",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 5,
        ratingType4: 5,
        reviewDate: new Date("Fri Jun 26 2024 14:54:43 GMT+0700 (Indochina Time)"),
    },
    {
        reservationId: "240614000148",
        comment: "Excellent service and friendly staff.",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 5,
        ratingType4: 5,
        reviewDate: "2024-06-29T07:54:43.000Z",
    },
    {
        reservationId: "240614000150",
        comment: "Good value for money.",
        ratingType1: 4,
        ratingType2: 4,
        ratingType3: 4,
        ratingType4: 4,
        reviewDate: "2024-06-30T07:54:43.000Z",
    },
    {
        reservationId: "240614000256",
        comment: "Room was clean and comfortable.",
        ratingType1: 5,
        ratingType2: 4,
        ratingType3: 5,
        ratingType4: 4,
        reviewDate: "2024-07-01T07:54:43.000Z",
    },
    {
        reservationId: "240614000188",
        comment: "Average experience, nothing special.",
        ratingType1: 3,
        ratingType2: 3,
        ratingType3: 3,
        ratingType4: 3,
        reviewDate: "2024-07-02T07:54:43.000Z",
    },
    {
        reservationId: "240614000985",
        comment: "Poor service, would not recommend.",
        ratingType1: 2,
        ratingType2: 2,
        ratingType3: 2,
        ratingType4: 2,
        reviewDate: "2024-07-03T07:54:43.000Z",
    },
    {
        reservationId: "240614000117",
        comment: "Fantastic stay, highly recommended!",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 5,
        ratingType4: 5,
        reviewDate: "2024-07-04T07:54:43.000Z",
    },
    {
        reservationId: "240614000858",
        comment: "Decent place, but had some issues.",
        ratingType1: 3,
        ratingType2: 4,
        ratingType3: 3,
        ratingType4: 3,
        reviewDate: "2024-07-05T07:54:43.000Z",
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
        reservationId: "240614000147",
        netPrice: 553.50,
        serviceFee: 53.50
    },
]

const amenityTypeSeeding = [
    {
        name: "Free Wi-Fi",
        icon: "FaWifiIcon",
    },
    {
        name: "Complimentary breakfast",
        icon: "PiBowlFoodIcon",
    },
    {
        name: "Room service",
        icon: "MdOutlineRoomServiceIcon",
    },
    {
        name: "24-hour front desk",
        icon: "RiCustomerService2FillIcon",
    },
    {
        name: "Fitness center",
        icon: "IoIosFitnessIcon",
    },
    {
        name: "Swimming pool",
        icon: "FaSwimmingPoolIcon",
    },
    {
        name: "Spa and wellness center",
        icon: "GiSleepingBagIcon",
    },
    {
        name: "Business center",
        icon: "MdBusinessCenterIcon",
    },
    {
        name: "Conference/meeting rooms",
        icon: "MdMeetingRoomIcon",
    },
    {
        name: "On-site restaurant",
        icon: "MdRestaurantMenuIcon",
    },
    {
        name: "Bar/lounge",
        icon: "GrLoungeIcon",
    },
    {
        name: "Concierge service",
        icon: "FaConciergeBellIcon",
    },
    {
        name: "Laundry service",
        icon: "MdOutlineLocalLaundryServiceIcon",
    },
    {
        name: "Dry cleaning service",
        icon: "MdOutlineDryCleaningIcon",
    },
    {
        name: "Shuttle service",
        icon: "MdOutlineAirportShuttleIcon",
    },
    {
        name: "Airport transfer",
        icon: "MdLocalAirportIcon",
    },
    {
        name: "Valet parking",
        icon: "LuParkingCircleIcon",
    },
    {
        name: "Self-parking",
        icon: "LuParkingCircleIcon",
    },
    {
        name: "Pet-friendly rooms",
        icon: "MdOutlinePetsIcon",
    },
    {
        name: "Non-smoking rooms",
        icon: "FaSmokingBanIcon",
    },
    {
        name: "Air conditioning",
        icon: "TbAirConditioningIcon",
    },
    {
        name: "Heating",
        icon: "TbAirConditioningIcon",
    },
    {
        name: "Mini-bar",
        icon: "GrBarIcon",
    },
    {
        name: "In-room safe",
        icon: "AiOutlineSafetyIcon",
    },
    {
        name: "Flat-screen TV",
        icon: "MdTvIcon",
    },
    {
        name: "Cable/satellite TV",
        icon: "MdTvIcon",
    },
    {
        name: "Coffee/tea maker",
        icon: "MdCoffeeMakerIcon",
    },
    {
        name: "Iron and ironing board",
        icon: "MdOutlineIronIcon",
    },
    {
        name: "Hairdryer",
        icon: "PiHairDryerIcon",
    },
    {
        name: "Complimentary toiletries",
        icon: "PiToiletIcon",
    },
    {
        name: "Bathrobe and slippers",
        icon: "GiSlippersIcon",
    },
    {
        name: "In-room dining",
        icon: "MdRestaurantMenuIcon",
    },
    {
        name: "Daily housekeeping",
        icon: "MdCleaningServicesIcon",
    },
    {
        name: "Turndown service",
        icon: "MdOutlineRoomServiceIcon",
    },
    {
        name: "Express check-in/check-out",
        icon: "MdOutlineFactCheckIcon",
    },
    {
        name: "Luggage storage",
        icon: "MdOutlineLuggageIcon",
    },
    {
        name: "Babysitting/child services",
        icon: "FaBabyCarriageIcon",
    },
    {
        name: "Children's play area",
        icon: "TbPlayFootballIcon",
    },
    {
        name: "Family rooms",
        icon: "MdFamilyRestroomIcon",
    },
    {
        name: "Accessible rooms",
        icon: "MdMeetingRoomIcon",
    },
    {
        name: "Electric vehicle charging station",
        icon: "TbDeviceMobileChargingIcon",
    },
    {
        name: "Bicycle rental",
        icon: "FaBicycleIcon",
    },
    {
        name: "Car rental service",
        icon: "FaCarIcon",
    },
    {
        name: "Gift shop",
        icon: "FaGiftIcon",
    },
    {
        name: "Beauty salon",
        icon: "GrUserFemaleIcon",
    },
    {
        name: "Library",
        icon: "IoLibraryOutlineIcon",
    },
    {
        name: "Tennis court",
        icon: "MdOutlineSportsTennisIcon",
    },
    {
        name: "Golf course",
        icon: "MdOutlineGolfCourseIcon",
    },
    {
        name: "Garden",
        icon: "MdOutlineGrassIcon",
    },
    {
        name: "Terrace",
        icon: "MdMeetingRoomIcon",
    },
    {
        name: "BBQ facilities",
        icon: "GiBarbecueIcon",
    },
    {
        name: "Picnic area",
        icon: "PiPicnicTableIcon",
    },
    {
        name: "Smoking area",
        icon: "FaSmokingIcon",
    },
    {
        name: "Soundproof rooms",
        icon: "GiSoundOnIcon",
    },
    {
        name: "Blackout curtains",
        icon: "MdCurtainsClosedIcon",
    },
    {
        name: "Pillow menu",
        icon: "GiPillowIcon",
    },
    {
        name: "Hypoallergenic bedding",
        icon: "FaBedIcon",
    },
    {
        name: "High-speed internet (wired)",
        icon: "CgModemIcon",
    },
    {
        name: "Meeting and banquet facilities",
        icon: "MdHeadphonesIcon",
    },
    {
        name: "Fax/photocopying service",
        icon: "FaFaxIcon",
    },
    {
        name: "Currency exchange",
        icon: "MdCurrencyExchangeIcon",
    },
    {
        name: "Tour desk",
        icon: "MdDeskIcon",
    },
    {
        name: "Ticket service",
        icon: "IoTicketOutlineIcon",
    },
    {
        name: "Multilingual staff",
        icon: "SiStaffbaseIcon",
    },
    {
        name: "ATM on-site",
        icon: "MdLocalAtmIcon",
    },
    {
        name: "Vending machines (snacks and drinks)",
        icon: "GiVendingMachineIcon",
    },
    {
        name: "Shared lounge/TV area",
        icon: "MdTvIcon",
    },
    {
        name: "Designated smoking area",
        icon: "FaSmokingIcon",
    },
    {
        name: "Bridal suite",
        icon: "MdMeetingRoomIcon",
    },
    {
        name: "VIP room facilities",
        icon: "RiVipFillIcon",
    },
    {
        name: "Game room",
        icon: "IoGameControllerOutlineIcon",
    },
    {
        name: "Nightclub/DJ",
        icon: "PiDiscoBallDuotoneIcon",
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
    { amenityTypeId: 1, roomId: 5 },
    { amenityTypeId: 2, roomId: 5 },
    { amenityTypeId: 3, roomId: 5 },
    { amenityTypeId: 4, roomId: 5 },
    { amenityTypeId: 5, roomId: 5 },
    { amenityTypeId: 6, roomId: 5 },
    { amenityTypeId: 7, roomId: 5 },
    { amenityTypeId: 8, roomId: 5 },
    { amenityTypeId: 9, roomId: 5 },
    { amenityTypeId: 10, roomId: 5 },
    { amenityTypeId: 11, roomId: 5 },
    { amenityTypeId: 12, roomId: 5 },
    { amenityTypeId: 13, roomId: 5 },
    { amenityTypeId: 14, roomId: 5 },
    { amenityTypeId: 15, roomId: 5 },
    { amenityTypeId: 16, roomId: 5 },
    { amenityTypeId: 17, roomId: 5 },
    { amenityTypeId: 18, roomId: 5 },
    { amenityTypeId: 19, roomId: 5 },
    { amenityTypeId: 20, roomId: 5 },
    { amenityTypeId: 21, roomId: 5 },
    { amenityTypeId: 22, roomId: 5 },
    { amenityTypeId: 23, roomId: 5 },
    { amenityTypeId: 24, roomId: 5 },
    { amenityTypeId: 25, roomId: 5 },
    { amenityTypeId: 26, roomId: 5 },
    { amenityTypeId: 27, roomId: 5 },
    { amenityTypeId: 28, roomId: 5 },
    { amenityTypeId: 29, roomId: 5 },
    { amenityTypeId: 30, roomId: 5 },
    { amenityTypeId: 1, roomId: 9 },
    { amenityTypeId: 2, roomId: 9 },
    { amenityTypeId: 3, roomId: 9 },
    { amenityTypeId: 4, roomId: 9 },
    { amenityTypeId: 5, roomId: 9 },
    { amenityTypeId: 6, roomId: 9 },
    { amenityTypeId: 7, roomId: 9 },
    { amenityTypeId: 8, roomId: 9 },
    { amenityTypeId: 9, roomId: 9 },
    { amenityTypeId: 10, roomId: 9 },
    { amenityTypeId: 11, roomId: 9 },
    { amenityTypeId: 12, roomId: 9 },
    { amenityTypeId: 13, roomId: 9 },
    { amenityTypeId: 14, roomId: 9 },
    { amenityTypeId: 15, roomId: 9 },
    { amenityTypeId: 16, roomId: 9 },
    { amenityTypeId: 17, roomId: 9 },
    { amenityTypeId: 18, roomId: 9 },
    { amenityTypeId: 19, roomId: 9 },
    { amenityTypeId: 20, roomId: 9 },
    { amenityTypeId: 21, roomId: 9 },
    { amenityTypeId: 22, roomId: 9 },
    { amenityTypeId: 23, roomId: 9 },
    { amenityTypeId: 24, roomId: 9 },
    { amenityTypeId: 25, roomId: 9 },
    { amenityTypeId: 26, roomId: 9 },
    { amenityTypeId: 27, roomId: 9 },
    { amenityTypeId: 28, roomId: 9 },
    { amenityTypeId: 29, roomId: 9 },
    { amenityTypeId: 30, roomId: 9 },
    { amenityTypeId: 31, roomId: 9 },
    { amenityTypeId: 32, roomId: 9 },
    { amenityTypeId: 33, roomId: 9 },
    { amenityTypeId: 34, roomId: 9 },
    { amenityTypeId: 35, roomId: 9 },
    { amenityTypeId: 36, roomId: 9 },
    { amenityTypeId: 1, roomId: 11 },
    { amenityTypeId: 2, roomId: 11 },
    { amenityTypeId: 3, roomId: 11 },
    { amenityTypeId: 4, roomId: 11 },
    { amenityTypeId: 5, roomId: 11 },
    { amenityTypeId: 6, roomId: 11 },
    { amenityTypeId: 7, roomId: 11 },
    { amenityTypeId: 8, roomId: 11 },
    { amenityTypeId: 9, roomId: 11 },
    { amenityTypeId: 10, roomId: 11 },
    { amenityTypeId: 11, roomId: 11 },
    { amenityTypeId: 12, roomId: 11 },
    { amenityTypeId: 13, roomId: 11 },
    { amenityTypeId: 14, roomId: 11 },
    { amenityTypeId: 15, roomId: 11 },
    { amenityTypeId: 16, roomId: 11 },
    { amenityTypeId: 17, roomId: 11 },
    { amenityTypeId: 18, roomId: 11 },
    { amenityTypeId: 19, roomId: 11 },
    { amenityTypeId: 20, roomId: 11 },
    { amenityTypeId: 21, roomId: 11 },
    { amenityTypeId: 22, roomId: 11 },
    { amenityTypeId: 23, roomId: 11 },
    { amenityTypeId: 24, roomId: 11 },
    { amenityTypeId: 25, roomId: 11 },
    { amenityTypeId: 26, roomId: 11 },
    { amenityTypeId: 27, roomId: 11 },
    { amenityTypeId: 28, roomId: 11 },
    { amenityTypeId: 29, roomId: 11 },
    { amenityTypeId: 30, roomId: 11 },
    { amenityTypeId: 31, roomId: 11 },
    { amenityTypeId: 32, roomId: 11 },
    { amenityTypeId: 33, roomId: 11 },
    { amenityTypeId: 34, roomId: 11 },
    { amenityTypeId: 35, roomId: 11 },
    { amenityTypeId: 36, roomId: 11 },
    { amenityTypeId: 37, roomId: 11 },
    { amenityTypeId: 38, roomId: 11 },
    { amenityTypeId: 39, roomId: 11 },
    { amenityTypeId: 40, roomId: 11 },
    { amenityTypeId: 41, roomId: 11 },
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
    await prisma.userPhoto.createMany({ data: userPhotoSeeding })
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
