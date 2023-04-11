import { Subject } from "../types";

const fillColor = (data: Subject[]): Subject[] => {
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

const parseDayOfWeek = (day: string): number => {
  const daysOfWeek: Record<string, number> = {
    Hai: 2,
    Ba: 3,
    Tư: 4,
    Năm: 5,
    Sáu: 6,
    Bảy: 7,
  };
  return daysOfWeek[day];
};

const parseWeeks = (weeksText: string): number[] => {
  // convert to time in number
  return weeksText
    .split("--")
    .map((week) =>
      new Date(week.replace(/(\d+[/])(\d+[/])/, "$2$1")).getTime()
    );
};

const parseSubject = (tdElements: Element[]): Subject => {
  const subjectText = tdElements.reduce(
    (previous, current) => previous + (current as HTMLElement).innerText + "|",
    ""
  );
  const subjectFields = subjectText.split("|");

  return {
    subjectCode: subjectFields[0],
    subjectName: subjectFields[1],
    subjectGroup: subjectFields[2],
    numberOfCredits: subjectFields[3],
    classCode: subjectFields[4],
    creditsForTuitionFee: subjectFields[5],
    notAllowedToRegister: subjectFields[6],
    practiceSession: subjectFields[7],
    dayOfWeek: parseDayOfWeek(subjectFields[8]),
    startingPeriod: parseInt(subjectFields[9]),
    numberOfPeriods: parseInt(subjectFields[10]),
    room: subjectFields[11],
    lecturer: subjectFields[12],
    weeks: parseWeeks(tdElements[13].innerHTML.split("'")[1]),
  };
};

const getData = (): Subject[] => {
  const trElements = Array.from(document.querySelectorAll(".body-table tr"));
  const data = trElements.map((trElement) =>
    parseSubject(Array.from(trElement.querySelectorAll("td")))
  );

  return fillColor(data);
};

const updateSchedule = (): void => {
  const data = getData();
  chrome.storage.local.set({ tkb: JSON.stringify(data) }).then(() => {
    alert("Đã cập nhật thời khóa biểu!");
  });
};

const createUpdateButton = () => {
  const button = document.createElement("button");
  button.textContent = "Cập nhật thời khóa biểu";
  button.addEventListener("click", updateSchedule);
  const headerCell = document.querySelector<HTMLTableCellElement>(
    "#ctl00_ContentPlaceHolder1_ctl00_pnlHeader > table > tbody > tr:nth-child(1) > td"
  );
  headerCell?.appendChild(button);
};

const tryAutoStart = () => {
  const scheduleTabButton = document.querySelector<HTMLInputElement>(
    "#ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet"
  );

  if (scheduleTabButton && scheduleTabButton.checked) {
    createUpdateButton();
  }
};

tryAutoStart();
console.log("content script loaded");
console.log(getData());
export {};
