import {
  FiCoffee, FiWifi, FiTruck, FiWind, FiUsers, FiMusic,
} from "react-icons/fi";
import { MdOutlinePool, MdOutlineFitnessCenter, MdOutlineSpa, MdOutlineLocalBar, MdOutlineChildCare, MdOutlineHiking } from "react-icons/md";
import { GiWaterfall } from "react-icons/gi";

export const amenityIconMap = {
  "Free Breakfast": <FiCoffee />,
  "Pool": <MdOutlinePool />,
  "Gym": <MdOutlineFitnessCenter />,
  "WiFi": <FiWifi />,
  "Parking": <FiTruck />,
  "AC": <FiWind />,
  "Spa": <MdOutlineSpa />,
  "Bar": <MdOutlineLocalBar />,
  "Butler Service": <FiUsers />,
  "Business Centre": <FiUsers />,
  "Kids Club": <MdOutlineChildCare />,
  "Nature Walks": <MdOutlineHiking />,
  "Lake View": <GiWaterfall />,
  "Taj View": <GiWaterfall />,
  "City View": <GiWaterfall />,
  "Sea View": <GiWaterfall />,
  "Garden View": <GiWaterfall />,
  "Harbour View": <GiWaterfall />,
  "Mountain View": <GiWaterfall />,
  "Valley View": <GiWaterfall />,
  "River View": <GiWaterfall />,
  "Beach Access": <GiWaterfall />,
  "Private Pool": <MdOutlinePool />,
  "Fireplace": <FiMusic />,
  "Yoga Pavilion": <MdOutlineSpa />,
};

export function getAmenityIcon(name) {
  return amenityIconMap[name] || <FiCoffee />;
}
