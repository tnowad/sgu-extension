const getData = () => {
	const table = Array.from(document.querySelectorAll('.body-table tr'))
	let data = []
	const Thu = {
		Hai: 2,
		Ba: 3,
		Tư: 4,
		Năm: 5,
		Sáu: 6,
		Bảy: 7,
	}
	table.forEach((element) => {
		let subject = Array.from(element.querySelectorAll('td'))
			.reduce((previous, current) => {
				return previous + current.innerText + '|'
			}, '')
			.split('|')
		subject = {
			MaMH: subject[0],
			TenMH: subject[1],
			NhomMH: subject[2],
			STC: subject[3],
			MaLop: subject[4],
			STCHP: subject[5],
			KDK: subject[6],
			TH: subject[7],
			Thu: Thu[subject[8]],
			TietBD: parseInt(subject[9]),
			ST: parseInt(subject[10]),
			Phong: subject[11],
			CBGV: subject[12],
			Tuan: subject[13],
			color: '',
		}
		data.push(subject)
	})
	return data
}

const renderButton = () => {
	const button = document.createElement('button')
	button.textContent = 'Cập nhật thời khóa biểu'
	button.addEventListener('click', () => {
		const data = getData()
		chrome.storage.local.set({ tkb: JSON.stringify(data) }).then(() => {
			alert('Đã cập nhật thời khóa biểu!')
		})
	})
	document
		.querySelector(
			'#ctl00_ContentPlaceHolder1_ctl00_pnlHeader > table > tbody > tr:nth-child(1) > td',
		)
		.appendChild(button)
}

const render = async () => {
	const data = getData()
}

const autoStart = () => {
	const button = document.querySelector(
		'#ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet',
	)
	try {
		if (button.checked) {
			renderButton()
		}
	} catch {
		//
	}
}

autoStart()
