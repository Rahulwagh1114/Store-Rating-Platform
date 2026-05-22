const bcrypt = require("bcryptjs");
const sequelize = require("./config/db");

const User = require("./models/User");
const Store = require("./models/Store");

async function seedData() {
  try {
    await sequelize.sync();

    const password = await bcrypt.hash("Owner@123", 10);

    const owners = await User.bulkCreate([
      {
        name: "Amit Sharma Store Owner One",
        email: "owner1@gmail.com",
        password,
        address: "Nagpur Maharashtra India",
        role: "owner",
      },
      {
        name: "Priya Verma Store Owner Two",
        email: "owner2@gmail.com",
        password,
        address: "Pune Maharashtra India",
        role: "owner",
      },
      {
        name: "Rohit Patil Store Owner Three",
        email: "owner3@gmail.com",
        password,
        address: "Mumbai Maharashtra India",
        role: "owner",
      },
      {
        name: "Sneha Joshi Store Owner Four",
        email: "owner4@gmail.com",
        password,
        address: "Nashik Maharashtra India",
        role: "owner",
      },
      {
        name: "Karan Mehta Store Owner Five",
        email: "owner5@gmail.com",
        password,
        address: "Aurangabad Maharashtra India",
        role: "owner",
      },
      {
        name: "Riya Kapoor Normal User One",
        email: "user1@gmail.com",
        password,
        address: "Nagpur Maharashtra India",
        role: "user",
      },
      {
        name: "Sahil Khan Normal User Two",
        email: "user2@gmail.com",
        password,
        address: "Pune Maharashtra India",
        role: "user",
      },
      {
        name: "Neha Deshmukh Normal User Three",
        email: "user3@gmail.com",
        password,
        address: "Mumbai Maharashtra India",
        role: "user",
      },
      {
        name: "Vikas Gupta Normal User Four",
        email: "user4@gmail.com",
        password,
        address: "Nashik Maharashtra India",
        role: "user",
      },
      {
        name: "Pooja Kale Normal User Five",
        email: "user5@gmail.com",
        password,
        address: "Wardha Maharashtra India",
        role: "user",
      },
    ]);

    const ownerIds = owners.slice(0, 5).map((o) => o.id);

    await Store.bulkCreate([
      {
        name: "Fresh Mart Grocery",
        email: "freshmart@gmail.com",
        address: "Main Road Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
        ownerId: ownerIds[0],
      },
      {
        name: "City Care Medical",
        email: "citycare@gmail.com",
        address: "Dharampeth Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
        ownerId: ownerIds[1],
      },
      {
        name: "Style Hub Clothing",
        email: "stylehub@gmail.com",
        address: "Sitabuldi Market Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        ownerId: ownerIds[2],
      },
      {
        name: "Pizza Point Cafe",
        email: "pizzapoint@gmail.com",
        address: "Civil Lines Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
        ownerId: ownerIds[3],
      },
      {
        name: "Tech World Mobile",
        email: "techworld@gmail.com",
        address: "Sadar Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
        ownerId: ownerIds[4],
      },
      {
        name: "Daily Needs Store",
        email: "dailyneeds@gmail.com",
        address: "Manish Nagar Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800",
        ownerId: ownerIds[0],
      },
      {
        name: "Beauty Corner",
        email: "beautycorner@gmail.com",
        address: "Ramdaspeth Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800",
        ownerId: ownerIds[1],
      },
      {
        name: "Book House",
        email: "bookhouse@gmail.com",
        address: "Pratap Nagar Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
        ownerId: ownerIds[2],
      },
      {
        name: "Sports Arena",
        email: "sportsarena@gmail.com",
        address: "Wardha Road Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
        ownerId: ownerIds[3],
      },
      {
        name: "Home Decor Plus",
        email: "homedecor@gmail.com",
        address: "Mahal Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
        ownerId: ownerIds[4],
      },
      {
        name: "Green Basket Grocery",
        email: "greenbasket@gmail.com",
        address: "Hingna Road Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
        ownerId: ownerIds[0],
      },
      {
        name: "Life Line Pharmacy",
        email: "lifeline@gmail.com",
        address: "Khamla Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
        ownerId: ownerIds[1],
      },
      {
        name: "Urban Fashion Store",
        email: "urbanfashion@gmail.com",
        address: "Sitabuldi Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        ownerId: ownerIds[2],
      },
      {
        name: "Burger House Cafe",
        email: "burgerhouse@gmail.com",
        address: "Futala Lake Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
        ownerId: ownerIds[3],
      },
      {
        name: "Gadget Zone Electronics",
        email: "gadgetzone@gmail.com",
        address: "CA Road Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
        ownerId: ownerIds[4],
      },
      {
        name: "Kids Toy World",
        email: "kidstoy@gmail.com",
        address: "Jaripatka Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
        ownerId: ownerIds[0],
      },
      {
        name: "Premium Footwear Hub",
        email: "footwearhub@gmail.com",
        address: "Cotton Market Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        ownerId: ownerIds[1],
      },
      {
        name: "Furniture Gallery",
        email: "furnituregallery@gmail.com",
        address: "Besa Road Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
        ownerId: ownerIds[2],
      },
      {
        name: "Pet Care Store",
        email: "petcare@gmail.com",
        address: "Trimurti Nagar Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800",
        ownerId: ownerIds[3],
      },
      {
        name: "Jewellery Palace",
        email: "jewellerypalace@gmail.com",
        address: "Itwari Nagpur",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
        ownerId: ownerIds[4],
      },
    ]);

    console.log("Seed data added successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

seedData();