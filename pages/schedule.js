import Layout from "../components/Layout.js";
import { useContext } from "react";
import { SiteStateContext } from "../context/SiteStateContext";
import useSWR from "swr";
import { fetcher } from "../lib/api";

export default function schedule() {
  const [siteState, setSiteState] = useContext(SiteStateContext);

  const { data, error } = useSWR(
    `http://localhost:1337/api/schedules?populate=*&sort[0]=year%3Adesc&filters[gender][$eq]=${siteState.gender}&filters[team][$eq]=${siteState.team}`,
    fetcher
  );

  if (data) {
    console.log(data.data);
  }

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let listItems;
  if (data.data[0]) {
    listItems = data.data[0].attributes.game.map((game, index) => (
      <div
        key={index}
        opponentSchool={game.opponent.data.attributes.school_name}
        opponentMascot={game.opponent.data.attributes.mascot}
        ourScore={game.ourScore}
        opponentScore={game.opponentScore}
      >
        {game.ourScore}
      </div>
    ));
  } else {
    listItems = <p className="p-2">No Schedule available</p>;
  }

  return <Layout></Layout>;
}
