import { useState } from "react";
import Fuse from "fuse.js";

const useFuzzyList = (list, fuseOptions, initialSearch = "") => {
  const fuse = new Fuse(list, fuseOptions);
  const [search, setSearch] = useState(initialSearch);

  const filteredList = fuse.search(search);

  return [filteredList, search, setSearch];
};

export default useFuzzyList;
