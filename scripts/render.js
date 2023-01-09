const getData = async () => {
	const data = JSON.parse((await chrome.storage.local.get('tkb'))['tkb'])
	return data
}

const getSetting = () => {

}

const renderHTML = () => {}

export default renderHTML
