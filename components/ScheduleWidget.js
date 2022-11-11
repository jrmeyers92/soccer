import { useContext } from "react";
import SectionHeading from "./SectionHeading";
import styles from "../styles/ScheduleWidget.module.scss";
import ScheduleResultListItem from "./scheduleResultListItem";
import WidgetFooterLink from "./WidgetFooterLink";
import useSWR from "swr";
import { fetcher } from "../lib/api";
import { TeamContext } from "../context/TeamContext";

const ScheduleWidget = ({}) => {
  const [team, setTeam] = useContext(TeamContext);
  let teamSplit = team.split(" ");
  console.log(teamSplit);
  let boys = teamSplit[0].replace("'", "");
  console.log(boys);
  // const { data, error } = useSWR(
  //   `http://localhost:1337/api/schedules?populate=*&sort[0]=year%3Adesc&filters[gender][$eq]=${gender}&filters[team][$eq]=${team}`,
  //   fetcher
  // );

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // let listItems;
  // if (data) {
  //   listItems = data.data[0].attributes.game.map((game, index) => (
  //     <ScheduleResultListItem
  //       key={index}
  //       opponentSchool={game.opponent.data.attributes.school_name}
  //       opponentMascot={game.opponent.data.attributes.mascot}
  //       ourScore={game.ourScore}
  //       opponentScore={game.opponentScore}
  //     />
  //   ));
  // } else {
  //   listItems = <p>Error</p>;
  // }

  return (
    <section className={styles.container}>
      <SectionHeading title="Schedule" />
      <fieldset>
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

      {/* <ul className="border border-gray-300 border-b-0">{listItems}</ul> */}
      <WidgetFooterLink text="Composite Calendar" theLink="/schedule" />
    </section>
  );
};

export default ScheduleWidget;
