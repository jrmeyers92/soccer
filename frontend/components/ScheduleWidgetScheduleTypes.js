import { useState } from "react";
import styles from "../styles/ScheduleWidgetScheduleTypes.module.scss";

const ScheduleWidgetScheduleTypes = () => {
  const [scheduleType, setScheduleType] = useState("Events");

  const handleChange = (e) => {};

  return (
    <div className={`${styles.ScheduleWidgetScheduleTypes} flex uppercase`}>
      <div className="w-1/2 flex items-center justify-center border-gray-300 border py-2">
        <input
          type="radio"
          name="scheduleView"
          id="events"
          className="hidden "
          value="events"
          checked
        />
        <label
          className="cursor-pointer h-full w-full text-center font-bold"
          htmlFor="events"
        >
          Events
        </label>
      </div>
      <div className="w-1/2 flex items-center justify-center border-gray-300 border py-2">
        <input
          type="radio"
          name="scheduleView"
          id="results"
          className="hidden"
          value="results"
        />
        <label
          className="cursor-pointer h-full w-full text-center font-bold"
          htmlFor="results"
        >
          Results
        </label>
      </div>
    </div>
  );
};

export default ScheduleWidgetScheduleTypes;
