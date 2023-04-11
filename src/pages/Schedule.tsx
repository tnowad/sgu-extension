import { useStorage } from "../hooks";

function Schedule() {
  // load schedule data from chrome.storage.local.get("tkb")
  // then render the schedule

  const [schedule] = useStorage("tkb", []);

  return (
    <div>
      <h1>Schedule</h1>
      <pre>{JSON.stringify(schedule)}</pre>
    </div>
  );
}

export default Schedule;
