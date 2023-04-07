import { getData } from "./render.js";

const subjects = await getData();

const current = {
  thu: new Date().getDay() + 1,
  date: new Date().getTime(),
};

const todaySubjects = subjects.filter((subject) => {
  const isToday = subject.Thu === current.thu;
  return (
    isToday &&
    subject.Tuan[0] <= current.date &&
    subject.Tuan[1] >= current.date
  );
});
const Lesson = {
  1: { start: "07:00", end: "07:50" },
  2: { start: "07:50", end: "08:40" },
  3: { start: "09:00", end: "09:50" },
  4: { start: "09:50", end: "10:40" },
  5: { start: "10:40", end: "11:30" },
  6: { start: "13:00", end: "13:50" },
  7: { start: "13:50", end: "14:40" },
  8: { start: "15:00", end: "15:50" },
  9: { start: "15:50", end: "16:40" },
  10: { start: "16:40", end: "17:30" },
  11: { start: "17:40", end: "18:30" },
  12: { start: "18:30", end: "19:20" },
  13: { start: "19:20", end: "20:10" },
};

const getTimeOfSubject = (subject) => {
  const start = Lesson[subject.TietBD].start;
  const end = Lesson[subject.TietBD + subject.ST - 1].end;
  return `${start} - ${end}`;
};

const renderSubject = (subject) => {
  const subjectTime = getTimeOfSubject(subject);
  const subjectName = subject.TenMH;
  const subjectRoom = subject.Phong;

  const element = `
    <li class="subject-item">
      <div class="subject">
        <div class="subject-name">${subjectName}</div>
        <div class="subject-room">${subjectRoom}</div>
        <div class="subject-time">${subjectTime}</div>
      </div>
    </li>
  `;
  return element;
};

const renderSubjects = (subjects) => {
  const elements = subjects.map((subject) => renderSubject(subject));
  return elements.join("");
};

const subjectList = document.querySelector(".subject-list");
if (todaySubjects.length > 0) {
  subjectList.innerHTML = renderSubjects(todaySubjects);
}
