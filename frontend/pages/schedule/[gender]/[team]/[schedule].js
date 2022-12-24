import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../../../lib/api";

const schedule = ({ schedule }) => {
  console.log(schedule);
  return <div>schedule</div>;
};

export default schedule;

// export async function getStaticPaths() {
//   const schedules = await fetcher(
//     `http://localhost:1337/api/schedules?populate=*`
//   );

//   const pathes = schedules.data.map((schedule) => {
//     return {
//       params: {
//         gender: schedule.attributes.gender,
//         team: schedule.attributes.team,
//         schedule: schedule.id.toString(),
//       },
//     };
//   });

//   return {
//     paths: pathes,
//     fallback: false, // can also be true or 'blocking'
//   };
// }

// export async function getStaticProps(context) {
//   const id = context.params.id;
//   const schedule = await fetcher(
//     `http://localhost:1337/api/schedules/${id}?populate=*`
//   );

//   return {
//     props: { schedule: schedule.data }, // will be passed to the page component as props
//   };
// }
