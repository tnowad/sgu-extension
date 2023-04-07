const getData = async () => {
  const data = JSON.parse((await chrome.storage.local.get("tkb"))["tkb"]);
  return data;
};

const renderHTML = async () => {
  const data = await getData();
  console.log(data);
  let count = 0;
  let html = data.reduce((previousValue, currentValue) => {
    count = count + currentValue.ST;
    return (
      previousValue +
      `<div class="cell subject" style="
        --Thu: ${currentValue.Thu}; --TietBD: ${currentValue.TietBD};
        --ST: ${currentValue.ST};
        color: var(--primary-color--${currentValue.color});
        border-color: var(--secondary-color--${currentValue.color});
				background-color: var(--tertiary-color--${currentValue.color});">
				<p class="subject--TenMH">${currentValue.TenMH}</p>
				${currentValue.TH && `<p class="subject--TH">Thực hành: ${currentValue.TH}</p>`}
				<p class="subject--Phong">Phòng: ${currentValue.Phong}</p>
			</div>`
    );
  }, "");
  for (let index = 0; index < 82 - count; index++) {
    html += `<div class="cell"></div>`;
  }
  return html;
};

export { getData, renderHTML };
