import Logo from "../public/images/Logo.png";
import OponentLogo from "../public/images/kickapooLogo.png";
import Image from "next/image";
import { formateDateTest } from "../lib/dateFormatter";

const ScheduleWidgetResultListItem = ({
  opponentSchool,
  opponentMascot,
  ourScore,
  opponentScore,
  date,
  time,
  location,
  scheduleType,
}) => {
  return (
    <li className="border-b border-gray-300 last:mb-0 last:border-b-0 p-4 border-l border-r">
      <div className="uppercase font-extralight mb-2">
        {date} {scheduleType === "results" ? "• Final" : ""}
      </div>
      <div className="flex items-center">
        <Image src={Logo} height={35} width={35} alt="Glendale Logo" />
        <span className="ml-2 font-extralight">Glendale</span>
        <span className="ml-auto mr-8 font-light">{ourScore}</span>
      </div>

      <div className="flex items-center w-full">
        <Image src={OponentLogo} height={35} width={35} alt="Opponent Logo" />
        <span className="ml-2 font-extralight">
          {location === "Home" ? "vs " : "at "}
          {opponentSchool} {opponentMascot}
        </span>
        <span className="ml-auto mr-8 font-light">{opponentScore}</span>
      </div>
    </li>
  );
};

export default ScheduleWidgetResultListItem;
