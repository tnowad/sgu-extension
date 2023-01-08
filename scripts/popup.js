const show = document.querySelector('#show-tkb')
const update = document.querySelector('#update-tkb')
const setting = document.querySelector('#setting')

const menu = document.querySelector('body > div.menu')
const tkb = document.querySelector('body > div.tkb')

show.addEventListener('click', async () => {
	const data = JSON.parse((await chrome.storage.local.get('tkb'))['tkb'])
	menu.classList.remove('active')
	tkb.classList.add('active')
	tkb.innerHTML = templateTable()
	renderHTML(data)
})

const templateTable = () => {
	return `
		<div class="sgu-tkb-table">
			<div class="thu div1">Thứ 2</div>
			<div class="thu div2">Thứ 3</div>
			<div class="thu div3">Thứ 4</div>
			<div class="thu div4">Thứ 5</div>
			<div class="thu div5">Thứ 6</div>
			<div class="thu div6">Thứ 7</div>
			<div class="thu div8">Thứ 2</div>
			<div class="thu div9">Thứ 3</div>
			<div class="thu div10">Thứ 4</div>
			<div class="thu div11">Thứ 5</div>
			<div class="thu div12">Thứ 6</div>
			<div class="thu div13">Thứ 7</div>
			<div class="tiet div15">Tiết 1</div>
			<div class="tiet div16">Tiết 2</div>
			<div class="tiet div17">Tiết 3</div>
			<div class="tiet div18">Tiết 4</div>
			<div class="tiet div19">Tiết 5</div>
			<div class="tiet div20">Tiết 6</div>
			<div class="tiet div21">Tiết 7</div>
			<div class="tiet div22">Tiết 8</div>
			<div class="tiet div23">Tiết 9</div>
			<div class="tiet div24">Tiết 10</div>
			<div class="tiet div25">Tiết 11</div>
			<div class="tiet div26">Tiết 12</div>
			<div class="tiet div27">Tiết 13</div>
			<div class="tiet div30">Tiết 1</div>
			<div class="tiet div31">Tiết 2</div>
			<div class="tiet div32">Tiết 3</div>
			<div class="tiet div33">Tiết 4</div>
			<div class="tiet div34">Tiết 5</div>
			<div class="tiet div35">Tiết 6</div>
			<div class="tiet div36">Tiết 7</div>
			<div class="tiet div37">Tiết 8</div>
			<div class="tiet div38">Tiết 9</div>
			<div class="tiet div39">Tiết 10</div>
			<div class="tiet div40">Tiết 11</div>
			<div class="tiet div41">Tiết 12</div>
			<div class="tiet div42">Tiết 13</div>
		</div>`
}

const renderHTML = (dataSubject) => {
	let data = dataSubject
	const table = document.querySelector('.sgu-tkb-table')

	data.forEach((element) => {
		let subject = document.createElement('div')
		subject.innerHTML = `
				<h4>${element.TenMH}</h4>
				<span>Phòng: ${element.Phong}</span>
                ${element.TH ? `<span>Thực hành: ${element.TH}</span>` : ''}
			`
		subject.style = `
			grid-area: ${parseInt(element.TietBD) + 1} /
			${element.Thu}/
			${parseInt(element.TietBD) + parseInt(element.ST) + 1}/
			${element.Thu + 1};
			`
		subject.style.setProperty('color', `var(${element.color})`)
		subject.style.setProperty('background', `var(${element.color}-p)`)
		subject.classList.add('cell-subject')
		table.appendChild(subject)
	})
	let total = data.reduce(
		(previous, current) => previous + parseInt(current.ST),
		0,
	)
	for (let i = 0; i < 12 * 8 - total - 1; i++) {
		let temp = document.createElement('div')
		temp.classList.add('cell-empty')
		table.appendChild(temp)
	}
}
