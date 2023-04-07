const fillColor = (data) => {
  let colorIndex = 0;
  const colorsMap = new Map(); // map to store color indexes by MaMH

  for (const item of data) {
    if (item.color === undefined) {
      const key = item.MaMH;
      const existingColor = colorsMap.get(key);
      const color = existingColor !== undefined ? existingColor : colorIndex++;
      item.color = color;
      colorsMap.set(key, color);
    }
  }

  data.sort((a, b) => a.color - b.color);

  return data;
};

const parseDayOfWeek = (day) => {
  const daysOfWeek = {
    Hai: 2,
    Ba: 3,
    Tư: 4,
    Năm: 5,
    Sáu: 6,
    Bảy: 7,
  };
  return daysOfWeek[day];
};

const parseWeeks = (weeksText) => {
  const weeks = weeksText.split("--").map((week) => {
    return new Date(week.replace(/(\d+[/])(\d+[/])/, "$2$1"));
  });
  return weeks;
};

const parseSubject = (tdElements) => {
  const subjectText = tdElements.reduce((previous, current) => {
    return previous + current.innerText + "|";
  }, "");
  const subjectFields = subjectText.split("|");
  const subject = {
    MaMH: subjectFields[0],
    TenMH: subjectFields[1],
    NhomMH: subjectFields[2],
    STC: subjectFields[3],
    MaLop: subjectFields[4],
    STCHP: subjectFields[5],
    KDK: subjectFields[6],
    TH: subjectFields[7],
    Thu: parseDayOfWeek(subjectFields[8]),
    TietBD: parseInt(subjectFields[9]),
    ST: parseInt(subjectFields[10]),
    Phong: subjectFields[11],
    CBGV: subjectFields[12],
    Tuan: parseWeeks(tdElements[13].innerHTML.split("'")[1]),
  };
  return subject;
};

const getData = () => {
  const trElements = Array.from(document.querySelectorAll(".body-table tr"));
  const data = trElements.map((trElement) => {
    const tdElements = Array.from(trElement.querySelectorAll("td"));
    const subject = parseSubject(tdElements);
    return subject;
  });
  const coloredData = fillColor(data);
  return coloredData;
};

console.log(getData());

const updateSchedule = () => {
  const data = getData();
  chrome.storage.local.set({ tkb: JSON.stringify(data) }).then(() => {
    alert("Đã cập nhật thời khóa biểu!");
  });
};

const createUpdateButton = () => {
  const button = document.createElement("button");
  button.textContent = "Cập nhật thời khóa biểu";
  button.addEventListener("click", updateSchedule);
  const headerCell = document.querySelector(
    "#ctl00_ContentPlaceHolder1_ctl00_pnlHeader > table > tbody > tr:nth-child(1) > td"
  );
  headerCell.appendChild(button);
};

const tryAutoStart = () => {
  const scheduleTabButton = document.querySelector(
    "#ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet"
  );
  if (scheduleTabButton && scheduleTabButton.checked) {
    createUpdateButton();
  }
};

tryAutoStart();
