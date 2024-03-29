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
        setSubjects(
          [...subjectParsed].sort((a, b) => {
            return a.startingPeriod - b.startingPeriod;
          })
        );
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
        <div className="flex justify-center mb-3">
          <button
            className="px-4 py-2 mr-4 text-white duration-300 bg-[#5cbfdd] rounded hover:shadow-lg"
            onClick={handleOpenTab}
          >
            View Schedule
          </button>
          <a
            className="px-4 py-2 mr-4 text-white duration-300 bg-[#5cbfdd] rounded hover:shadow-lg"
            id="update-schedule"
            href="http://thongtindaotao.sgu.edu.vn/default.aspx?page=thoikhoabieu&sta=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Update Schedule
          </a>
        </div>
        <div className="flex items-center justify-center mb-3">
          {/* create 2 button with svg previous day and next day */}
          <button
            className="flex items-center justify-center w-8 h-8 mr-4 text-white bg-[#5cbfdd] rounded-full duration-300 hover:shadow-lg hover:scale-105"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - 1);
              setCurrentDate(date);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <div className="flex items-center justify-center w-24 font-semibold">
            {currentDate.toLocaleDateString("vi-VN")}
          </div>
          <button
            className="flex items-center justify-center w-8 h-8 mr-4 text-white bg-[#5cbfdd] rounded-full duration-300 hover:shadow-lg hover:scale-105"
            onClick={() => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + 1);
              setCurrentDate(date);
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
        <SubjectList subjects={subjects} currentDate={currentDate} />
      </div>
    </div>
  );
}

export default Popup;
