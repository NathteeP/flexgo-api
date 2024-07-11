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
      name: 'The Sukosol Hotel',
      lat: '13.756982',
      lng: '100.532694',
      address: '477 Si Ayuthaya Rd, Thanon Phaya Thai, Ratchathewi, Bangkok 10400',
      province: 'Bangkok',
      district: 'Ratchathewi',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'A luxurious stay awaits you at The Sukosol Hotel with complimentary Wi-Fi, parking, and a state-of-the-art fitness center.'
    },
    {
      userId: 1,
      name: 'Pullman Bangkok King Power',
      lat: '13.758408',
      lng: '100.537067',
      address: '8/2 Rangnam Rd, Thanon Phaya Thai, Ratchathewi, Bangkok 10400',
      province: 'Bangkok',
      district: 'Ratchathewi',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Experience top-notch amenities including free Wi-Fi, parking, and a beautiful swimming pool at Pullman Bangkok King Power.'
    },
    {
      userId: 1,
      name: 'The Berkeley Hotel Pratunam',
      lat: '13.750840',
      lng: '100.541720',
      address: '559 Ratchaprarop Rd, Makkasan, Ratchathewi, Bangkok 10400',
      province: 'Bangkok',
      district: 'Ratchathewi',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Stay at The Berkeley Hotel Pratunam for luxurious accommodations, free Wi-Fi, and convenient access to shopping and dining.'
    },
    {
      userId: 1,
      name: 'Amari Watergate Bangkok',
      lat: '13.751484',
      lng: '100.541662',
      address: '847 Phetchaburi Rd, Makkasan, Ratchathewi, Bangkok 10400',
      province: 'Bangkok',
      district: 'Ratchathewi',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Amari Watergate Bangkok offers premium facilities including a swimming pool, fitness center, and complimentary Wi-Fi.'
    },
    {
      userId: 1,
      name: 'Novotel Bangkok Platinum Pratunam',
      lat: '13.748984',
      lng: '100.540070',
      address: '220 Petchaburi Rd, Ratchathewi, Bangkok 10400',
      province: 'Bangkok',
      district: 'Ratchathewi',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Novotel Bangkok Platinum Pratunam provides guests with luxurious rooms, free Wi-Fi, and a central location near shopping districts.'
    },
    {
      userId: 1,
      name: 'The Quarter Hualamphong by UHG',
      lat: '13.737263',
      lng: '100.516689',
      address: '23/34-35 Traimit Road, Talat Noi, Samphanthawong, Bangkok 10100',
      province: 'Bangkok',
      district: 'Samphanthawong',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Enjoy modern amenities and convenient access to public transportation at The Quarter Hualamphong by UHG.'
    },
    {
      userId: 1,
      name: 'Mandarin Hotel Managed by Centre Point',
      lat: '13.730186',
      lng: '100.528470',
      address: '662 Rama IV Rd, Maha Phruttharam, Bang Rak, Bangkok 10500',
      province: 'Bangkok',
      district: 'Bang Rak',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Mandarin Hotel offers luxurious rooms, a swimming pool, and complimentary Wi-Fi, situated in the heart of Bangkok.'
    },
    {
      userId: 1,
      name: 'Eastin Grand Hotel Sathorn Bangkok',
      lat: '13.719737',
      lng: '100.518024',
      address: '33/1 South Sathorn Rd, Yannawa, Sathorn, Bangkok 10120',
      province: 'Bangkok',
      district: 'Sathorn',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Eastin Grand Hotel Sathorn Bangkok features premium accommodations, free Wi-Fi, and a stunning infinity pool.'
    },
    {
      userId: 1,
      name: 'Shangri-La Hotel, Bangkok',
      lat: '13.722002',
      lng: '100.514746',
      address: '89 Soi Wat Suan Plu, New Road, Bangrak, Bangkok 10500',
      province: 'Bangkok',
      district: 'Bang Rak',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Stay in luxury at Shangri-La Hotel, Bangkok with world-class facilities, complimentary Wi-Fi, and breathtaking river views.'
    },
    {
      userId: 1,
      name: 'Lebua at State Tower',
      lat: '13.721032',
      lng: '100.514062',
      address: '1055 Silom Rd, Silom, Bang Rak, Bangkok 10500',
      province: 'Bangkok',
      district: 'Bang Rak',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Lebua at State Tower offers exceptional service, luxurious rooms, and a stunning rooftop bar with panoramic views of Bangkok.'
    },
    {
      userId: 1,
      name: 'The Siam Hotel',
      lat: '13.761400',
      lng: '100.509300',
      address: '3/2 Thanon Khao, Vachirapayabal, Dusit, Bangkok 10300',
      province: 'Bangkok',
      district: 'Dusit',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'The Siam Hotel offers an elegant retreat with luxurious suites, free Wi-Fi, and a riverside infinity pool.'
    },
    {
      userId: 1,
      name: 'Chatrium Hotel Riverside Bangkok',
      lat: '13.706770',
      lng: '100.510499',
      address: '28 Charoen Krung Rd, Wat Phraya Krai, Bang Kho Laem, Bangkok 10120',
      province: 'Bangkok',
      district: 'Bang Kho Laem',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Chatrium Hotel Riverside Bangkok provides spacious rooms with river views, free Wi-Fi, and a luxurious swimming pool.'
    },
    {
      userId: 1,
      name: 'Millennium Hilton Bangkok',
      lat: '13.726262',
      lng: '100.509593',
      address: '123 Charoennakorn Rd, Khlong Ton Sai, Khlong San, Bangkok 10600',
      province: 'Bangkok',
      district: 'Khlong San',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Millennium Hilton Bangkok offers elegant rooms, free Wi-Fi, and an infinity pool with panoramic views of the city.'
    },
    {
      userId: 1,
      name: 'AVANI Riverside Bangkok Hotel',
      lat: '13.701800',
      lng: '100.507222',
      address: '257 Charoennakorn Rd, Thon Buri, Bangkok 10600',
      province: 'Bangkok',
      district: 'Thon Buri',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'AVANI Riverside Bangkok Hotel offers modern accommodations with stunning river views, free Wi-Fi, and a rooftop infinity pool.'
    },
    {
      userId: 1,
      name: 'Bangkok Marriott Hotel The Surawongse',
      lat: '13.725051',
      lng: '100.525932',
      address: '262 Surawong Rd, Si Phraya, Bang Rak, Bangkok 10500',
      province: 'Bangkok',
      district: 'Bang Rak',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Bangkok Marriott Hotel The Surawongse provides luxurious rooms, free Wi-Fi, and a rooftop infinity pool with city views.'
    },
    {
      userId: 2,
      name: 'Pathumwan Princess Hotel',
      lat: '13.746372',
      lng: '100.529728',
      address: '444 MBK Center, Phayathai Rd, Wang Mai, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Pathumwan Princess Hotel offers luxurious accommodations, free Wi-Fi, and a beautiful rooftop pool in the heart of Bangkok.'
    },
    {
      userId: 2,
      name: 'Siam Kempinski Hotel Bangkok',
      lat: '13.746665',
      lng: '100.534456',
      address: '991/9 Rama I Rd, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Siam Kempinski Hotel Bangkok features elegant rooms, free Wi-Fi, and multiple swimming pools in a lush garden setting.'
    },
    {
      userId: 2,
      name: 'Centara Grand at CentralWorld',
      lat: '13.746056',
      lng: '100.539306',
      address: '999/99 Rama I Rd, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Centara Grand at CentralWorld offers luxurious accommodations, free Wi-Fi, and a stunning rooftop bar with panoramic views.'
    },
    {
      userId: 2,
      name: 'InterContinental Bangkok',
      lat: '13.744696',
      lng: '100.540410',
      address: '973 Ploenchit Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'InterContinental Bangkok features elegant rooms, free Wi-Fi, and a rooftop pool with city views in a prime location.'
    },
    {
      userId: 2,
      name: 'Anantara Siam Bangkok Hotel',
      lat: '13.742700',
      lng: '100.542700',
      address: '155 Ratchadamri Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Anantara Siam Bangkok Hotel offers luxurious accommodations, free Wi-Fi, and a beautiful outdoor pool in a lush garden setting.'
    },
    {
      userId: 2,
      name: 'Renaissance Bangkok Ratchaprasong Hotel',
      lat: '13.743332',
      lng: '100.541153',
      address: '518/8 Ploenchit Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Renaissance Bangkok Ratchaprasong Hotel features modern accommodations, free Wi-Fi, and a stunning rooftop pool with city views.'
    },
    {
      userId: 2,
      name: 'Grand Hyatt Erawan Bangkok',
      lat: '13.744146',
      lng: '100.540680',
      address: '494 Rajdamri Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Grand Hyatt Erawan Bangkok offers luxurious accommodations, free Wi-Fi, and a beautiful rooftop pool in a prime location.'
    },
    {
      userId: 2,
      name: 'The St. Regis Bangkok',
      lat: '13.740917',
      lng: '100.542039',
      address: '159 Rajadamri Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'The St. Regis Bangkok features elegant rooms, free Wi-Fi, and a stunning rooftop pool with panoramic views of the city.'
    },
    {
      userId: 2,
      name: 'Banyan Tree Bangkok',
      lat: '13.723512',
      lng: '100.539410',
      address: '21/100 South Sathon Rd, Sathon, Bangkok 10120',
      province: 'Bangkok',
      district: 'Sathon',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Banyan Tree Bangkok offers luxurious accommodations, free Wi-Fi, and a stunning rooftop bar with panoramic views of the city.'
    },
    {
      userId: 2,
      name: 'SO/ Bangkok',
      lat: '13.728408',
      lng: '100.541255',
      address: '2 North Sathorn Rd, Bang Rak, Bangkok 10500',
      province: 'Bangkok',
      district: 'Bang Rak',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'SO/ Bangkok features modern accommodations, free Wi-Fi, and a beautiful rooftop pool with city views.'
    },
    {
      userId: 2,
      name: 'The Okura Prestige Bangkok',
      lat: '13.742506',
      lng: '100.548333',
      address: 'Park Venture Ecoplex, 57 Wireless Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'The Okura Prestige Bangkok offers luxurious accommodations, free Wi-Fi, and a stunning infinity pool with panoramic views.'
    },
    {
      userId: 2,
      name: 'Park Hyatt Bangkok',
      lat: '13.743667',
      lng: '100.548287',
      address: 'Central Embassy, 88 Wireless Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Park Hyatt Bangkok features elegant rooms, free Wi-Fi, and a beautiful infinity pool with city views.'
    },
    {
      userId: 2,
      name: 'Hotel Muse Bangkok Langsuan',
      lat: '13.740328',
      lng: '100.543944',
      address: '55/555 Langsuan Rd, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Hotel Muse Bangkok Langsuan offers stylish accommodations, free Wi-Fi, and a rooftop bar with panoramic city views.'
    },
    {
      userId: 2,
      name: 'Sindhorn Kempinski Hotel Bangkok',
      lat: '13.740830',
      lng: '100.548527',
      address: '80 Soi Tonson, Lumphini, Pathum Wan, Bangkok 10330',
      province: 'Bangkok',
      district: 'Pathum Wan',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Sindhorn Kempinski Hotel Bangkok features luxurious rooms, free Wi-Fi, and a beautiful outdoor pool.'
    },
    {
      userId: 2,
      name: 'JW Marriott Hotel Bangkok',
      lat: '13.741789',
      lng: '100.551674',
      address: '4 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
      province: 'Bangkok',
      district: 'Khlong Toei',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'JW Marriott Hotel Bangkok offers elegant accommodations, free Wi-Fi, and a stunning rooftop pool with city views.'
    },
    {
      userId: 3,
      name: 'Hotel 3-1',
      lat: '13.752132',
      lng: '100.532410',
      address: 'Address for Hotel 3-1',
      province: 'Bangkok',
      district: 'District for Hotel 3-1',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-1. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-2',
      lat: '13.753234',
      lng: '100.533124',
      address: 'Address for Hotel 3-2',
      province: 'Bangkok',
      district: 'District for Hotel 3-2',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-2. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-3',
      lat: '13.754345',
      lng: '100.534678',
      address: 'Address for Hotel 3-3',
      province: 'Bangkok',
      district: 'District for Hotel 3-3',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-3. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-4',
      lat: '13.755456',
      lng: '100.535789',
      address: 'Address for Hotel 3-4',
      province: 'Bangkok',
      district: 'District for Hotel 3-4',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-4. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-5',
      lat: '13.756567',
      lng: '100.536890',
      address: 'Address for Hotel 3-5',
      province: 'Bangkok',
      district: 'District for Hotel 3-5',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-5. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-6',
      lat: '13.757678',
      lng: '100.537901',
      address: 'Address for Hotel 3-6',
      province: 'Bangkok',
      district: 'District for Hotel 3-6',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-6. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-7',
      lat: '13.758789',
      lng: '100.538912',
      address: 'Address for Hotel 3-7',
      province: 'Bangkok',
      district: 'District for Hotel 3-7',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-7. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-8',
      lat: '13.759890',
      lng: '100.539923',
      address: 'Address for Hotel 3-8',
      province: 'Bangkok',
      district: 'District for Hotel 3-8',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-8. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-9',
      lat: '13.760901',
      lng: '100.540934',
      address: 'Address for Hotel 3-9',
      province: 'Bangkok',
      district: 'District for Hotel 3-9',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-9. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-10',
      lat: '13.761012',
      lng: '100.541945',
      address: 'Address for Hotel 3-10',
      province: 'Bangkok',
      district: 'District for Hotel 3-10',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-10. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-11',
      lat: '13.762123',
      lng: '100.542956',
      address: 'Address for Hotel 3-11',
      province: 'Bangkok',
      district: 'District for Hotel 3-11',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-11. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-12',
      lat: '13.763234',
      lng: '100.543967',
      address: 'Address for Hotel 3-12',
      province: 'Bangkok',
      district: 'District for Hotel 3-12',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-12. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-13',
      lat: '13.764345',
      lng: '100.544978',
      address: 'Address for Hotel 3-13',
      province: 'Bangkok',
      district: 'District for Hotel 3-13',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-13. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-14',
      lat: '13.765456',
      lng: '100.545989',
      address: 'Address for Hotel 3-14',
      province: 'Bangkok',
      district: 'District for Hotel 3-14',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-14. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 3,
      name: 'Hotel 3-15',
      lat: '13.766567',
      lng: '100.546990',
      address: 'Address for Hotel 3-15',
      province: 'Bangkok',
      district: 'District for Hotel 3-15',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 3-15. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-1',
      lat: '13.756471171375054',
      lng: '100.5294166815296',
      address: 'Address for Hotel 4-1',
      province: 'Bangkok',
      district: 'District for Hotel 4-1',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-1. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-2',
      lat: '13.746129972237023',
      lng: '100.54259132407029',
      address: 'Address for Hotel 4-2',
      province: 'Bangkok',
      district: 'District for Hotel 4-2',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-2. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-3',
      lat: '13.747635870097733',
      lng: '100.5331459955181',
      address: 'Address for Hotel 4-3',
      province: 'Bangkok',
      district: 'District for Hotel 4-3',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-3. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-4',
      lat: '13.747703453580794',
      lng: '100.53753252860974',
      address: 'Address for Hotel 4-4',
      province: 'Bangkok',
      district: 'District for Hotel 4-4',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-4. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-5',
      lat: '13.761924757341164',
      lng: '100.54146313753941',
      address: 'Address for Hotel 4-5',
      province: 'Bangkok',
      district: 'District for Hotel 4-5',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-5. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-6',
      lat: '13.756254460069542',
      lng: '100.54422438054239',
      address: 'Address for Hotel 4-6',
      province: 'Bangkok',
      district: 'District for Hotel 4-6',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-6. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-7',
      lat: '13.75506347349395',
      lng: '100.54747481620663',
      address: 'Address for Hotel 4-7',
      province: 'Bangkok',
      district: 'District for Hotel 4-7',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-7. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-8',
      lat: '13.76265627807537',
      lng: '100.54490356874794',
      address: 'Address for Hotel 4-8',
      province: 'Bangkok',
      district: 'District for Hotel 4-8',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-8. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-9',
      lat: '13.765595422788397',
      lng: '100.54974178062548',
      address: 'Address for Hotel 4-9',
      province: 'Bangkok',
      district: 'District for Hotel 4-9',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-9. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-10',
      lat: '13.76183966240651',
      lng: '100.53658574195609',
      address: 'Address for Hotel 4-10',
      province: 'Bangkok',
      district: 'District for Hotel 4-10',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-10. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-11',
      lat: '13.759939352452578',
      lng: '100.54378764891051',
      address: 'Address for Hotel 4-11',
      province: 'Bangkok',
      district: 'District for Hotel 4-11',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-11. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-12',
      lat: '13.762339133061621',
      lng: '100.53400395724852',
      address: 'Address for Hotel 4-12',
      province: 'Bangkok',
      district: 'District for Hotel 4-12',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-12. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-13',
      lat: '13.76574623580688',
      lng: '100.54196452931474',
      address: 'Address for Hotel 4-13',
      province: 'Bangkok',
      district: 'District for Hotel 4-13',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-13. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-14',
      lat: '13.757081854636553',
      lng: '100.54488187289665',
      address: 'Address for Hotel 4-14',
      province: 'Bangkok',
      district: 'District for Hotel 4-14',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-14. Enjoy luxurious amenities including free Wi-Fi and parking.'
    },
    {
      userId: 4,
      name: 'Hotel 4-15',
      lat: '13.772422533330793',
      lng: '100.5552560229775',
      address: 'Address for Hotel 4-15',
      province: 'Bangkok',
      district: 'District for Hotel 4-15',
      type: 'HOTEL',
      status: 'ACTIVE',
      description: 'Description for Hotel 4-15. Enjoy luxurious amenities including free Wi-Fi and parking.'
    }
  ]

