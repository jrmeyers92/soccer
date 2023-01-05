import { useState, useEffect } from "react";
const useFetchSchedules = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setloading(false);
      });
  }, [url]);
};

export default useFetchSchedules;
