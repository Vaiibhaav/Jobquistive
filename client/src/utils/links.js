import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { CgBriefcase } from "react-icons/cg";
import { AiOutlineFileDone } from "react-icons/ai";

const links = [
  {
    id: 1,
    text: "stats",
    path: "",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Tracked Jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "All Opportunities",
    path: "",
    icon: <MdQueryStats />,
  },
  {
    id: 4,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },

  {
    id: 5,
    text: "opportunities",
    path: "opportunities",
    icon: <CgBriefcase />,
  },
  {
    id: 6,
    text: "applied opportunities",
    path: "applied-opportunities",
    icon: <AiOutlineFileDone />,
  },
  {
    id: 7,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
