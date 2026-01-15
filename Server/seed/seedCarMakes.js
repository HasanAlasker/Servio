import mongoose from "mongoose";
import CarMakeModel from "../models/carMake.js";

const carMakesData = [
  // ===== Japanese =====
  {
    name: "toyota",
    models: [
      "corolla","camry","avanza","yaris","prado","land cruiser",
      "fortuner","hilux","rav4","highlander","4runner",
      "prius","avalon","c-hr","urban cruiser","coaster"
    ],
  },
  {
    name: "lexus",
    models: ["es","is","ls","rx","nx","ux","gx","lx","rc","lc"],
  },
  {
    name: "nissan",
    models: [
      "sunny","sentra","altima","maxima","patrol","x-trail",
      "rogue","pathfinder","armada","navara","leaf"
    ],
  },
  {
    name: "honda",
    models: ["accord","civic","cr-v","hr-v","pilot","odyssey","city","fit"],
  },
  {
    name: "mazda",
    models: ["mazda2","mazda3","mazda6","cx-3","cx-5","cx-9","bt-50","mx-5"],
  },
  {
    name: "mitsubishi",
    models: [
      "lancer","lancer ex","pajero","pajero sport",
      "outlander","outlander sport","asx","mirage","eclipse cross"
    ],
  },
  {
    name: "subaru",
    models: ["impreza","legacy","outback","forester","crosstrek","wrx","brz"],
  },
  {
    name: "suzuki",
    models: ["alto","swift","ciaz","vitara","jimny","ertiga"],
  },
  {
    name: "isuzu",
    models: ["d-max","mu-x"],
  },

  // ===== Korean =====
  {
    name: "hyundai",
    models: [
      "avante","elantra","accent","sonata","tucson","santa fe",
      "palisade","kona","creta","venue","ioniq","ioniq 5","ioniq 6"
    ],
  },
  {
    name: "kia",
    models: [
      "sephia","cerato","forte","rio","picanto",
      "optima","k5","sportage","sorento","telluride",
      "seltos","carnival","stinger","ev6"
    ],
  },
  {
    name: "genesis",
    models: ["g70","g80","g90","gv60","gv70","gv80"],
  },

  // ===== German =====
  {
    name: "bmw",
    models: [
      "1 series","3 series","5 series","7 series",
      "x1","x3","x5","x6","x7","i4","ix"
    ],
  },
  {
    name: "mercedes-benz",
    models: [
      "a-class","c-class","e-class","s-class",
      "g-class","gla","glc","gle","gls","cla","cls"
    ],
  },
  {
    name: "audi",
    models: ["a3","a4","a6","a8","q3","q5","q7","q8","e-tron"],
  },
  {
    name: "volkswagen",
    models: [
      "jetta","passat","golf","golf gti","tiguan",
      "touareg","atlas","id.3","id.4","id.5","id.6"
    ],
  },
  {
    name: "porsche",
    models: ["911","cayenne","macan","panamera","taycan","718 boxster"],
  },
  {
    name: "skoda",
    models: ["octavia","superb","rapid","karoq","kodiaq"],
  },

  // ===== American =====
  {
    name: "ford",
    models: [
      "focus","fusion","escape","edge",
      "explorer","expedition","ranger","f-150","mustang"
    ],
  },
  {
    name: "chevrolet",
    models: [
      "aveo","cruze","malibu","impala",
      "captiva","equinox","tahoe","silverado"
    ],
  },
  {
    name: "gmc",
    models: ["sierra","terrain","acadia","yukon","canyon"],
  },
  {
    name: "cadillac",
    models: ["ct4","ct5","xt4","xt5","xt6","escalade","lyriq"],
  },
  {
    name: "jeep",
    models: ["wrangler","cherokee","grand cherokee","compass","renegade","gladiator"],
  },
  {
    name: "dodge",
    models: ["charger","challenger","durango","hornet"],
  },
  {
    name: "ram",
    models: ["1500","2500","3500","promaster"],
  },
  {
    name: "tesla",
    models: ["model s","model 3","model x","model y","cybertruck"],
  },

  // ===== European (Other) =====
  {
    name: "peugeot",
    models: ["206","207","208","301","308","3008","5008"],
  },
  {
    name: "renault",
    models: ["logan","symbol","megane","duster","koleos"],
  },
  {
    name: "fiat",
    models: ["500","tipo","panda","doblo"],
  },
  {
    name: "volvo",
    models: ["s60","s90","xc40","xc60","xc90","v60"],
  },
  {
    name: "mini",
    models: ["cooper","countryman","clubman","electric"],
  },
  {
    name: "land rover",
    models: [
      "range rover","range rover sport","range rover evoque",
      "range rover velar","discovery","defender"
    ],
  },
  {
    name: "jaguar",
    models: ["xe","xf","xj","f-pace","e-pace","i-pace"],
  },

  // ===== Chinese (Jordan market growing fast) =====
  {
    name: "chery",
    models: ["tiggo 2","tiggo 4","tiggo 7","tiggo 8"],
  },
  {
    name: "geely",
    models: ["emgrand","coolray","azkarra","geometry c"],
  },
  {
    name: "byd",
    models: ["f3","han","tang","atto 3","seal"],
  },
];


const seedDatabase = async () => {
  try {
    // Clear existing data
    await CarMakeModel.deleteMany({});
    console.log("Cleared existing car makes");

    // Insert new data
    const result = await CarMakeModel.insertMany(carMakesData);
    console.log(`Successfully seeded ${result.length} car makes`);

    // Display summary
    console.log("\nSeeded car makes:");
    result.forEach((make) => {
      console.log(`- ${make.name}: ${make.models.length} models`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

export default seedDatabase;
