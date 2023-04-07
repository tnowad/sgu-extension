import { renderHTML } from "./render.js";

const table = document.querySelector(".tkb-table");
const styleEditor = document.querySelector("#css-style");
const style = document.querySelector("#style");
const save = document.querySelector("#save");

table.innerHTML += await renderHTML();

styleEditor.innerHTML = style.innerHTML;

styleEditor.addEventListener("change", (event) => {
  style.innerHTML = event.target.value;
});

save.addEventListener("click", () => {
  chrome.storage.local.set({ css: styleEditor.innerHTML });
});
