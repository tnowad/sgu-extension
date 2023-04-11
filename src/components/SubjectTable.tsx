import { Subject } from "../types/Subject";
export function SubjectTable({
  subjects,
  currentDate = new Date(),
}: {
  subjects: Subject[];
  currentDate?: Date;
}) {
  subjects = subjects.filter((subject) => {
    return currentDate >= subject.weeks[0] && currentDate <= subject.weeks[1];
  });
  return <div className="flex flex-col items-center justify-center"></div>;
}
