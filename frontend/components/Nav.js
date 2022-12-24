import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../public/images/Logo.png";
import OptionsSelect from "./OptionsSelect";
import { useContext, useEffect } from "react";
import { SiteStateContext } from "../context/SiteStateContext";

const styles = {
  nav: "flex flex-col items-center bg-primary-500",
  navWrapper: "flex justify-between items-center bg-gray-200 py-2 w-full px-12",
  list: `py-2`,
  logo: `cursor-pointer`,
  link: `py-2 px-4 text-lg uppercase text-black`,
  active: `font-bold`,
};

export default function Nav() {
  const router = useRouter();
  const [siteState, setSiteState] = useContext(SiteStateContext);

  return (
    <nav className={styles.nav}>
      <div className="border-b w-full flex items-center justify-center">
        <Link href="/" passHref>
          <a className="mr-8">
            <Image
              src={Logo}
              height={50}
              width={50}
              alt="Glendale Logo"
              className={styles.logo}
            />
          </a>
        </Link>
      </div>
      <div className={styles.navWrapper}>
        <OptionsSelect
          name="teamSelect"
          options={["Girls JV", "Girls Varsity", "Boy's JV", "Boy's Varsity"]}
          defaultSelectOption="Choose a Team"
        />
        <ul className={styles.list}>
          <li>
            <Link href="/news">
              <a
                className={`${
                  router.pathname == "/news" ? styles.active : ""
                } ${styles.link}`}
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
                className={`${
                  router.pathname == "/stats" ? styles.active : ""
                } ${styles.link}`}
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
      </div>
    </nav>
  );
}
