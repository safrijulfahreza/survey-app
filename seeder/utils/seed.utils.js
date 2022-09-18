const mongoose = require('mongoose');
const moment = require('moment');
const { faker } = require('@faker-js/faker');

const CustomerModel = require('../../models/customer.model');
const ScheduleModel = require('../../models/schedule.model');
const scheduleModel = require('../../models/schedule.model');

/**
 * This function is to create random data customer
 * @param {Number} round Param to generate total amount of data
 * @returns array of object
 */
function generateRandomCustomer(round) {
  let result = [];
  for (let i = 0; i < round; i++) {
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const obj = {
      first_name,
      last_name,
      gender: faker.name.sexType(),
      phone_number: parseInt(faker.phone.number('628###########')),
      email: faker.internet.email(first_name, last_name, 'test.com'),
      address: faker.address.streetAddress(),
      location: { coordinates: faker.address.nearbyGPSCoordinate() },
    };
    result.push(obj);
  }
  return result;
}

/**
 * This Function is to generate schedule start from today
 * And increment +1 day
 * @param {Number} round ampunt total data to generate
 * @returns array of object
 */
function generateSchedule(round) {
  const today = moment(new Date()).utc().format();
  let result = [];
  for (let i = 0; i < round; i++) {
    const addOneDay = moment(today).add(i, 'd');
    const epoch = moment(addOneDay).valueOf();

    const obj = {
      date: epoch,
    };
    result.push(obj);
  }
  return result;
}

/**
 * This function is to add customer with no schedule yet into schedule collection.
 * Call this function after Customers and Schedule data created.
 */
async function addCustomerToSchedule() {
  const schedules = await ScheduleModel.find({ status: 'active' }).lean();
  const customers = await CustomerModel.find({ status: 'active' }).lean();
  let indexSchedule = 0;

  for (const [index, customer] of customers.entries()) {
    indexSchedule = Math.floor(Math.random() * schedules.length);
    await ScheduleModel.findByIdAndUpdate(schedules[indexSchedule]._id, { $addToSet: { customer_ids: customer._id } });
  }
}

module.exports = { generateRandomCustomer, generateSchedule, addCustomerToSchedule };
