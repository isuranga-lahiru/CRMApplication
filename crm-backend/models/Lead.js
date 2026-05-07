/**
 * Lead Model
 * Schema for managing sales leads and customer interactions with embedded notes
 */

const mongoose = require('mongoose');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,15}$/;

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Note content is required'],
      minlength: [5, 'Note content must be at least 5 characters'],
      trim: true,
    },
    createdBy: {
      type: String,
      required: [true, 'Creator name/ID is required'],
      minlength: [2, 'createdBy must be at least 2 characters'],
      trim: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [emailRegex, 'Please provide a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [phoneRegex, 'Please provide a valid phone number'],
      trim: true,
    },
    assignedSalesperson: {
      type: String,
      required: [true, 'Assigned salesperson is required'],
      trim: true,
    },
    leadSource: {
      type: String,
      required: [true, 'Lead source is required'],
      enum: {
        values: ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'],
        message: 'Lead source must be one of: Website, LinkedIn, Referral, Cold Email, Event, Other',
      },
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
        message: 'Status must be one of: New, Contacted, Qualified, Proposal Sent, Won, Lost',
      },
      default: 'New',
    },
    estimatedDealValue: {
      type: Number,
      required: [true, 'Estimated deal value is required'],
      min: [1, 'Estimated deal value must be at least 1'],
    },
    notes: [noteSchema],
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, leadSource: 1, assignedSalesperson: 1, createdAt: -1 });
leadSchema.index({ leadName: 1, companyName: 1, email: 1 });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
