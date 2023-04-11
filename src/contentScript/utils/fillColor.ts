import { Subject } from "../../types";
export const fillColor = (data: Subject[]): Subject[] => {
  let colorIndex = 0;
  const colorsMap = new Map<string, number>();

  for (const item of data) {
    if (item.color === undefined) {
      const key = item.subjectCode;
      const existingColor = colorsMap.get(key);
      const color = existingColor !== undefined ? existingColor : colorIndex++;
      item.color = color;
      colorsMap.set(key, color);
    }
  }

  data.sort((a, b) => a.color! - b.color!);

  return data;
};
