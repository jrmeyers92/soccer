import React from "react";

const styles = {
  container: "w-full md:w-1/3 my-2",
  heading: `font-bold uppercase text-white text-lg px-4`,
  headingWrapper: `bg-primary`,
};

const ScheduleWidget = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Schedule</h2>
      </div>
    </section>
  );
};

export default ScheduleWidget;