const accomPhotoSeeding = [
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622061/accomAlbumSeed/accomUser1/sukosol/abnqeo1ryisrzriv24le.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622063/accomAlbumSeed/accomUser1/sukosol/apaveshlb3l3qaoabhni.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/bv2p38yr16in8fflyfkk.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622064/accomAlbumSeed/accomUser1/sukosol/c4vt6vm3dfqjt8onpzzn.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622059/accomAlbumSeed/accomUser1/sukosol/dbpz8lpy3spanmn0zlil.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622063/accomAlbumSeed/accomUser1/sukosol/e7ol1yzn4k97ad6qyuml.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622060/accomAlbumSeed/accomUser1/sukosol/efyyxxujs58gjudkgo7l.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622064/accomAlbumSeed/accomUser1/sukosol/epclveoe3dywawizanbo.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622062/accomAlbumSeed/accomUser1/sukosol/ev0hhgago6rferigizsy.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622067/accomAlbumSeed/accomUser1/sukosol/fsgyhwqyg1cxc1rvxkuo.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622068/accomAlbumSeed/accomUser1/sukosol/hnooik6oibe7pbwur1ir.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622067/accomAlbumSeed/accomUser1/sukosol/ieha0tvhznjgugady9my.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622068/accomAlbumSeed/accomUser1/sukosol/iprkfuexzeaanpaywnek.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622062/accomAlbumSeed/accomUser1/sukosol/keggxeespkq8tlg7otlj.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/ljwonjqadbilkvke6ny9.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622060/accomAlbumSeed/accomUser1/sukosol/lqjvvx52uwzs9ov35dhy.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622068/accomAlbumSeed/accomUser1/sukosol/me7kr45bae4uvxrgykte.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622061/accomAlbumSeed/accomUser1/sukosol/miasxtxaprbz1afv7olm.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622065/accomAlbumSeed/accomUser1/sukosol/ne1c3esa65ldxkm4i6xb.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622064/accomAlbumSeed/accomUser1/sukosol/nljpi84hneg166ah24ed.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622060/accomAlbumSeed/accomUser1/sukosol/ocf4pr6d5vairceyp5op.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622065/accomAlbumSeed/accomUser1/sukosol/of5cpri8jw9hu0lpipx8.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622067/accomAlbumSeed/accomUser1/sukosol/ombcn2ai1v3wlwvpxmqq.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622067/accomAlbumSeed/accomUser1/sukosol/otmgra22fscdkt8bp6pp.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/pabbe8n91hifswv40hh4.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622058/accomAlbumSeed/accomUser1/sukosol/phywvbcnbqkki8rb2y5y.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622065/accomAlbumSeed/accomUser1/sukosol/pie1jecoxozsn1o2yla4.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622064/accomAlbumSeed/accomUser1/sukosol/pysmbkwieschj7drmieq.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/qoh7w6ysq5caalu00tzw.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622060/accomAlbumSeed/accomUser1/sukosol/raevma6pbuys8xfpkzxt.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622059/accomAlbumSeed/accomUser1/sukosol/s1xuhx8605sdikf6mhai.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622059/accomAlbumSeed/accomUser1/sukosol/t4s3af4qif12v3vfdltv.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622061/accomAlbumSeed/accomUser1/sukosol/t5ynzxoo3kk1mklorll3.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622060/accomAlbumSeed/accomUser1/sukosol/thmbtwgz3yqyz72newuq.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622068/accomAlbumSeed/accomUser1/sukosol/tnjwuusqmucq8ectd8un.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622063/accomAlbumSeed/accomUser1/sukosol/txzrj6wekyq9a1kwfxuz.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/u0n9yuf2jqivurhskrei.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622069/accomAlbumSeed/accomUser1/sukosol/u0t1cwptczsyxpgzsaf3.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622066/accomAlbumSeed/accomUser1/sukosol/uljhxudd8dhi7rdkckjf.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622058/accomAlbumSeed/accomUser1/sukosol/vhloz9k60cixmnwzynvt.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622062/accomAlbumSeed/accomUser1/sukosol/vhp8loxq4bbpneodxk2a.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622059/accomAlbumSeed/accomUser1/sukosol/vvypnbiewwu9rnq9oxgt.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622063/accomAlbumSeed/accomUser1/sukosol/vxddastfsxeggxcnsaer.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622065/accomAlbumSeed/accomUser1/sukosol/wpppffcgoidtpoutuv7w.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622061/accomAlbumSeed/accomUser1/sukosol/xfee80ps9biq6vblbhgv.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622064/accomAlbumSeed/accomUser1/sukosol/xgco49scagp2lqehxpqt.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622061/accomAlbumSeed/accomUser1/sukosol/xmilorauzm4kzqk0tu0v.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622059/accomAlbumSeed/accomUser1/sukosol/xujzxt02bojpe1c5lln0.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622067/accomAlbumSeed/accomUser1/sukosol/y4nhn7nerbssxpyf8ef2.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622062/accomAlbumSeed/accomUser1/sukosol/yjxugkg0gtpo4qcifqly.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622068/accomAlbumSeed/accomUser1/sukosol/zovdi8tiwv0srfgnkds9.jpg",
        accomId: 1,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622070/accomAlbumSeed/accomUser1/pullman/anjvbzeqcb6uf1orepac.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622071/accomAlbumSeed/accomUser1/pullman/arxznvc5sygtxxy4hvje.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622070/accomAlbumSeed/accomUser1/pullman/ba6749g6mopzn0xkqawf.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622070/accomAlbumSeed/accomUser1/pullman/eevig3r5rds5tk1cbtmv.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622070/accomAlbumSeed/accomUser1/pullman/fg7qsgsltg1tm8wvqeas.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622072/accomAlbumSeed/accomUser1/pullman/hfsbsfjowelpnmqerlwr.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622070/accomAlbumSeed/accomUser1/pullman/qos90y73twts5bytgzet.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622071/accomAlbumSeed/accomUser1/pullman/snyplqqguaywthgp1env.jpg",
        accomId: 2,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622077/accomAlbumSeed/accomUser1/the%20berkley/bkcivo5xqmo5frvyu6js.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622083/accomAlbumSeed/accomUser1/the%20berkley/bxe4ycwxy49sg1eok8e5.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622083/accomAlbumSeed/accomUser1/the%20berkley/dxq9rp5dz9xzscdwl8xo.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622076/accomAlbumSeed/accomUser1/the%20berkley/jr6dg6hzbv7nncwnzfkg.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622076/accomAlbumSeed/accomUser1/the%20berkley/kgdrlr51ypnw0zrbpkbq.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622078/accomAlbumSeed/accomUser1/the%20berkley/nav0uftlqjwvjv2vkqun.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622084/accomAlbumSeed/accomUser1/the%20berkley/ndcgyzi7lubd6vgmm32f.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622077/accomAlbumSeed/accomUser1/the%20berkley/nerwaubrqegaadexl4r7.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622082/accomAlbumSeed/accomUser1/the%20berkley/p1s9jpsl5tnbltqrxed3.webp",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622077/accomAlbumSeed/accomUser1/the%20berkley/pxdth9onqec55vwvdkqr.jpg",
        accomId: 3,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622267/accomAlbumSeed/accomUser1/amari/dri9dsz5mv165olxqzc6.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622266/accomAlbumSeed/accomUser1/amari/e2o7onivjkvfckk4jwiu.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622267/accomAlbumSeed/accomUser1/amari/h1samneb9inv3a2wbktv.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622268/accomAlbumSeed/accomUser1/amari/kjoqer9oe5nfn6scz6uf.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622266/accomAlbumSeed/accomUser1/amari/ky8yedq1kwwirkmlklz8.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622266/accomAlbumSeed/accomUser1/amari/mmjoex33aalcrny7ttjf.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622266/accomAlbumSeed/accomUser1/amari/ol06bpmtkggdkotmc8wb.webp",
        accomId: 4,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622267/accomAlbumSeed/accomUser1/amari/vx8rkl3n9ozz3iyj41zx.webp",
        accomId: 4,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622079/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/b30rdar5sukrgdnx3xwu.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622080/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/fd4odsgxe3qqcr5zfp40.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622079/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/fqtbbhh780fqm5wvupzw.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622079/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/hdoiswvvknhobaga3nub.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622079/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/mdk6xrxxn8ceu7mdbp8l.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622079/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/plok6xxlg9fwbaf2gowq.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622080/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/qownqnl9gwyto0fip8mj.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622080/accomAlbumSeed/accomUser1/Novotel%20Bangkok%20Platinum%20Pratunam/yurbw7an7ipeiitmk72o.jpg",
        accomId: 5,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622089/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/a5rdwv1ysrdpbnzthyiw.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622276/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/cyzjgjy8wkpqu2vrh9fh.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622275/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/d0o8tttfv853yblcq7ny.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622090/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/d79olxenkr1qwepsjlev.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622090/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/f4mmfvbznavudl3es8rm.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622275/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/h4g0cayiaackzpdee57v.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622276/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/hkzvfkaupc4zn2vh1pxo.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622089/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/hmkvljb7oiqk2zafuhzj.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622088/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/hoyqlxbme4n7av28qprv.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622090/accomAlbumSeed/accomUser1/The%20Quarter%20Hualamphong/juvmy2jvbl2xkmfepiqe.jpg",
        accomId: 6,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622086/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/cvrhxfmvfshmf9yah9va.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622086/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/d5q18v7lwrricdbqy856.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622096/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/dcahnmp3n6he5bzohzfi.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622087/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/fm1rzsdneoe5f0ubjluh.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622096/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/gwgh2kgebfhoya9gkkay.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622095/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/hp6tcjy7xrfwofa2jlfd.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622087/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/kjcyfabroohqdz3vkzjx.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622086/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/p3w4et6kltle7qlp8use.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622086/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/tb7i0rkc325g1zkwd03e.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622096/accomAlbumSeed/accomUser1/Mandarin%20Hotel%20Managed%20by%20Centre%20Point/v0qvntw4j2twwhnoh0wv.jpg",
        accomId: 7,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622292/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/fkulnzxkepfemklcvfmi.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622291/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/kddnmtaaexanb81z13gs.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622290/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/nifdtyk9szzgup2ktrhp.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622291/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/nzec91cczkv1jcouxlqm.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622292/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/tuixukpwpsdnkkjreax8.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622291/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/wovgsrwwrd7u14zznyfe.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622291/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/xeksep7ioy8ymknlunwf.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622291/accomAlbumSeed/accomUser1/Eastin%20Grand%20Hotel%20Sathorn%20Bangkok/xvk57b00q2qq4thjdzi4.jpg",
        accomId: 8,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/aqjvkfek9maj2zdjz1k4.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/attj0dnc4d2imi7whxp3.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/btygrsejjdw8myglbdc2.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/fgelcxmufsnw747srijf.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/hb21qchnl6njl0x1oq3t.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/ixqrqoaiaazwuxpwlpqx.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622296/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/mo8ktaetvg2efiuytvih.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622295/accomAlbumSeed/accomUser1/Shangri-La%20Hotel%2C%20Bangkok/s7mkkncepuik2tyb0skx.jpg",
        accomId: 9,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622101/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/ceo8qe14sukgfngoj5sd.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622104/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/cl99i43ifoywmh1fry9z.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622093/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/enxibbmgbbzclpofyq4f.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622099/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/eyrtjacyb1csyczatb1v.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622104/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/f7gzvpvewmne3vmr8fc4.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622106/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/fa5m74x5hcn6ppy1hm7x.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622100/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/fdz04imjk4qrggoeriml.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622104/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/fox6vonxvfdivkdykqri.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622099/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/gf4ukmjqufjo2jpx1tu7.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622107/accomAlbumSeed/accomUser1/Lebua%20at%20State%20Tower/gorgtsgrwqyubxi3lgrp.jpg",
        accomId: 10,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622308/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/b01z6mwk3hl6ikexnrtq.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622308/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/fgmzbmewlolkugb3mdvb.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622307/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/fmsx4knaovozgvjxht7z.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622306/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/idjucykgvkiomw7ivfme.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622306/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/kpvtlsxn8lqpuu6a6x4l.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622307/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/krpikw0m1lzvhfbwkixj.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622307/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/oofget5nkjj5chq0wkgt.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622308/accomAlbumSeed/accomUser1/The%20Siam%20Hotel/poeeigmy7jcz5pnxn7eg.jpg",
        accomId: 11,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622316/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/brqsdutq6avq4huqahnj.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622317/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/cmeuk6m9n6v2c6ufzs2n.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622315/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/dgwqctd9qqy5mpk587ct.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622316/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/fhsruyhy1c7dcujidet3.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622316/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/hys0zdqzqdmhjvtdkfyo.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622316/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/kbeghaohryvoilaeyzte.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622315/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/nepjwjwj8kmrsjese1oj.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622316/accomAlbumSeed/accomUser1/Chatrium%20Hotel%20Riverside%20Bangkok/svugjirgeztqptod1vuy.jpg",
        accomId: 12,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622325/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/aed6oxsedqajagb0sr8i.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622326/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/alyhgf3cxuqaosgjkbwe.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622327/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/aq80xjrorolnwy9jktaa.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622325/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/b7gorsn3wdqcf5emd06n.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622326/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/tltjsphl6syrp62izyeb.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622325/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/vp8eu7xs8auzethcz1qa.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622327/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/x42c5thwtkalfvr0imel.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622326/accomAlbumSeed/accomUser1/Millennium%20Hilton%20Bangkok/zfuezo0sxp1zp9c4kxji.jpg",
        accomId: 13,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622111/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/helakbeixrpbcafn8wjb.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622111/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/iplpbz2wtqttktzhf7sl.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622110/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/pkiynbvygfwknquz2oz7.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622110/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/qbro5jgwykn1g2jq7pvd.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622110/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/rxt797de3iof1ebo7rxd.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622110/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/rydbx7kv4bsvvwbglqcr.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622111/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/uek42imjimryzvs7wvus.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622111/accomAlbumSeed/accomUser1/AVANI%20Riverside%20Bangkok%20Hotel/xijxvxa0idwwfrm3xcxm.jpg",
        accomId: 14,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622113/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/aedetityfidsvoivomjy.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622114/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/fb6bohjsab7akoltwori.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622113/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/h4azdjwhyranog4kk4xr.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622113/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/ilizgucuixhrqzrre3dd.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622114/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/ji92gukznq0saj5mmp2c.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622114/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/n1qjs7ciwi99dmjzeee4.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622115/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/ofbfkcbqir2tjwbtzn6e.jpg",
        accomId: 15,
    },
    {
        imagePath:
            "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720622113/accomAlbumSeed/accomUser1/Bangkok%20Marriott%20Hotel%20The%20Surawongse/sgfiagg50bhieg6o1ybz.jpg",
        accomId: 15,
    },
    {        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606034/360091946_hsarnk.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606033/188556605_sz7j2w.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606033/326162665_js4pbh.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606033/100602007_k7nn8q.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606033/251504686_a8ornz.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606033/251504432_lbzlwf.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606034/251607285_krojik.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606034/524726909_az2md2.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606321/251608904_yybvke.jpg",
        accomId: 16,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606390/524726800_wze8ws.jpg",
        accomId: 16,
    },

    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606697/469204855_hen6k1.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606697/560305208_ondmeo.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606699/560305235_ms4akt.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606698/560305214_ss9ypk.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606700/560305262_lbfirj.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606698/560305231_tfhvix.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606702/560305274_pqgvfw.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606703/560305310_zwv7mg.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606702/560305309_vtvvvs.jpg",
        accomId: 17,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720606872/560305312_ydiglj.jpg",
        accomId: 17,
    },

    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607159/358070452_ovql5x.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607170/562223242_l8ne8u.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607170/555393586_ujyavj.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607160/367661353_m7td9m.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607161/367661442_bvpixt.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607162/367661448_cyzno2.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607164/367662891_wca2m4.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607165/367663481_mbb2od.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607167/537404693_zh6ize.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607169/540581950_fiihrv.jpg",
        accomId: 18,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607674/575951589_r1l5vi.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607675/575952285_fgoesv.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607663/463196370_cmsrdb.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607663/463196494_jtp3iy.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607663/467157796_nfp9g5.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607667/475057397_nnrpov.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607668/477176181_jlaqft.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607671/484727854_wptk2b.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607670/480970838_z7nnor.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720607665/467213511_omaekc.jpg",
        accomId: 19,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608167/567165586_kbo4vo.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608156/103733468_igswbf.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608157/105199076_q8gxvk.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608160/184823024_ct1kg1.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608159/105294272_kb07nd.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608164/200718858_x9f6jb.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608154/66171579_yydxzd.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608154/63355910_mca9ol.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608162/199604945_y0qiuj.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720608166/447244406_n3giem.jpg",
        accomId: 20,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609192/519527125_eqan5m.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609194/519527137_rn1xz6.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609185/504602640_tyhira.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609184/483889252_b9myyz.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609182/483887532_runora.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609178/483871030_zu4nny.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609179/483885339_t0yqgc.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609178/483871040_zvecxa.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609189/519521038_rgkund.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609187/519520702_m9yopy.jpg",
        accomId: 21,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609821/578743790_akqfkr.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609820/578743783_hpzijl.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609821/578743796_nysx2u.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609824/578743812_sce2cr.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609826/578743823_y35zzh.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609828/578743826_x7c24c.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609830/578743828_kd2k1w.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609833/578743830_w5f0qt.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609839/578743851_vf92fu.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720609865/578743861_sqzwka.jpg",
        accomId: 22,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610548/468510243_ggtbuq.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610549/468510255_ahhabc.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610658/468510248_xis0xp.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610741/468510260_hdcfuc.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610745/468510282_p2cnuf.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610752/522477836_bptdms.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610747/468510301_mijllk.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610750/468510324_cejw7v.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610757/539097222_wmrzif.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720610755/537376924_lf1yqj.jpg",
        accomId: 23,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611109/489164297_wkv10c.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611107/252730684_hzfanb.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611104/49261132_ardyp1.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611106/82814186_qgsao3.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611125/576739459_af6t5l.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611122/576736791_djbyej.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611119/576703283_zj0b5c.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611117/576702971_uv84wd.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611114/576701164_duzons.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611112/504142239_rcosey.jpg",
        accomId: 24,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611547/464592509_ulgb4e.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611545/456595891_k7jwsa.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611541/248239401_qavcvk.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611539/248239400_np9h9c.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611527/248239352_w0voq4.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611536/248239399_bcudwe.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611534/248239389_xrqoog.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611525/149371207_eyv4ta.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611529/248239370_xeeame.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720611531/248239386_zlxbeq.jpg",
        accomId: 25,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612221/218246445_hmccmw.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612181/482734108_fnvggi.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612173/216187216_qebtsk.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612172/129845804_nm7kzk.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612168/129844892_u9ynjs.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612166/40765844_cqmni6.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612162/13397811_swvtbe.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612159/13397766_vcm0jg.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612162/40765246_pyltjx.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612177/221394258_h5l8we.jpg",
        accomId: 26,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612989/531037618_zw6hxq.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612977/453068785_gmiwvk.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612979/453070386_aefypo.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612982/531037596_ul75ar.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612985/531037609_oiylcs.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720613006/531037649_cobfmq.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612992/531037627_c5a2ko.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612999/531037635_lrfsgl.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720613002/531037636_tfpbmn.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720612995/531037632_kjywc0.jpg",
        accomId: 27,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634076/476948768_g8hns6.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634076/305176799_gzxrbx.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634073/305176786_mh6a5i.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634073/304700002-1_gyinns.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634072/304700009_tywify.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634072/303687545_tzv53o.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634072/304700002_geqqan.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634072/10237556_acgggb.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634072/543469735_ma97e1.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634070/15607905_aaphxf.jpg",
        accomId: 28,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634405/494294982_zq5uqc.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634405/544739684_ejyhqp.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634405/395913579_vov4ld.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634405/544739687_lyztwp.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634404/395913591_uo0h1k.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634404/395913582_e6v1wu.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634405/402435046_qlwa4y.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634404/395913550_ktetzm.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634404/395913745_sduxk8.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634404/395913549_qoi7rn.jpg",
        accomId: 29,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634704/525018798_f4uit3.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634703/525017964_omoxvu.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634703/525017968_pxsxqt.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634701/514578465_xwklrj.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634700/501168932_wbtlgd.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634699/493648105_xdriuq.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634699/430862830_fqxg19.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634698/430862851_hlawkj.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634697/430862805_vpft15.jpg",
        accomId: 30,
    },
    {
        imagePath: "https://res.cloudinary.com/dtlwfpitf/image/upload/v1720634697/430862824_b85twg.jpg",
        accomId: 30,
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
        price: 7000,
    },
    {
        name: "A202",
        roomType: "Superior King Size",
        bedRoom: 3,
        bathRoom: 2,
        size: 50,
        capacity: 7,
        accomId: 1,
        price: 8800,
    },
    {
        name: "A203",
        roomType: "Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 10,
        capacity: 2,
        accomId: 1,
        price: 3200,
    },
    {
        name: "A204",
        roomType: "Double Standard",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 1,
        price: 4800,
    },
    {
        name: "801",
        roomType: "Deluxe pool",
        bedRoom: 1,
        bathRoom: 1,
        size: 80,
        capacity: 4,
        accomId: 2,
        price: 144000,
    },
    {
        name: "B102",
        roomType: "Executive Suite",
        bedRoom: 2,
        bathRoom: 2,
        size: 40,
        capacity: 4,
        accomId: 2,
        price: 10800,
    },
    {
        name: "DE 101",
        roomType: "Standard Twin Room",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 3,
        price: 72000,
    },
    {
        name: "DE 102",
        roomType: "Standard Twin Room",
        bedRoom: 1,
        bathRoom: 1,
        size: 30,
        capacity: 4,
        accomId: 3,
        price: 54000,
    },
    {
        name: "C301",
        roomType: "Family Room",
        bedRoom: 2,
        bathRoom: 1,
        size: 35,
        capacity: 5,
        accomId: 3,
        price: 7900,
    },
    {
        name: "D401",
        roomType: "Standard Single",
        bedRoom: 1,
        bathRoom: 1,
        size: 15,
        capacity: 1,
        accomId: 4,
        price: 4300,
    },
    {
        name: "D402",
        roomType: "Executive Deluxe",
        bedRoom: 2,
        bathRoom: 2,
        size: 30,
        capacity: 4,
        accomId: 4,
        price: 10000,
    },
    {
        name: "E501",
        roomType: "Luxury Suite",
        bedRoom: 3,
        bathRoom: 3,
        size: 60,
        capacity: 6,
        accomId: 5,
        price: 14400,
    },
    {
        name: "E502",
        roomType: "Penthouse",
        bedRoom: 4,
        bathRoom: 4,
        size: 80,
        capacity: 8,
        accomId: 5,
        price: 21600,
    },
    {
        name: "E503",
        roomType: "VIP Suite",
        bedRoom: 2,
        bathRoom: 2,
        size: 40,
        capacity: 4,
        accomId: 5,
        price: 12600,
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
    {
        id: "240614000273",
        checkInDate: new Date("Fri Jun 15 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 17 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 14 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Doe",
        customerEmail: "John@mail.com",
        customerPhone: "0112345671",
        userId: 1,
      },
      {
        id: "240615000148",
        checkInDate: new Date("Fri Jun 16 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 18 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 2,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 15 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Dim",
        customerEmail: "john12@mail.com",
        customerPhone: "0123456712",
        userId: 2,
      },
      {
        id: "240616000149",
        checkInDate: new Date("Fri Jun 17 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 19 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 3,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 16 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Jack Die",
        customerEmail: "Jack@mail.com",
        customerPhone: "0112345673",
        userId: 3,
      },
      {
        id: "240617000150",
        checkInDate: new Date("Fri Jun 18 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 20 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 4,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 17 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Abby Brown",
        customerEmail: "abbie@mail.com",
        customerPhone: "0112345121",
        userId: 4,
      },
      {
        id: "240618000151",
        checkInDate: new Date("Fri Jun 19 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 21 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 18 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Bobby Carter",
        customerEmail: "Bob@mail.com",
        customerPhone: "0112341271",
        userId: 5,
      },
      {
        id: "240619000152",
        checkInDate: new Date("Fri Jun 20 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 22 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 2,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 19 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Catherine Carline",
        customerEmail: "cathy@mail.com",
        customerPhone: "0112121271",
        userId: 6,
      },
      {
        id: "240620000153",
        checkInDate: new Date("Fri Jun 21 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 23 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 3,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 20 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Dimon Long",
        customerEmail: "Dim@mail.com",
        customerPhone: "0258341271",
        userId: 7,
      },
      {
        id: "240621000154",
        checkInDate: new Date("Fri Jun 22 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 24 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 4,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 21 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Doe",
        customerEmail: "John@mail.com",
        customerPhone: "0112345671",
        userId: null,
      },
      {
        id: "240622000155",
        checkInDate: new Date("Fri Jun 23 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 25 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 1,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 22 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "John Dim",
        customerEmail: "john12@mail.com",
        customerPhone: "0123456712",
        userId: 2,
      },
      {
        id: "240623000156",
        checkInDate: new Date("Fri Jun 24 2024 00:00:00 GMT+0700 (Indochina Time)"),
        checkOutDate: new Date("Fri Jun 26 2024 00:00:00 GMT+0700 (Indochina Time)"),
        roomId: 2,
        status: "CHECKIN",
        customerAmount: 2,
        bookingDate: new Date("Fri Jun 23 2024 00:54:43 GMT+0700 (Indochina Time)"),
        customerName: "Jack Die",
        customerEmail: "Jack@mail.com",
        customerPhone: "0112345673",
        userId: 3,
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
    {
        reservationId: "240614000273",
        comment: "Amazing experience, highly recommended!",
        ratingType1: 5,
        ratingType2: 5,
        ratingType3: 5,
        ratingType4: 5,
        reviewDate: "2024-07-01T07:54:43.000Z",
      },
      {
        reservationId: "240615000148",
        comment: "Great facilities and excellent location.",
        ratingType1: 4,
        ratingType2: 5,
        ratingType3: 4,
        ratingType4: 4,
        reviewDate: "2024-07-02T07:54:43.000Z",
      },
      {
        reservationId: "240616000149",
        comment: "Clean and comfortable, perfect for a short stay.",
        ratingType1: 5,
        ratingType2: 4,
        ratingType3: 5,
        ratingType4: 4,
        reviewDate: "2024-07-03T07:54:43.000Z",
      },
      {
        reservationId: "240617000150",
        comment: "Friendly staff and good service overall.",
        ratingType1: 4,
        ratingType2: 4,
        ratingType3: 4,
        ratingType4: 3,
        reviewDate: "2024-07-04T07:54:43.000Z",
      },
      {
        reservationId: "240618000151",
        comment: "Nice amenities and decent pricing.",
        ratingType1: 4,
        ratingType2: 4,
        ratingType3: 3,
        ratingType4: 4,
        reviewDate: "2024-07-05T07:54:43.000Z",
      },
      {
        reservationId: "240619000152",
        comment: "Good value for money, would stay again.",
        ratingType1: 4,
        ratingType2: 3,
        ratingType3: 4,
        ratingType4: 3,
        reviewDate: "2024-07-06T07:54:43.000Z",
      },
      {
        reservationId: "240620000153",
        comment: "Excellent service and very clean rooms.",
        ratingType1: 5,
        ratingType2: 4,
        ratingType3: 5,
        ratingType4: 4,
        reviewDate: "2024-07-07T07:54:43.000Z",
      },
      {
        reservationId: "240621000154",
        comment: "Lovely atmosphere and convenient location.",
        ratingType1: 4,
        ratingType2: 5,
        ratingType3: 4,
        ratingType4: 4,
        reviewDate: "2024-07-08T07:54:43.000Z",
      },
      {
        reservationId: "240622000155",
        comment: "Spacious rooms and good customer service.",
        ratingType1: 4,
        ratingType2: 4,
        ratingType3: 4,
        ratingType4: 3,
        reviewDate: "2024-07-09T07:54:43.000Z",
      },
      {
        reservationId: "240623000156",
        comment: "Helpful staff and pleasant stay overall.",
        ratingType1: 3,
        ratingType2: 4,
        ratingType3: 3,
        ratingType4: 3,
        reviewDate: "2024-07-10T07:54:43.000Z",
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
      reservationId: "240614000273",
      netPrice: 15498,
      serviceFee: 1498,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240615000148",
      netPrice: 19483.20,
      serviceFee: 1883.20,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240616000149",
      netPrice: 7084.80,
      serviceFee: 684.80,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240617000150",
      netPrice: 10627.20,
      serviceFee: 1027.20,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240618000151",
      netPrice: 15498,
      serviceFee: 1498,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240619000152",
      netPrice: 19483.20,
      serviceFee: 1883.20,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240620000153",
      netPrice: 7084.80,
      serviceFee: 684.80,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240621000154",
      netPrice: 10627.20,
      serviceFee: 1027.20,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240622000155",
      netPrice: 15498,
      serviceFee: 1498,
    },
    {
      feeId: 1,
      status: "SUCCESS",
      reservationId: "240623000156",
      netPrice: 19483.20,
      serviceFee: 1883.20,
    },
  ];

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
        id: "ChIJf1YJeC-Z4jARNNLn8M9QwMw",
        lat: "13.7477183",
        lng: "100.5387477",
        name: "Centara Grand & Bangkok Convention Centre at centralwOrld",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "bar",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJk3JVBLae4jARnD9sNUVBPT8",
        lat: "13.7579776",
        lng: "100.5362369",
        name: "The Sukosol Hotel, Bangkok",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "bar",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJiZQjqBiZ4jARc2JnvJpcX8k",
        lat: "13.7397422",
        lng: "100.5112252",
        name: "Shanghai Mansion Bangkok",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "bar",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJk3JVBLae4jARnD9sNUVBPT8",
        lat: "13.7579776",
        lng: "100.5362369",
        name: "The Sukosol Hotel, Bangkok",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "cafe",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ6xUeqtCe4jARho4Sb1lkJqc",
        lat: "13.7402135",
        lng: "100.5409369",
        name: "Hansar Bangkok Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "cafe",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJHWUWJQqZ4jARAtfHR_Zqabs",
        lat: "13.7548",
        lng: "100.4865068",
        name: "Baan Wang Lang Riverside",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "cafe",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJe8EBIdSY4jARn4itthciFLQ",
        lat: "13.7259483",
        lng: "100.5179672",
        name: "Ma Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "bakery",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJ0QDC8BOZ4jARY7WqIrAOkck",
        lat: "13.7541542",
        lng: "100.501137",
        name: "Mont NomSod",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        type: "bakery",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJw-rVT1Ke4jAR5fpXHIGROjA",
        lat: "13.7337038",
        lng: "100.5813601",
        name: "After You Dessert Cafe",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        type: "bakery",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJiZQjqBiZ4jARc2JnvJpcX8k",
        lat: "13.7397422",
        lng: "100.5112252",
        name: "Shanghai Mansion Bangkok",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "night_club",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJl7VMGOae4jART2WWLs0Pv0Q",
        lat: "13.7441335",
        lng: "100.5566097",
        name: "Levels Club",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        type: "night_club",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJe69KCn2d4jARQGtJsDPsidg",
        lat: "13.8164229",
        lng: "100.6221901",
        name: "Karaoke City",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/bar-71.png",
        type: "night_club",
        iconBgClr: "#FF9E67",
    },
    {
        id: "ChIJ-WOptA2Z4jARRFoeZFcz_Gk",
        lat: "13.7558693",
        lng: "100.4932804",
        name: "Sanam Luang",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
        type: "park",
        iconBgClr: "#4DB546",
    },
    {
        id: "ChIJt9HTSwKf4jARsDoLPbMAAQ8",
        lat: "13.7313966",
        lng: "100.56793",
        name: "Benchasiri Park",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png",
        type: "park",
        iconBgClr: "#4DB546",
    },
    {
        id: "ChIJN1kUQ1yc4jARjpGEPYyF0S0",
        lat: "13.8095512",
        lng: "100.5549011",
        name: "Bangkok Butterfly Garden and Insectarium",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png",
        type: "park",
        iconBgClr: "#13B5C7",
    },
    {
        id: "ChIJFaLTtdKe4jARdKflx49LvdA",
        lat: "13.7431972",
        lng: "100.5301387",
        name: "Pathumwan Princess Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "restaurant",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJf1YJeC-Z4jARNNLn8M9QwMw",
        lat: "13.7477183",
        lng: "100.5387477",
        name: "Centara Grand & Bangkok Convention Centre at centralwOrld",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "restaurant",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJP83yBsae4jARWiFRw2oJrJo",
        lat: "13.7513927",
        lng: "100.542261",
        name: "Centara Watergate Pavilion Hotel Bangkok",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "restaurant",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJFaLTtdKe4jARdKflx49LvdA",
        lat: "13.7431972",
        lng: "100.5301387",
        name: "Pathumwan Princess Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "shopping_mall",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJhfF-wgOf4jARwAQMPbMAAQ8",
        lat: "13.730334",
        lng: "100.568864",
        name: "Emporium",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        type: "shopping_mall",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJgUSJZM2e4jAREnHS1rSuWRk",
        lat: "13.7468291",
        lng: "100.5313447",
        name: "Siam Discovery",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        type: "shopping_mall",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJV8v0HyWg4jARQoZq__ZrXqE",
        lat: "13.6764532",
        lng: "100.5886458",
        name: "สรรพกิจ ซุปเปอร์มาร์เก็ต",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        type: "supermarket",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJEVmejamf4jARvkvJPHSVHUw",
        lat: "13.7261768",
        lng: "100.576182",
        name: "T. Thai Charoen Market",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        type: "supermarket",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJfX1dn32Y4jARiWFxON1kS08",
        lat: "13.6992116",
        lng: "100.4826157",
        name: "Big C Supercenter Dao Khanong",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
        type: "supermarket",
        iconBgClr: "#4B96F3",
    },
    {
        id: "ChIJFaLTtdKe4jARdKflx49LvdA",
        lat: "13.7431972",
        lng: "100.5301387",
        name: "Pathumwan Princess Hotel",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        type: "tourist_attraction",
        iconBgClr: "#909CE1",
    },
    {
        id: "ChIJs_0Y_hyZ4jARGh0OOUSIXJc",
        lat: "13.7388858",
        lng: "100.498546",
        name: "Phra Pokklao Bridge",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
        type: "tourist_attraction",
        iconBgClr: "#7B9EB0",
    },
    {
        id: "ChIJ1_9KLxCZ4jARNVFsNQSbq7k",
        lat: "13.7498298",
        lng: "100.4962224",
        name: "Pig Memorial",
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png",
        type: "tourist_attraction",
        iconBgClr: "#7B9EB0",
    },
]

const accomNearbyPlacesSeeding = [
    {
        distance: "1.220",
        nearbyPlaceId: "ChIJf1YJeC-Z4jARNNLn8M9QwMw",
        accomId: 1,
    },
    {
        distance: "0.398",
        nearbyPlaceId: "ChIJk3JVBLae4jARnD9sNUVBPT8",
        accomId: 1,
    },
    {
        distance: "3.009",
        nearbyPlaceId: "ChIJiZQjqBiZ4jARc2JnvJpcX8k",
        accomId: 1,
    },
    {
        distance: "0.398",
        nearbyPlaceId: "ChIJk3JVBLae4jARnD9sNUVBPT8",
        accomId: 1,
    },
    {
        distance: "2.066",
        nearbyPlaceId: "ChIJ6xUeqtCe4jARho4Sb1lkJqc",
        accomId: 1,
    },
    {
        distance: "4.994",
        nearbyPlaceId: "ChIJHWUWJQqZ4jARAtfHR_Zqabs",
        accomId: 1,
    },
    {
        distance: "3.800",
        nearbyPlaceId: "ChIJe8EBIdSY4jARn4itthciFLQ",
        accomId: 1,
    },
    {
        distance: "3.423",
        nearbyPlaceId: "ChIJ0QDC8BOZ4jARY7WqIrAOkck",
        accomId: 1,
    },
    {
        distance: "5.859",
        nearbyPlaceId: "ChIJw-rVT1Ke4jAR5fpXHIGROjA",
        accomId: 1,
    },
    {
        distance: "3.009",
        nearbyPlaceId: "ChIJiZQjqBiZ4jARc2JnvJpcX8k",
        accomId: 1,
    },
    {
        distance: "2.952",
        nearbyPlaceId: "ChIJl7VMGOae4jART2WWLs0Pv0Q",
        accomId: 1,
    },
    {
        distance: "11.709",
        nearbyPlaceId: "ChIJe69KCn2d4jARQGtJsDPsidg",
        accomId: 1,
    },
    {
        distance: "4.259",
        nearbyPlaceId: "ChIJ-WOptA2Z4jARRFoeZFcz_Gk",
        accomId: 1,
    },
    {
        distance: "4.752",
        nearbyPlaceId: "ChIJt9HTSwKf4jARsDoLPbMAAQ8",
        accomId: 1,
    },
    {
        distance: "6.318",
        nearbyPlaceId: "ChIJN1kUQ1yc4jARjpGEPYyF0S0",
        accomId: 1,
    },
    {
        distance: "1.557",
        nearbyPlaceId: "ChIJFaLTtdKe4jARdKflx49LvdA",
        accomId: 1,
    },
    {
        distance: "1.220",
        nearbyPlaceId: "ChIJf1YJeC-Z4jARNNLn8M9QwMw",
        accomId: 1,
    },
    {
        distance: "1.206",
        nearbyPlaceId: "ChIJP83yBsae4jARWiFRw2oJrJo",
        accomId: 1,
    },
    {
        distance: "1.557",
        nearbyPlaceId: "ChIJFaLTtdKe4jARdKflx49LvdA",
        accomId: 1,
    },
    {
        distance: "4.903",
        nearbyPlaceId: "ChIJhfF-wgOf4jARwAQMPbMAAQ8",
        accomId: 1,
    },
    {
        distance: "1.138",
        nearbyPlaceId: "ChIJgUSJZM2e4jAREnHS1rSuWRk",
        accomId: 1,
    },
    {
        distance: "10.803",
        nearbyPlaceId: "ChIJV8v0HyWg4jARQoZq__ZrXqE",
        accomId: 1,
    },
    {
        distance: "5.814",
        nearbyPlaceId: "ChIJEVmejamf4jARvkvJPHSVHUw",
        accomId: 1,
    },
    {
        distance: "8.398",
        nearbyPlaceId: "ChIJfX1dn32Y4jARiWFxON1kS08",
        accomId: 1,
    },
    {
        distance: "1.557",
        nearbyPlaceId: "ChIJFaLTtdKe4jARdKflx49LvdA",
        accomId: 1,
    },
    {
        distance: "4.201",
        nearbyPlaceId: "ChIJs_0Y_hyZ4jARGh0OOUSIXJc",
        accomId: 1,
    },
    {
        distance: "4.019",
        nearbyPlaceId: "ChIJ1_9KLxCZ4jARNVFsNQSbq7k",
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
