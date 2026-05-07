const Lead = require('../models/Lead');

const defaultStats = {
  totalLeads: 0,
  newLeads: 0,
  qualifiedLeads: 0,
  wonLeads: 0,
  lostLeads: 0,
  totalEstimatedDealValue: 0,
  wonDealsValue: 0,
};

const getDashboardStats = async (req, res, next) => {
  try {
    const [stats] = await Lead.aggregate([
      {
        $group: {
          _id: null,
          totalLeads: { $sum: 1 },
          newLeads: { $sum: { $cond: [{ $eq: ['$status', 'New'] }, 1, 0] } },
          qualifiedLeads: { $sum: { $cond: [{ $eq: ['$status', 'Qualified'] }, 1, 0] } },
          wonLeads: { $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] } },
          lostLeads: { $sum: { $cond: [{ $eq: ['$status', 'Lost'] }, 1, 0] } },
          totalEstimatedDealValue: { $sum: '$estimatedDealValue' },
          wonDealsValue: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Won'] }, '$estimatedDealValue', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalLeads: 1,
          newLeads: 1,
          qualifiedLeads: 1,
          wonLeads: 1,
          lostLeads: 1,
          totalEstimatedDealValue: 1,
          wonDealsValue: 1,
        },
      },
    ]);

    return res.status(200).json(stats || defaultStats);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getDashboardStats };
