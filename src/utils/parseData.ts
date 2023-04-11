import { Subject } from "../types";
export const parseDayOfWeek = (day: string): number => {
  const daysOfWeek: Record<string, number> = {
    Hai: 2,
    Ba: 3,
    Tư: 4,
    Năm: 5,
    Sáu: 6,
    Bảy: 7,
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
    Sat: 7,
  };
  return daysOfWeek[day];
};

export const parseWeeks = (weeksText: string): number[] => {
  // convert to time in number
  return weeksText
    .split("--")
    .map((week) =>
      new Date(week.replace(/(\d+[/])(\d+[/])/, "$2$1")).getTime()
    );
};

export const parseSubject = (tdElements: Element[]): Subject => {
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
