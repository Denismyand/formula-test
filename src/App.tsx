import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { Autocomplete, TextField } from "@mui/material";
import { Option } from "./utils/types";
import { reformatData } from "./utils/reformat-data";
import { allowedSymbols } from "./constants";
import { calculateResults } from "./utils/calculate-the-results";
import { useSearchStore } from "./store/store";

function App() {
  const endpoint = process.env.REACT_APP_ENDPOINT as string | "";

  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);
  const tags = useSearchStore((state) => state.tags);
  const setTags = useSearchStore((state) => state.setTags);

  const { data } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => fetch(endpoint).then((res) => res.json()),
  });

  const options =
    data && search.length > 0
      ? reformatData(data).map((elem: Option) => {
          return JSON.stringify(elem);
        })
      : [];

  return (
    <div className="App">
      <Autocomplete
        multiple
        options={options}
        value={tags}
        onChange={(event: any, newValue) => {
          const isEventOnList = event.target.tagName === "LI";
          if (isEventOnList) {
            const arrDifferences = tags.filter(
              (tag) => !newValue.includes(tag)
            );
            setTags([
              ...tags,
              ...newValue.filter((tag) => !tags.includes(tag)),
              ...arrDifferences,
            ]);
            return;
          }
          setTags(newValue);
        }}
        filterOptions={(options, params) => {
          let filtered = options
            .filter((option) => {
              const optionName = JSON.parse(option).name;

              return optionName
                .toLowerCase()
                .includes(params.inputValue.toLowerCase());
            })
            .map((option) => JSON.parse(option).name);

          if (
            (allowedSymbols.includes(params.inputValue) && tags.length > 0) ||
            params.inputValue === "("
          ) {
            filtered.unshift(params.inputValue);
          }

          setSearch(params.inputValue);
          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Tags"
            placeholder="Type or select tags"
          />
        )}
      />
      <p>{`Total: ${calculateResults(tags, data)}`}</p>
    </div>
  );
}

export default App;
