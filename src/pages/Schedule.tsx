import { useEffect, useState } from "react";
import { Subject } from "../types";
import { SubjectTable } from "../components";

function Schedule() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    function getSubjects() {
      chrome.storage.local.get("schedule", (result) => {
        const subjects = result.schedule;
        const subjectParsed: Subject[] = JSON.parse(subjects);
        setSubjects(subjectParsed);
      });
    }

    getSubjects();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <div>
      <div className="flex justify-center mb-8">
        <button
          className="px-4 py-2 mr-4 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600 hover:transition-colors"
          onClick={() => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - 7);
            setCurrentDate(date);
          }}
        >
          Previous Week
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => {
            const date = new Date(currentDate);
            date.setDate(date.getDate() + 7);
            setCurrentDate(date);
          }}
        >
          Next Week
        </button>
      </div>

      <SubjectTable subjects={subjects} currentDate={currentDate} />
    </div>
  );
}

export default Schedule;
