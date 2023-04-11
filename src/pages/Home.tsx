import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleOpenTab = () => {
    chrome.tabs.create(
      { url: chrome.runtime.getURL("index.html#/schedule") },
      () => {
        navigate("/schedule");
      }
    );
  };
  return (
    <div className="font-sans text-base bg-gray-200 w-96">
      <div className="container max-w-screen-md px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">SGU Schedule</h1>
        <div className="flex justify-center mb-8">
          <button
            className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
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
        <ul className="space-y-4">
          <li>
            <div className="px-4 py-3 transition-shadow duration-500 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  You don't have subject today!!! 😍
                </div>
                <div className="italic">-</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
