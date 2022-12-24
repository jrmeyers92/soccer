import { useContext, useEffect } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import { fetcher } from "../lib/api";

const ScheduleWidget = () => {
  const [siteState, setSiteState] = useContext(SiteStateContext);

  const getSchedule = async () => {
    const schedule = await fetcher(
      "http://localhost:1337/api/articles?sort[0]=date%3ADesc&populate=*"
    );

    return schedule;
  };

  useEffect(() => {
    getSchedule();
  }, [siteState]);

  return <div>ScheduleWidget</div>;
};

export default ScheduleWidget;
