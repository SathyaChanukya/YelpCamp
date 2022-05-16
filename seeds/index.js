const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/campgrounds');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "626451605a509c9048ec810a",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                  type: 'Point', 
                  coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },

            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images:[
                {
                    url: 'https://res.cloudinary.com/dcpmxplle/image/upload/v1652289537/campgrounds/hftkertbfkqpots4m06u.png',
                    filename: 'campgrounds/hftkertbfkqpots4m06u',
                  },
                  {
                    url: 'https://res.cloudinary.com/dcpmxplle/image/upload/v1652289538/campgrounds/tqbbsexpxma5u90fmi3x.png',
                    filename: 'campgrounds/tqbbsexpxma5u90fmi3x',
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})