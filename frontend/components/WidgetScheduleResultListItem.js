import Logo from "../public/images/Logo.png";
import OponentLogo from "../public/images/kickapooLogo.png";
import Image from "next/image";

const WidgetScheduleResultListItem = ({
  opponentSchool,
  opponentMascot,
  ourScore,
  opponentScore,
}) => {
  return (
    <li className="border-b border-gray-200 mb-2 last:mb-0 last:border-b-0 p-4">
      <div className="uppercase font-extralight mb-2">November 6 • Final</div>
      <div className="flex items-center">
        <Image src={Logo} height={35} width={35} alt="Glendale Logo" />
        <span className="ml-2 font-extralight">Glendale</span>
        <span className="ml-auto mr-8 font-light">{ourScore}</span>
      </div>

      <div className="flex items-center w-full">
        <Image src={OponentLogo} height={35} width={35} alt="Opponent Logo" />
        <span className="ml-2 font-extralight">
          {opponentSchool} {opponentMascot}
        </span>
        <span className="ml-auto mr-8 font-light">{opponentScore}</span>
      </div>
    </li>
  );
};

export default WidgetScheduleResultListItem;
