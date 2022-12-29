const styles = {
  headingWrapper: "bg-primary w-full",
  heading: "font-bold uppercase text-white text-xl px-4 py-4",
};

const SectionHeading = ({ title }) => {
  return (
    <div className={styles.headingWrapper}>
      <h2 className={styles.heading}>{title}</h2>
    </div>
  );
};

export default SectionHeading;
