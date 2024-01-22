const mongoose = require('mongoose');
const faker = require('faker');

// Connect to MongoDB
mongoose.connect('mongodb+srv://loliklolik449:Bexmeen1111@cluster0.5sg9eqi.mongodb.net/sports_goods_store', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;



// Define schemas for collections
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    brand: String,
});

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phoneNumber: String,
});

const orderSchema = new mongoose.Schema({
    orderID: String,
    customerID: mongoose.Schema.Types.ObjectId,
    orderDate: Date,
    orderItems: [{
        productID: mongoose.Schema.Types.ObjectId,
        quantity: Number,
    }],
    totalPrice: Number,
});

const reviewSchema = new mongoose.Schema({
    productID: mongoose.Schema.Types.ObjectId,
    customerID: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    date: Date,
});

// Create models based on the schemas
const Product = mongoose.model('Product', productSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);

// Number of objects to create
const numProducts = 500;
const numCustomers = 200;
const numOrders = 200;
const numReviews = 100;

// Insert fake data into MongoDB
for (let i = 0; i < numProducts; i++) {
    const product = new Product({
        name: faker.commerce.productName(),
        price: faker.datatype.number({ min: 10, max: 200 }),
        category: faker.random.arrayElement(['Clothing', 'Footwear', 'Accessories', 'Equipment']),
        brand: faker.company.companyName(),
    });

    product.save();
}

for (let i = 0; i < numCustomers; i++) {
    const customer = new Customer({
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
    });

    customer.save();
}

for (let i = 0; i < numOrders; i++) {
    const order = new Order({
        orderID: faker.datatype.uuid,
        customerID: new mongoose.Types.ObjectId(),
        orderDate: faker.date.recent(),
        orderItems: Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, () => ({
            productID: new mongoose.Types.ObjectId(),
            quantity: faker.datatype.number({ min: 1, max: 10 }),
        })),
        totalPrice: faker.datatype.number({ min: 50, max: 1000 }),
    });

    order.save();
}

for (let i = 0; i < numReviews; i++) {
    const review = new Review({
        productID: new mongoose.Types.ObjectId(),
        customerID: new mongoose.Types.ObjectId(),
        rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
        comment: faker.lorem.sentence(),
        date: faker.date.recent(),
    });

    review.save();
}

console.log('Fake data inserted into MongoDB.');
