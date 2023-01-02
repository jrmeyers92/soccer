import { useContext, useEffect, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import ScheduleWidgetScheduleTypes from "./ScheduleWidgetScheduleTypes";
import SectionHeading from "./SectionHeading";
import WidgetFooterLink from "./WidgetFooterLink";
import ScheduleWidgetResultListItem from "./ScheduleWidgetResultListItem";
import { sortByDateAsc, sortByDateDesc } from "../lib/sortArrayByDate";

const ScheduleWidget = () => {
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [schedule, setSchedule] = useState();
  const [year, setYear] = useState();
  const [scheduleType, setScheduleType] = useState("upcoming");

  const changeScheduleType = (value) => {
    setScheduleType(value);
  };

  let url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/schedules?populate=*&filters[team][$eq]=${siteState.team}&filters[gender][$eq]=${siteState.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let date = new Date();
        date = date.toISOString();

        let shownSchedule;

        if (scheduleType === "upcoming") {
          shownSchedule = data.data[0].attributes.game.filter((item) => {
            item.date > date;
          });

          shownSchedule = sortByDateAsc(shownSchedule);
        } else if (scheduleType === "results") {
          shownSchedule = data.data[0].attributes.game.filter((item) => {
            item.date < date;
          });
          shownSchedule = sortByDateDesc(shownSchedule);
        }

        setSchedule(shownSchedule);
        setYear(data.data[0].attributes.year);
      });
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let date = new Date();
        date = date.toISOString();
        let shownSchedule;

        if (scheduleType === "upcoming") {
          shownSchedule = data.data[0].attributes.game.filter(
            (item) => item.date > date
          );
          shownSchedule = sortByDateAsc(shownSchedule);
        } else if (scheduleType === "results") {
          shownSchedule = data.data[0].attributes.game.filter(
            (item) => item.date < date
          );
          shownSchedule = sortByDateDesc(shownSchedule);
        }

        setSchedule(shownSchedule);
        setYear(data.data[0].attributes.year);
      });
  }, [siteState, scheduleType]);

  if (!schedule || schedule == "") {
    return (
      <div className="w-full md:w-1/3 my-2 bg-white shadow-md">
        <SectionHeading
          title={`${year} ${siteState.gender} ${siteState.team} schedule`}
        />

        <ScheduleWidgetScheduleTypes
          clicked={changeScheduleType}
          scheduleType={scheduleType}
        />
        <div className="p-2 border-r border-l border-b border-gray-300">
          no schedule at this time
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 my-2 bg-white">
      <SectionHeading
        title={`${year} ${siteState.gender} ${siteState.team} schedule`}
      />

      <ScheduleWidgetScheduleTypes
        clicked={changeScheduleType}
        scheduleType={scheduleType}
      />

      <ul>
        {schedule.map((game) => (
          <ScheduleWidgetResultListItem
            key={game.id}
            opponentSchool={game.opponent.data.attributes.school_name}
            opponentMascot={game.opponent.data.attributes.mascot}
            opponentScore={game.opponentScore}
            ourScore={game.ourScore}
            date={game.date}
            time={game.time}
            location={game.location}
            scheduleType={scheduleType}
          />
        ))}
      </ul>
      <WidgetFooterLink text="view full schedule" theLink="/schedule" />
    </div>
  );
};

export default ScheduleWidget;
