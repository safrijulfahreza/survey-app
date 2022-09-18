const moment = require('moment');
const ScheduleModel = require('../models/schedule.model');

/**
 * This function controller handle query of data schedule.
 * And remap customer data into new array of object
 */
async function scheduleWithCustomer(req, res) {
  const today = moment(new Date()).utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format();
  const nextDay = moment(today).add(1, 'd').set({ hour: 23, minute: 59, second: 0, millisecond: 0 });
  const aggregateQuery = [
    { $addFields: { schedule_date: { $toDate: '$date' } } },
    {
      $lookup: {
        from: 'customers',
        localField: 'customer_ids',
        foreignField: '_id',
        as: 'customer_ids',
      },
    },
    { $match: { schedule_date: { $gte: new Date(today), $lte: new Date(nextDay) } } },
  ];

  const schedules = await ScheduleModel.aggregate(aggregateQuery).allowDiskUse(true);

  let startOfDay = new Date(today);
  let endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 0);

  let startOfNextDay = new Date(nextDay);
  startOfNextDay.setHours(0, 0, 0);
  let endOfNextDay = new Date(nextDay);

  const todayData = schedules.filter((schedule) => {
    if (schedule.schedule_date >= startOfDay && schedule.schedule_date <= endOfDay) return schedule;
  });

  const nextDayData = schedules.filter((schedule) => {
    if (schedule.schedule_date >= startOfNextDay && schedule.schedule_date <= endOfNextDay) return schedule;
  });

  res.status(200).json({ message: 'success', today: todayData, next_day: nextDayData });
}

/**
 * This function handle process to create new schedule base on customer
 *
 */
async function addScheduleBaseOnCustemer(req, res) {
  const { customer_ids, date } = req.body;
  const dateFormated = new Date(date);
  const dateEpoch = dateFormated.valueOf();

  const schedule = await ScheduleModel.find({ customer_ids: { $in: customer_ids } }).lean();
  if (schedule && schedule.length) {
    res.status(409).json({ message: 'this customer already on schedule' });
  } else {
    await ScheduleModel.create({ date: dateEpoch, customer_ids });
    res.status(200).json({ message: 'success' });
  }
}

module.exports = { scheduleWithCustomer, addScheduleBaseOnCustemer };
