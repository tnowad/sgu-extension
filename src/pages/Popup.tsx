import { useNavigate } from "react-router-dom";
import { SubjectList } from "../components";
import { useEffect, useState } from "react";
import { Subject } from "../types";
function Popup() {
  const navigate = useNavigate();
  const handleOpenTab = () => {
    chrome.tabs.create(
      { url: chrome.runtime.getURL("index.html#/schedule") },
      () => {
        navigate("/schedule");
      }
    );
  };

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
  console.log(subjects);
  return (
    <div className="font-sans text-base bg-slate-50 w-[450px] max-w-[600px]">
      <div className="container max-w-screen-md px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">SGU Schedule</h1>
        <div className="flex justify-center mb-8">
          <button
            className="px-4 py-2 mr-4 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600 hover:transition-colors"
            onClick={handleOpenTab}
          >
            View Schedule
          </button>
          <a
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            id="update-schedule"
            href="http://thongtindaotao.sgu.edu.vn/default.aspx?page=thoikhoabieu&sta=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Update Schedule
          </a>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className="px-4 py-2 mr-4 text-white duration-300 bg-blue-500 rounded hover:bg-blue-600 hover:transition-colors"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - 1);
              setCurrentDate(date);
            }}
          >
            Previous Day
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + 1);
              setCurrentDate(date);
            }}
          >
            Next Day
          </button>
        </div>
        <SubjectList subjects={subjects} currentDate={currentDate} />
      </div>
    </div>
  );
}

export default Popup;
