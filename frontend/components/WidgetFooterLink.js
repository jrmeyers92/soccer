import Link from "next/link";

const WidgetFooterLink = ({ text, theLink }) => {
  return (
    <div className="text-center w-full py-2 bg-gray-300 hover:text-white hover:bg-primary-500 duration-200 cursor-pointer">
      <Link href={`${theLink}`}>
        <a className="uppercase font-bold">{text}</a>
      </Link>
    </div>
  );
};

export default WidgetFooterLink;
