const conn = require('./conn');
const Product = require('./Product');
const User = require('./User');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Checkout = require('./Checkout');
const fs = require('fs');
const path = require('path');

User.hasMany(Order, { hooks: true, onDelete: 'CASCADE' });
Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem, { hooks: true, onDelete: 'CASCADE' });
LineItem.belongsTo(Product);
Product.hasMany(LineItem, { hooks: true, onDelete: 'CASCADE' });
Checkout.belongsTo(Order);
Order.hasOne(Checkout);

const getPhoto = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'base64', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const syncAndSeed = async() => {
  await conn.sync({force: true});
  const reishiPhoto = await getPhoto(path.join(__dirname, '../../static/products/reishi.jpg'));
  const honeyPhoto = await getPhoto(path.join(__dirname, '../../static/products/honey.jpg'));
  const wellbelPhoto = await getPhoto(path.join(__dirname, '../../static/products/wellbelWomen.jpg'));
  
  const userList = [
    {
      firstName: 'Kendal',
      lastName: 'Enz',
      password: '123',
      email: 'kendal.enz@gmail.com'
    }, 
    {
      firstName: 'Gabriel',
      lastName: 'Zapata',
      password: '123',
      email: 'gabriel.zapata@gmail.com'
    }
  ];

  const [kendal, gabriel] = await Promise.all(
    userList.map(
      user => User.create(user)
    )
  );
  
  const productList = [
    {
      name: 'Moon Juice Reishi Nootropic Supershroom',
      price: '48.00',
      photo: reishiPhoto
    }, 
    {
      name: 'Falmingo Estate Royal Nectar Manuka Honey',
      price: '135.00',
      photo: honeyPhoto
    },
    {
      name: 'Wellbel Women',
      price: '68.00',
      photo: wellbelPhoto
    }
  ];
  const [reishi, honey] = await Promise.all(
    productList.map(
      product => Product.create(product)
    )
  );
};

module.exports = {
    syncAndSeed,
    User,
    Product,
    Checkout
};