import { useState } from "react";
import Fuse from "fuse.js";

const useFuzzyList = (
  list,
  { limit = false, ...fuseOptions },
  initialSearch = ""
) => {
  const fuse = new Fuse(list, fuseOptions);
  const [search, setSearch] = useState(initialSearch);

  const filteredList = fuse.search(search, { limit });

  return [filteredList, search, setSearch];
};

export default useFuzzyList;
