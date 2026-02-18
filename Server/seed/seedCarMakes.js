import mongoose from "mongoose";
import CarMakeModel from "../models/carMake.js";

const carMakesData = [
  // ===== Japanese =====
  {
    make: "toyota",
    name: [
      "corolla","camry","avanza","yaris","prado","land cruiser",
      "fortuner","hilux","rav4","highlander","4runner",
      "prius","avalon","c-hr","urban cruiser","coaster"
    ],
  },
  {
    make: "lexus",
    name: ["es","is","ls","rx","nx","ux","gx","lx","rc","lc"],
  },
  {
    make: "nissan",
    name: [
      "sunny","sentra","altima","maxima","patrol","x-trail",
      "rogue","pathfinder","armada","navara","leaf"
    ],
  },
  {
    make: "honda",
    name: ["accord","civic","cr-v","hr-v","pilot","odyssey","city","fit"],
  },
  {
    make: "mazda",
    name: ["mazda2","mazda3","mazda6","cx-3","cx-5","cx-9","bt-50","mx-5"],
  },
  {
    make: "mitsubishi",
    name: [
      "lancer","lancer ex","pajero","pajero sport",
      "outlander","outlander sport","asx","mirage","eclipse cross"
    ],
  },
  {
    make: "subaru",
    name: ["impreza","legacy","outback","forester","crosstrek","wrx","brz"],
  },
  {
    make: "suzuki",
    name: ["alto","swift","ciaz","vitara","jimny","ertiga"],
  },
  {
    make: "isuzu",
    name: ["d-max","mu-x"],
  },

  // ===== Korean =====
  {
    make: "hyundai",
    name: [
      "avante","elantra","accent","sonata","tucson","santa fe",
      "palisade","kona","creta","venue","ioniq","ioniq 5","ioniq 6"
    ],
  },
  {
    make: "kia",
    name: [
      "sephia","cerato","forte","rio","picanto",
      "optima","k5","sportage","sorento","telluride",
      "seltos","carnival","stinger","ev6"
    ],
  },
  {
    make: "genesis",
    name: ["g70","g80","g90","gv60","gv70","gv80"],
  },

  // ===== German =====
  {
    make: "bmw",
    name: [
      "1 series","3 series","5 series","7 series",
      "x1","x3","x5","x6","x7","i4","ix"
    ],
  },
  {
    make: "mercedes",
    name: [
      "a-class","c-class","e-class","s-class",
      "g-class","gla","glc","gle","gls","cla","cls"
    ],
  },
  {
    make: "audi",
    name: ["a3","a4","a6","a8","q3","q5","q7","q8","e-tron"],
  },
  {
    make: "volkswagen",
    name: [
      "jetta","passat","golf","golf gti","tiguan",
      "touareg","atlas","id.3","id.4","id.5","id.6"
    ],
  },
  {
    make: "porsche",
    name: ["911","cayenne","macan","pamakera","taycan","718 boxster"],
  },
  {
    make: "skoda",
    name: ["octavia","superb","rapid","karoq","kodiaq"],
  },

  // ===== American =====
  {
    make: "ford",
    name: [
      "focus","fusion","escape","edge",
      "explorer","expedition","ranger","f-150","mustang"
    ],
  },
  {
    make: "chevrolet",
    name: [
      "aveo","cruze","malibu","impala",
      "captiva","equinox","tahoe","silverado"
    ],
  },
  {
    make: "gmc",
    name: ["sierra","terrain","acadia","yukon","canyon"],
  },
  {
    make: "cadillac",
    name: ["ct4","ct5","xt4","xt5","xt6","escalade","lyriq"],
  },
  {
    make: "jeep",
    name: ["wrangler","cherokee","grand cherokee","compass","renegade","gladiator"],
  },
  {
    make: "dodge",
    name: ["charger","challenger","durango","hornet"],
  },
  {
    make: "ram",
    name: ["1500","2500","3500","promaster"],
  },
  {
    make: "tesla",
    name: ["model s","model 3","model x","model y","cybertruck"],
  },

  // ===== European (Other) =====
  {
    make: "peugeot",
    name: ["206","207","208","301","308","3008","5008"],
  },
  {
    make: "renault",
    name: ["logan","symbol","megane","duster","koleos"],
  },
  {
    make: "fiat",
    name: ["500","tipo","panda","doblo"],
  },
  {
    make: "volvo",
    name: ["s60","s90","xc40","xc60","xc90","v60"],
  },
  {
    make: "mini",
    name: ["cooper","countryman","clubman","electric"],
  },
  {
    make: "land rover",
    name: [
      "range rover","range rover sport","range rover evoque",
      "range rover velar","discovery","defender"
    ],
  },
  {
    make: "jaguar",
    name: ["xe","xf","xj","f-pace","e-pace","i-pace"],
  },

  // ===== Chinese (Jordan market growing fast) =====
  {
    make: "chery",
    name: ["tiggo 2","tiggo 4","tiggo 7","tiggo 8"],
  },
  {
    make: "geely",
    name: ["emgrand","coolray","azkarra","geometry c"],
  },
  {
    make: "byd",
    name: ["f3","han","tang","atto 3","seal"],
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
      console.log(`- ${make.make}: ${make.name.length} name`);
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

export default seedDatabase;
