const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },

        // Basic Equipment Info
        vehicleName: { type: String, trim: true },
        vehiclePrice: { type: Number, trim: true },
        truckCategory: { type: String, trim: true },
        truckSubCategory: { type: String, trim: true },
        listingType: { type: String, trim: true },
        country: { type: String, trim: true },
        state: { type: String, trim: true },
        images: {
            type: [String],
            default: [],
        },
        model: { type: String, trim: true },
        unitNumber: { type: String, trim: true },
        // Seller Contact Info
        name: { type: String, trim: true },
        phone: { type: Number, trim: true },
        email: { type: String, trim: true },
        companyName: { type: String, trim: true },
        address: { type: String, trim: true },

        // Specifications
        modelYear: { type: Number, trim: true },
        mileage: { type: Number, trim: true },
        vehicleManufacturer: { type: String, trim: true },
        hours: { type: String, trim: true },
        vin: { type: String, trim: true },
        condition: {
            type: String,
            trim: true,
            enum: ["New", "Used", "Salvaged"],
        },

        // Body & Chassis
        wheelbase: { type: Number, trim: true },
        steering: { type: String, trim: true },
        suspension: { type: String, trim: true },
        engineManufacturer: { type: String, trim: true },
        engineModel: { type: String, trim: true },
        hoursPower: { type: Number, trim: true },
        description: { type: String, trim: true },

        // Transmission
        transmissionType: { type: String, trim: true },
        noofSpeeds: { type: String, trim: true },
        transmissionManufacturer: { type: String, trim: true },
        typeofRearAxles: {
            type: String,
            trim: true,
        },

        // Axles
        frontAxleWeight: { type: Number, trim: true },
        backAxleWeight: { type: Number, trim: true },
        grossVehicleWeight: { type: Number, trim: true },
        Featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
