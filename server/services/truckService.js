const Subscription = require("../models/subscriptionModel");
const Truck = require("../models/truckModel");

const getAllTrucks = async (userId, skip, limit) => {
  const [trucks, total] = await Promise.all([
    Truck.find({ userId }).skip(skip).limit(limit),
    Truck.countDocuments({ userId }),
  ]);

  return { trucks, total };
};

const getUserTrucks = async (userId) => {
  const [trucks, total] = await Promise.all([
    Truck.find({ userId }),
    Truck.countDocuments({ userId }),
  ]);

  return { trucks, total };
};

function buildMatchQuery(f) {
  const q = {};

  // 1️⃣ Simple flags / exact matches ---------------------------------------
  if (f.Featured !== undefined) q.Featured = f.Featured;
  if (f.listingType) {
    if (Array.isArray(f.listingType)) {
      q.listingType = { $in: f.listingType };
    } else {
      q.listingType = f.listingType;
    }
  }

  if (f.truckCategory) q.truckCategory = f.truckCategory;
  if (f.truckSubCategory) q.truckSubCategory = f.truckSubCategory;
  if (f.typeofRearAxles) q.typeofRearAxles = f.typeofRearAxles;
  if (f.transmissionType) q.transmissionType = f.transmissionType;
  if (f.condition) {
    if (Array.isArray(f.condition)) {
      q.condition = { $in: f.condition };
    } else {
      q.condition = f.condition;
    }
  }


  // 2️⃣ Regex matches (case-insensitive) ------------------------------------
  if (f.searchText) {
    q.$or = [
      { vehicleName: { $regex: f.searchText, $options: "i" } },
      { name: { $regex: f.searchText, $options: "i" } },
    ];
  }
  if (f.country) q.country = { $regex: f.country, $options: "i" };
  if (f.vehicleManufacturer) q.vehicleManufacturer = { $regex: f.vehicleManufacturer, $options: "i" };
  if (f.engineManufacturer) q.engineManufacturer = { $regex: f.engineManufacturer, $options: "i" };
  if (f.suspension) q.suspension = { $regex: f.suspension, $options: "i" };
  if (f.rearAxles) q.rearAxles = { $regex: f.rearAxles, $options: "i" };
  if (f.noofSpeeds) q.noofSpeeds = { $regex: f.noofSpeeds, $options: "i" };
  if (f.engineModel) q.engineModel = { $regex: f.engineModel, $options: "i" };

  // 3️⃣ Numeric / range filters --------------------------------------------
  const addRange = (field, min, max) => {
    if (min || max) {
      q[field] = {};
      if (min) q[field].$gte = Number(min);
      if (max) q[field].$lte = Number(max);
    }
  };
  addRange("modelYear", f.minYear, f.maxYear);
  addRange("mileage", f.minMileage, f.maxMileage);
  addRange("hoursPower", f.minHorsepower, f.maxHorsepower);
  addRange("wheelbase", f.minWheelbase, f.maxWheelbase);
  addRange("frontAxleWeight", f.minFrontAxleWeight, f.maxFrontAxleWeight);
  addRange("backAxleWeight", f.minBackAxleWeight, f.maxBackAxleWeight);

  return q;
}

const getAllTrucksWithFilter = async (filters = {}) => {
  const matchQuery = buildMatchQuery(filters);
  // console.log("Match Query: ", matchQuery);

  // Pagination parameters ---------------------------------------------------
  const pageIndex = Number(filters.pageIndex) || 1;
  const limit = Number(filters.limit) || 12;
  const skip = (pageIndex - 1) * limit;

  const currentDate = new Date();

  const pipeline = [
    { $match: matchQuery },

    // Join with subscriptions collection -----------------------------------
    {
      $lookup: {
        from: "subscriptions",
        localField: "userId",
        foreignField: "user",
        as: "subscriptionInfo",
      },
    },

    // Pull out the **last** subscription in the array (your original rule) --
    {
      $addFields: {
        latestSubscription: {
          $arrayElemAt: ["$subscriptionInfo.subscriptions", -1],
        },
      },
    },

    // Keep trucks whose latest sub is active and not expired ---------------
    {
      $match: {
        "latestSubscription.status": "active",
        "latestSubscription.endDate": { $gt: currentDate },
      },
    },

    { $sort: { createdAt: -1 } },

    // Facet for pagination + total count in ONE round-trip -----------------
    {
      $facet: {
        paginatedResults: [{ $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  const [aggResult] = await Truck.aggregate(pipeline);

  const trucks = aggResult.paginatedResults;
  const totalCount = aggResult.totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return { trucks, totalPages, totalCount };
};

const getTruckById = async (id) => {
  return await Truck.findById(id);
};

const createTruck = async (data) => {
  const truck = new Truck(data);
  return await truck.save();
};

const updateTruck = async (id, data) => {
  return await Truck.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};


const deleteTruck = async (id) => {
  return await Truck.findByIdAndDelete(id);
};


module.exports = {
  getAllTrucksWithFilter,
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
  getUserTrucks,
};
