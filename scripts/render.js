const getData = async () => {
	const data = JSON.parse((await chrome.storage.local.get('tkb'))['tkb'])
}
