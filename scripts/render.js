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
			`<div class = "subject" style = "--Thu: ${currentValue.Thu}; --TietBD: ${currentValue.TietBD}; --ST: ${currentValue.ST}">
			</div>`
		)
	}, '')
}

export { getData, getSetting, renderHTML }
