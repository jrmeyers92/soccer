import React from "react";
import SectionHeading from "./SectionHeading";
import styles from "../styles/ScheduleWidget.module.scss";
import ScheduleResultListItem from "./scheduleResultListItem";
import WidgetFooterLink from "./WidgetFooterLink";

const ScheduleWidget = () => {
  return (
    <section className={styles.container}>
      <SectionHeading title="Schedule" />
      <fieldset>
        <div>
          <input
            type="radio"
            name="scheduleWidget"
            id="events"
            checked
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
        <ScheduleResultListItem />
        <ScheduleResultListItem />
        <ScheduleResultListItem />
        <ScheduleResultListItem />
        <ScheduleResultListItem />
      </ul>
      <WidgetFooterLink text="Composite Calendar" theLink="/schedule" />
    </section>
  );
};

export default ScheduleWidget;
