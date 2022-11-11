import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../public/images/Logo.png";
import OptionsSelect from "./OptionsSelect";
import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";
import { GenderContext } from "../context/GenderContext";

const styles = {
  nav: "flex justify-between items-center bg-primary-500 py-2",
  list: `px-4 py-2`,
  logo: `cursor-pointer`,
  link: `py-2 px-4 text-lg uppercase text-white`,
  active: `font-bold`,
};

export default function Nav() {
  const [team, setTeam] = useContext(TeamContext);
  const [gender, setGender] = useContext(GenderContext);
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <div className="flex items-center justify-center">
        <Link href="/" passHref>
          <a className="mr-8">
            <Image
              src={Logo}
              height={90}
              width={90}
              alt="Glendale Logo"
              className={styles.logo}
            />
          </a>
        </Link>
        <OptionsSelect
          name="genderSelect"
          options={["Boys", "Girls"]}
          defaultSelectOption="Boys or Girls"
          onSelect={setGender}
        />
        <OptionsSelect
          name="teamSelect"
          options={["JV", "Varsity"]}
          defaultSelectOption="JV or Varsity"
          onSelect={setTeam}
        />
      </div>
      <ul className={styles.list}>
        <li>
          <Link href="/news">
            <a
              className={`${router.pathname == "/news" ? styles.active : ""} ${
                styles.link
              }`}
            >
              News
            </a>
          </Link>
          <Link href="/schedule">
            <a
              className={`${
                router.pathname == "/schedule" ? styles.active : ""
              } ${styles.link}`}
            >
              Schedule
            </a>
          </Link>
          <Link href="/roster">
            <a
              className={`${
                router.pathname == "/roster" ? styles.active : ""
              } ${styles.link}`}
            >
              Roster
            </a>
          </Link>
          <Link href="/stats">
            <a
              className={`${router.pathname == "/stats" ? styles.active : ""} ${
                styles.link
              }`}
            >
              Stats
            </a>
          </Link>
          <Link href="/coaches">
            <a
              className={`${
                router.pathname == "/coaches" ? styles.active : ""
              } ${styles.link}`}
            >
              Coaches
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
