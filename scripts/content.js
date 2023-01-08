const fillColor = (data) => {
	let color = 0
	for (let index = 0; index < data.length; index++) {
		if (data[index].color == undefined) {
			data[index].color =
				data.find(
					(subject) =>
						subject.MaMH == data[index].MaMH &&
						subject.color != undefined,
				)?.color || color++
		}
	}

	data.sort((a, b) => a.color - b.color)

	return data
}

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
		console.log(
			element.querySelector('td[onmouseover]').attributes.onmouseover,
		)
		let subject = Array.from(element.querySelectorAll('td'))
			.reduce((previous, current) => {
				return previous + current.innerText + '|'
			}, '')
			.split('|')
		data.push({
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
		})
	})
	data = fillColor(data)
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

const autoStart = () => {
	const button = document.querySelector(
		'#ctl00_ContentPlaceHolder1_ctl00_rad_ThuTiet',
	)
	if (button && button.checked) {
		renderButton()
	}
}

autoStart()

console.log(getData())
