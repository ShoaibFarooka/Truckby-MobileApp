const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        info: {
            name: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            caption: {
                type: String,
                required: true,
                trim: true
            },
            type: {
                type: String,
                required: true,
                trim: true,
                enum: ['fixed', 'variable']
            }
        },
        filters: {
            age: {
                type: String,
                required: true,
                trim: true
            },
            gender: {
                type: String,
                required: true,
                trim: true,
                enum: ['male', 'female', 'other']
            },
            postalCode: {
                type: String,
                required: true,
                trim: true
            },
            radius: {
                type: String,
                required: true,
                trim: true
            },
        },
        budget: {
            daliyBudget: {
                type: Number,
                default: null
            },
            perViewBudget: {
                type: Number,
                default: null
            },
            totalBudget: {
                type: Number,
                required: true,
            }
        },
        duration: {
            startDate: {
                type: String,
                required: true,
                trim: true
            },
            endDate: {
                type: String,
                default: null,
                trim: true
            },
        },
        acceptanceCriteria: {
            minimumViews: {
                type: Number,
                default: null
            }
        },
        assets: [String],
        status: {
            type: String,
            required: true,
            trim: true,
            enum: ['active', 'paused', 'pending', 'rejected', 'completed']
        }
    },
    { timestamps: true }
);

const Campaign = mongoose.model("campaign", campaignSchema);

module.exports = Campaign;
