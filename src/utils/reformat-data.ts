import { Option } from "./types";

export function reformatData(array: Option[]) {
  const uniqueIds = new Set();
  const result: Option[] = [];

  array.forEach((item) => {
    if (uniqueIds.has(item.id)) return;

    uniqueIds.add(item.id);
    if (typeof (item.value === "string")) {
      result.push({ ...item, value: eval(item.value.toString()) });
      return;
    }
    result.push(item);
  });

  return result;
}
