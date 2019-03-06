import React from "react";
import { Card, Flex } from "rebass";
import Container from "./Container";
import getISOWeek from "date-fns/get_iso_week";
import addWeeks from "date-fns/add_weeks";
import { differenceInWeeks, startOfISOWeek } from "date-fns";

const makeDateFromFrench = french => {
  const [d, m, Y] = french.split("/");
  return new Date(+Y, m - 1, +d);
};

const makeWeeksDefinition = (from, to) => {
  const startWeek = getISOWeek(from);
  const endWeek = getISOWeek(to);
  const currentWeek = getISOWeek(new Date(Date.now()));
  const nbWeeks = differenceInWeeks(startOfISOWeek(to), startOfISOWeek(from));

  const weeks = new Array(nbWeeks + 1);
  return weeks
    .fill(from)
    .map((start, i) => getISOWeek(addWeeks(start, i)))
    .map(week => {
      const isPiaf = week === startWeek || week === endWeek;
      const isAllowed = week <= startWeek + 4;
      return {
        week,
        type: isPiaf ? "piaf" : isAllowed ? "ok" : "nok",
        current: week === currentWeek
        // 'ok' 'nok'
      };
    });
};

const FriseCalendrier = ({ dateDerniere, dateProchaine, ...props }) => {
  if (dateDerniere === "-" || dateProchaine === "-") return null;

  const weeks = makeWeeksDefinition(
    makeDateFromFrench(dateDerniere),
    makeDateFromFrench(dateProchaine)
  );
  console.log(weeks);

  // TODO Afficher une croix ou slash ou check

  return (
    <Container {...props} helpTo="/frise-calendrier">
      <Flex flexWrap="wrap" justifyContent="center">
        {weeks.map(({ week, type, current }) => (
          <Card
            key={week}
            p={2}
            m="1px"
            bg={
              type === "piaf" ? "primary" : type === "ok" ? "green" : "orange"
            }
            boxShadow={current ? "0 0 8px rgba(0,0,0,0.5)" : ""}
            title={`S${week}`}
          >
            S{week}
          </Card>
        ))}
      </Flex>
    </Container>
  );
};

export default FriseCalendrier;
