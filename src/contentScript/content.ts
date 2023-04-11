const createUpdateButton = () => {
  const button = document.createElement("button");
  button.textContent = "Cập nhật thời khóa biểu";

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

export {};
