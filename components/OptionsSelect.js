import { useState } from "react";
import styles from "../styles/OptionsSelect.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { BsCheck } from "react-icons/bs";

const OptionsSelect = ({ name, options, defaultSelectOption, onSelect }) => {
  const [currentValue, setCurrentValue] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);

  const optionClicked = (e) => {
    setCurrentValue(e.target.innerHTML);
    setOptionsOpen(false);
    onSelect(e.target.innerHTML);
  };

  const listItems = options.map((option) => (
    <li
      key={option}
      className={`flex items-center justify-between ${
        currentValue == option ? "pointer-events-none text-primary-500" : ""
      }`}
    >
      <button onClick={optionClicked} className="w-full text-left">
        {option}
      </button>
      <span>{option == currentValue ? <BsCheck /> : ""}</span>
    </li>
  ));

  return (
    <div className={styles.optionSelect}>
      <label
        htmlFor={name}
        className={`shimmer ${styles.label}`}
        onClick={() => setOptionsOpen(!optionsOpen)}
      >
        <span>{currentValue ? currentValue : defaultSelectOption}</span>
        {optionsOpen ? (
          <FiChevronUp size="1rem" />
        ) : (
          <FiChevronDown size="1rem" />
        )}
      </label>
      <input type="checkbox" name={name} id={name} hidden />

      <ul className={`${styles.list} ${optionsOpen ? "block" : "hidden"} `}>
        {listItems}
      </ul>
    </div>
  );
};

export default OptionsSelect;
