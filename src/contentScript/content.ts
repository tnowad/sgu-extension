import { Subject } from "../types";
import { fillColor, parseSubject } from "../utils";
const getData = (): Subject[] => {
  const trElements = Array.from(document.querySelectorAll(".body-table tr"));
  const data = trElements.map((trElement) =>
    parseSubject(Array.from(trElement.querySelectorAll("td")))
  );

  return fillColor(data);
};

const updateSchedule = (): void => {
  const data = getData();
  chrome.storage.local.set({ schedule: JSON.stringify(data) }).then(() => {
    alert("Schedule updated!");
  });
};

const createUpdateButton = () => {
  const button = document.createElement("button");
  button.textContent = "Update Schedule";
  button.addEventListener("click", updateSchedule);
  const headerCell = document.querySelector<HTMLTableCellElement>(
    "#ctl00_ContentPlaceHolder1_ctl00_pnlHeader > table > tbody > tr:nth-child(1) > td"
  );
  headerCell?.appendChild(button);
};

const tryAutoStart = () => {
  const scheduleTabButton = document.querySelector<HTMLInputElement>(
    "#ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet"
  );

  if (scheduleTabButton && scheduleTabButton.checked) {
    createUpdateButton();
  }
};
tryAutoStart();
