import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const styles = {
  list: `flex justify-between items-center bg-primary-500 px-4 py-2`,
  lgNav: `hidden md:flex`,
  logo: `cursor-pointer`,
  link: `py-2 px-4 text-xl uppercase text-white`,
  active: `font-bold`,
};

export default function Nav() {
  const router = useRouter();
  const genderOptions = ["Boys", "Girls"];
  const teamOptions = ["JV", "Varsity"];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          {/* <Link href="/">
            <Image
              src="/images/Logo.png"
              height={80}
              width={80}
              alt="Glendale Logo"
              className={styles.logo}
            />
          </Link> */}
        </li>

        <div className={styles.lgNav}>
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
        </div>
      </ul>
    </nav>
  );
}
