// const mongoose = require('mongoose');


// const connectDB = (url) => {mongoose.connect(url)
//   }
// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDB;