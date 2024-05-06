import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineCompass,
  AiFillCompass,
  AiOutlineMessage,
  AiFillMessage,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { RiVideoFill, RiVideoLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaDumbbell } from "react-icons/fa";
export const menuItems = [
  {
    title: "Home",
    icon: <AiOutlineHome className="text-2xl mr-5"></AiOutlineHome>,
    activeIcon: <AiFillHome className="text-2xl mr-5"></AiFillHome>,
  },

  {
    title: "Explore",
    icon: <AiOutlineCompass className="text-2xl mr-5"></AiOutlineCompass>,
    activeIcon: <AiFillCompass className="text-2xl mr-5"></AiFillCompass>,
  },
  {
    title: "Workout",
    icon: <FaDumbbell className="text-2xl mr-5"></FaDumbbell>,
    activeIcon: <FaDumbbell className="text-2xl mr-5"></FaDumbbell>,
  },

  {
    title: "Create",
    icon: <AiOutlinePlusCircle className="text-2xl mr-5"></AiOutlinePlusCircle>,
    activeIcon: <AiFillPlusCircle className="text-2xl mr-5"></AiFillPlusCircle>,
  },
  {
    title: "Profile",
    icon: <CgProfile className="text-2xl mr-5"></CgProfile>,
    activeIcon: <CgProfile className="text-2xl mr-5"></CgProfile>,
  },
];
