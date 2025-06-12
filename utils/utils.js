import fs from "fs";
import * as datefns from "date-fns"; // library that displays dates nicely

// handy to console log in browser when debuggin
const dump = (obj) => JSON.stringify(obj, null, 2);

// insert svg icons
const icon = (iconName) => fs.readFileSync(`./public/icons/${iconName}.svg`);
const siteName = "Food Truck Flavours";

const menu = [
  {
    title: "Trucks",
    icon: "truck",
    slug: "/trucks",
  },
  {
    title: "Tags",
    icon: "tag",
    slug: "/tags",
  },
  {
    title: "Top",
    icon: "award",
    slug: "/top",
  },
  {
    title: "Add",
    icon: "plus-circle",
    slug: "/add",
  },
  {
    title: "Map",
    icon: "map-pin",
    slug: "/map",
  },
];

export default {
  siteName,
  datefns,
  dump,
  icon,
  menu,
};
