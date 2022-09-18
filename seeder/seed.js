const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const UserModel = require('../models/user.model');
const CustomerModel = require('../models/customer.model');
const ScheduleModel = require('../models/schedule.model');

const { generateRandomCustomer, generateSchedule, addCustomerToSchedule } = require('./utils/seed.utils');

const db = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME;

const password = bcrypt.hashSync('password', 10);
const userData = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: 'surveyor@test.com',
  password,
};
const customerData = generateRandomCustomer(10);
const scheduleData = generateSchedule(3);

mongoose
  .connect(db, { useNewUrlParser: true })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .then(async () => {
    // await mongoose.connection.db.dropDatabase();
    await UserModel.create(userData);
    await CustomerModel.insertMany(customerData);
    await ScheduleModel.insertMany(scheduleData);

    await addCustomerToSchedule(db);
  })
  .finally(async () => {
    console.log('Seed created');
    process.exit(1);
  });
