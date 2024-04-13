export function generateTagValues(array: string[]) {
  const values = array.map((tag) => {
    try {
      const parsedTag = JSON.parse(tag);
      const isObject = typeof parsedTag === "object";
      return isObject ? parsedTag.name : tag;
    } catch (error) {
      return tag;
    }
  });
  return values;
}
