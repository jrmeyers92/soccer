import { useContext, useEffect, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import SectionHeading from "./SectionHeading";
import WidgetScheduleResultListItem from "./WidgetScheduleResultListItem";

const ScheduleWidget = () => {
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [schedule, setSchedule] = useState();
  const [year, setYear] = useState();

  let url = `http://localhost:1337/api/schedules?populate=*&filters[team][$eq]=${siteState.team}&filters[gender][$eq]=${siteState.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data.data[0].attributes.game);
        setYear(data.data[0].attributes.year);
      });
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSchedule(data.data[0].attributes.game);
        setYear(data.data[0].attributes.year);
      });
  }, [siteState]);

  console.log(schedule);

  if (!schedule) {
    return <div>no schedule at this time</div>;
  }

  return (
    <div className="w-1/3 my-2">
      <SectionHeading
        title={`${year} ${siteState.gender} ${siteState.team} schedule`}
      />
      <ul>
        {schedule.map((game) => (
          <WidgetScheduleResultListItem
            key={game.id}
            opponentSchool={game.opponent.data.attributes.school_name}
            opponentMascot={game.opponent.data.attributes.mascot}
            opponentScore={game.opponentScore}
            ourScore={game.ourScore}
          />
        ))}
      </ul>
    </div>
  );
};

export default ScheduleWidget;
