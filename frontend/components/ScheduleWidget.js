import { useContext, useEffect, useState } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import { fetcher } from "../lib/api";

const ScheduleWidget = () => {
  const [siteState, setSiteState] = useContext(SiteStateContext);
  const [schedule, setSchedule] = useState([]);

  const getSchedule = async () => {
    const schedule = await fetcher(
      `http://localhost:1337/api/schedules?populate=*&filters[team][$eq]=${siteState.team}&filters[gender][$eq]=${siteState.gender}&sort[0]=year%3Adesc&pagination[pageSize]=1`
    );

    setSchedule(schedule.data[0]);
  };

  useEffect(() => {
    getSchedule();
  }, [siteState]);

  let scheduleItemsl;
};

export default ScheduleWidget;
