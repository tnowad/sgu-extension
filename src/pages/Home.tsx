import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const handleOpenTab = () => {
    chrome.tabs.create(
      { url: chrome.runtime.getURL("index.html#/about") },
      () => {
        navigate("/about");
      }
    );
  };
  return (
    <div>
      <h1>Home</h1>
      <h1>Test</h1>
      <button onClick={handleOpenTab}>Open Tab</button>
    </div>
  );
}

export default Home;
