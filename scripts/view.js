import { renderHTML } from './render.js'
const table = document.querySelector('.tkb-table')
table.innerHTML += await renderHTML()
