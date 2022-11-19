import { useContext } from "react";
import SectionHeading from "./SectionHeading";
import styles from "../styles/ScheduleWidget.module.scss";
import WidgetScheduleResultListItem from "./WidgetScheduleResultListItem";
import WidgetFooterLink from "./WidgetFooterLink";
import useSWR from "swr";
import { fetcher } from "../lib/api";
import { SiteStateContext } from "../context/SiteStateContext";

const ScheduleWidget = ({}) => {
  const [siteState, setSiteState] = useContext(SiteStateContext);

  const { data, error } = useSWR(
    `http://localhost:1337/api/schedules?populate=*&sort[0]=year%3Adesc&filters[gender][$eq]=${siteState.gender}&filters[team][$eq]=${siteState.team}`,
    fetcher
  );

  if (data) {
    console.log();
  }

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let listItems;
  if (data.data[0]) {
    listItems = data.data[0].attributes.game.map((game, index) => (
      <WidgetScheduleResultListItem
        key={index}
        opponentSchool={game.opponent.data.attributes.school_name}
        opponentMascot={game.opponent.data.attributes.mascot}
        ourScore={game.ourScore}
        opponentScore={game.opponentScore}
      />
    ));
  } else {
    listItems = <p className="p-2">No Schedule available</p>;
  }

  return (
    <section className={styles.container}>
      <SectionHeading
        title={
          data.data[0]
            ? `${data.data[0].attributes.year} ${data.data[0].attributes.gender} ${data.data[0].attributes.team} Schedule`
            : `${siteState.gender} ${siteState.team} Schedule`
        }
      />
      <fieldset className="border-b border-gray-300">
        <div>
          <input
            type="radio"
            name="scheduleWidget"
            id="events"
            className={styles.radioInput}
          />
          <label htmlFor="events" className={styles.radioLabel}>
            Upcoming
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="radio"
            name="scheduleWidget"
            id="results"
            className={styles.radioInput}
          />
          <label htmlFor="results" className={styles.radioLabel}>
            Results
          </label>
        </div>
      </fieldset>

      <ul className="border border-gray-300 border-b-0">
        {listItems ? listItems : ""}
      </ul>
      <WidgetFooterLink text="Composite Calendar" theLink="/schedule" />
    </section>
  );
};

export default ScheduleWidget;
