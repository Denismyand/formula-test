import { allowedSymbols } from "../constants";
import { Option } from "./types";

export function calculateResults(tags: string[], options: Option[]) {
  const arrayWithValues = tags.map((tag, i) => {
    if (isOperand(tag)) {
      if (tag === "^") return "**";
      return tag;
    }

    const value = options.find((option) => option.name === tag)?.value;
    return value ? value.toString() : "";
  });

  try {
    const result = eval(arrayWithValues.join(" "));

    return result;
  } catch {
    return "can't be calculated. Please enter a valid formula.";
  }
}

function isOperand(tag: string) {
  return allowedSymbols.includes(tag);
}
