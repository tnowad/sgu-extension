const getData = async () => {
	const data = JSON.parse((await chrome.storage.local.get('tkb'))['tkb'])
	return data
}

const getSetting = async () => {
	const setting = JSON.parse(
		await chrome.storage.local.get('setting')['setting'],
	)
}

const renderHTML = async () => {
	const data = await getData()
	return data.reduce((previousValue, currentValue) => {
		return (
			previousValue +
			`<div 
				class="subject"
				style="
					--Thu: ${currentValue.Thu};
					--TietBD: ${currentValue.TietBD};
					--ST: ${currentValue.ST};
					color: var(--primary-color--${currentValue.color});
					border-color: var(--secondary-color--${currentValue.color});
					background-color: var(--tertiary-color--${currentValue.color});">
				<p class="subject--TenMH">${currentValue.TenMH}</p>
				${currentValue.TH && `<p class="subject--TH">Thực hành: ${currentValue.TH}</p>`}
				<p class="subject--Phong">Phòng: ${currentValue.Phong}</p>
			</div>`
		)
	}, '')
}

export { getData, getSetting, renderHTML }
