const Constants = require('../constants');
const cities = require('./cities')
const {descriptors,places} = require('./seedHelpers');
const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect(Constants.dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once('open',()=>{
    console.log("Database connected")
});

const sample = array=> array[Math.floor(Math.random()*array.length)];

const seedDb = async () =>{
    await Campground.deleteMany({});
    for(let i =0;i<50;++i){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground(
            {
                title: `${sample(descriptors)} ${sample(places)}`,
                location: `${cities[random1000].city}, ${cities[random1000].state}`
            }
        );
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close()
});