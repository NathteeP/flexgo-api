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
        icon: FaWifiIcon,
    },
    {
        name: "Complimentary breakfast",
        icon: PiBowlFoodIcon,
    },
    {
        name: "Room service",
        icon: MdOutlineRoomServiceIcon,
    },
    {
        name: "24-hour front desk",
        icon: RiCustomerService2FillIcon,
    },
    {
        name: "Fitness center",
        icon: IoIosFitnessIcon,
    },
    {
        name: "Swimming pool",
        icon: FaSwimmingPoolIcon,
    },
    {
        name: "Spa and wellness center",
        icon: GiSleepingBagIcon,
    },
    {
        name: "Business center",
        icon: MdBusinessCenterIcon,
    },
    {
        name: "Conference/meeting rooms",
        icon: MdMeetingRoomIcon,
    },
    {
        name: "On-site restaurant",
        icon: MdRestaurantMenuIcon,
    },
    {
        name: "Bar/lounge",
        icon: GrLoungeIcon,
    },
    {
        name: "Concierge service",
        icon: FaConciergeBellIcon,
    },
    {
        name: "Laundry service",
        icon: MdOutlineLocalLaundryServiceIcon,
    },
    {
        name: "Dry cleaning service",
        icon: MdOutlineDryCleaningIcon,
    },
    {
        name: "Shuttle service",
        icon: MdOutlineAirportShuttleIcon,
    },
    {
        name: "Airport transfer",
        icon: MdLocalAirportIcon,
    },
    {
        name: "Valet parking",
        icon: LuParkingCircleIcon,
    },
    {
        name: "Self-parking",
        icon: LuParkingCircleIcon,
    },
    {
        name: "Pet-friendly rooms",
        icon: MdOutlinePetsIcon,
    },
    {
        name: "Non-smoking rooms",
        icon: FaSmokingBanIcon,
    },
    {
        name: "Air conditioning",
        icon: TbAirConditioningIcon,
    },
    {
        name: "Heating",
        icon: TbAirConditioningIcon,
    },
    {
        name: "Mini-bar",
        icon: GrBarIcon,
    },
    {
        name: "In-room safe",
        icon: AiOutlineSafetyIcon,
    },
    {
        name: "Flat-screen TV",
        icon: MdTvIcon,
    },
    {
        name: "Cable/satellite TV",
        icon: MdTvIcon,
    },
    {
        name: "Coffee/tea maker",
        icon: MdCoffeeMakerIcon,
    },
    {
        name: "Iron and ironing board",
        icon: MdOutlineIronIcon,
    },
    {
        name: "Hairdryer",
        icon: PiHairDryerIcon,
    },
    {
        name: "Complimentary toiletries",
        icon: PiToiletIcon,
    },
    {
        name: "Bathrobe and slippers",
        icon: GiSlippersIcon,
    },
    {
        name: "In-room dining",
        icon: MdRestaurantMenuIcon,
    },
    {
        name: "Daily housekeeping",
        icon: MdCleaningServicesIcon,
    },
    {
        name: "Turndown service",
        icon: MdOutlineRoomServiceIcon,
    },
    {
        name: "Express check-in/check-out",
        icon: MdOutlineFactCheckIcon,
    },
    {
        name: "Luggage storage",
        icon: MdOutlineLuggageIcon,
    },
    {
        name: "Babysitting/child services",
        icon: FaBabyCarriageIcon,
    },
    {
        name: "Children's play area",
        icon: TbPlayFootballIcon,
    },
    {
        name: "Family rooms",
        icon: MdFamilyRestroomIcon,
    },
    {
        name: "Accessible rooms",
        icon: MdMeetingRoomIcon,
    },
    {
        name: "Electric vehicle charging station",
        icon: TbDeviceMobileChargingIcon,
    },
    {
        name: "Bicycle rental",
        icon: FaBicycleIcon,
    },
    {
        name: "Car rental service",
        icon: FaCarIcon,
    },
    {
        name: "Gift shop",
        icon: FaGiftIcon,
    },
    {
        name: "Beauty salon",
        icon: GrUserFemaleIcon,
    },
    {
        name: "Library",
        icon: IoLibraryOutlineIcon,
    },
    {
        name: "Tennis court",
        icon: MdOutlineSportsTennisIcon,
    },
    {
        name: "Golf course",
        icon: MdOutlineGolfCourseIcon,
    },
    {
        name: "Garden",
        icon: MdOutlineGrassIcon,
    },
    {
        name: "Terrace",
        icon: MdMeetingRoomIcon,
    },
    {
        name: "BBQ facilities",
        icon: GiBarbecueIcon,
    },
    {
        name: "Picnic area",
        icon: PiPicnicTableIcon,
    },
    {
        name: "Smoking area",
        icon: FaSmokingIcon,
    },
    {
        name: "Soundproof rooms",
        icon: GiSoundOnIcon,
    },
    {
        name: "Blackout curtains",
        icon: MdCurtainsClosedIcon,
    },
    {
        name: "Pillow menu",
        icon: GiPillowIcon,
    },
    {
        name: "Hypoallergenic bedding",
        icon: FaBedIcon,
    },
    {
        name: "High-speed internet (wired)",
        icon: CgModemIcon,
    },
    {
        name: "Meeting and banquet facilities",
        icon: MdHeadphonesIcon,
    },
    {
        name: "Fax/photocopying service",
        icon: FaFaxIcon,
    },
    {
        name: "Currency exchange",
        icon: MdCurrencyExchangeIcon,
    },
    {
        name: "Tour desk",
        icon: MdDeskIcon,
    },
    {
        name: "Ticket service",
        icon: IoTicketOutlineIcon,
    },
    {
        name: "Multilingual staff",
        icon: SiStaffbaseIcon,
    },
    {
        name: "ATM on-site",
        icon: MdLocalAtmIcon,
    },
    {
        name: "Vending machines (snacks and drinks)",
        icon: GiVendingMachineIcon,
    },
    {
        name: "Shared lounge/TV area",
        icon: MdTvIcon,
    },
    {
        name: "Designated smoking area",
        icon: FaSmokingIcon,
    },
    {
        name: "Bridal suite",
        icon: MdMeetingRoomIcon,
    },
    {
        name: "VIP room facilities",
        icon: RiVipFillIcon,
    },
    {
        name: "Game room",
        icon: IoGameControllerOutlineIcon,
    },
    {
        name: "Nightclub/DJ",
        icon: PiDiscoBallDuotoneIcon,
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
