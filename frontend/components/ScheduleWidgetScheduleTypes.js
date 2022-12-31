import { useState } from "react";
import styles from "../styles/ScheduleWidgetScheduleTypes.module.scss";

const ScheduleWidgetScheduleTypes = ({ clicked, scheduleType }) => {
  const handleChange = (e) => {
    clicked(e.target.value);
  };

  return (
    <div className={`${styles.ScheduleWidgetScheduleTypes} flex uppercase`}>
      <div className="w-1/2 flex items-center justify-center border-gray-300 border py-2">
        <input
          type="radio"
          name="scheduleView"
          id="upcoming"
          checked={scheduleType === "upcoming" ? true : false}
          className="hidden "
          value="upcoming"
          onChange={handleChange}
        />
        <label
          className="cursor-pointer h-full w-full text-center font-bold"
          htmlFor="upcoming"
        >
          upcoming
        </label>
      </div>
      <div className="w-1/2 flex items-center justify-center border-gray-300 border py-2">
        <input
          type="radio"
          name="scheduleView"
          id="results"
          className="hidden"
          value="results"
          checked={scheduleType === "upcoming" ? false : true}
          onChange={handleChange}
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
