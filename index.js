let url = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("url"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    url = leadsFromLocalStorage
    render(url)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        url.push(tabs[0].url)
        localStorage.setItem("url", JSON.stringify(url))
        render(url)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    url = []
    render(url)
})

inputBtn.addEventListener("click", function () {
    url.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("url", JSON.stringify(url))
    render(url)
})