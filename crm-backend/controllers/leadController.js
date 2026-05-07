const mongoose = require('mongoose');
const Lead = require('../models/Lead');

const parsePositiveInteger = (value, fallbackValue) => {
  const parsedValue = Number.parseInt(value, 10);
  if (Number.isNaN(parsedValue) || parsedValue < 1) {
    return fallbackValue;
  }
  return parsedValue;
};

const buildLeadFilter = (query) => {
  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.leadSource) {
    filter.leadSource = query.leadSource;
  }

  if (query.assignedSalesperson) {
    filter.assignedSalesperson = query.assignedSalesperson;
  }

  if (query.search && query.search.trim()) {
    const searchRegex = new RegExp(query.search.trim(), 'i');
    filter.$or = [
      { leadName: searchRegex },
      { companyName: searchRegex },
      { email: searchRegex },
    ];
  }

  return filter;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createLead = async (req, res, next) => {
  try {
    const lead = await Lead.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  } catch (error) {
    return next(error);
  }
};

const getLeads = async (req, res, next) => {
  try {
    const page = parsePositiveInteger(req.query.page, 1);
    const limit = Math.min(parsePositiveInteger(req.query.limit, 10), 100);
    const skip = (page - 1) * limit;
    const filter = buildLeadFilter(req.query);

    const [total, leads] = await Promise.all([
      Lead.countDocuments(filter),
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      page,
      totalPages,
      total,
      leads,
    });
  } catch (error) {
    return next(error);
  }
};

const getLeadById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    return next(error);
  }
};

const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const allowedFields = [
      'leadName',
      'companyName',
      'email',
      'phoneNumber',
      'assignedSalesperson',
      'leadSource',
      'status',
      'estimatedDealValue',
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided for update',
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: updatedLead,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};

const addNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, createdBy } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    if (!content || !createdBy) {
      return res.status(400).json({
        success: false,
        message: 'content and createdBy are required',
      });
    }

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    lead.notes.push({
      content: String(content).trim(),
      createdBy: String(createdBy).trim(),
    });

    await lead.save();

    return res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: lead,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead, addNote };
