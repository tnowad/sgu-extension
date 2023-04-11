import { Subject } from "../types";

export const filterByDay = (subjects: Subject[], day: number): Subject[] => {
  return subjects.filter((subject) => subject.dayOfWeek === day);
};

export const filterByWeek = (subjects: Subject[], day: number): Subject[] => {
  return subjects.filter((subject) => {
    return subject.weeks.some((week) => {
      return week.getDay() === day;
    });
  });
};
