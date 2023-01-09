const getData = async () => {
	const data = JSON.parse((await chrome.storage.local.get('tkb'))['tkb'])
	return data
}

const getSetting = async () => {
    const setting = JSON.parse(await chrome.storage.local.get('setting')['setting'])
}

const renderHTML = () => {}

export default renderHTML
