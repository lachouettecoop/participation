import React from "react";
import { Box, Heading } from "rebass";
import useFuzzyList from "../hooks/useFuzzyList";
import FormGroup from "../ui/FormGroup";
import ChouettosList from "./ChouettosList";

const BrowseByName = ({ chouettos }) => {
  const [filteredChouettos, nameFilter, setNameFilter] = useFuzzyList(
    chouettos,
    { keys: ["node.firstname", "node.lastname"] }
  );

  return (
    <Box my={6}>
      <Heading>Liste nominative</Heading>
      <FormGroup htmlFor="nameFilter" label="Chercher par nom/prénom">
        <input
          name="nameFilter"
          type="text"
          placeholder="Jean TIBOU"
          onChange={e => setNameFilter(e.target.value)}
          value={nameFilter}
        />
      </FormGroup>

      <ChouettosList chouettos={filteredChouettos} />
    </Box>
  );
};

export default BrowseByName;
