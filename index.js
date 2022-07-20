let history = []
const inputEl = document.getElementById('input-el');
const inputButton = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-btn");
// localStorage.clear()
const historyFromLocalStorage = JSON.parse(localStorage.getItem('history'));

const renderHistory = (leads) =>{
    let listItems = " "
    leads.forEach(item => (
        // listItems += "<li><a target='_blank' href='" + item + "'>" + item + "</a></li>"
        listItems += `
        <li>
        <a target='_blank' href='${item}'>${item}</a>
        </li>
        `
    ))
    ulEl.innerHTML = listItems
}

if (historyFromLocalStorage){
    history = historyFromLocalStorage
    renderHistory(history)

}

// const tabs = [
//     {url: "https//:www.google.co"}
// ] to get te value of the pair of the object, tabs[0].url

saveTabBtn.addEventListener("click", () =>{

    //grab the current tab, we use goggle chrome developers docs
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        history.push(tabs[0].url)
        localStorage.setItem("history", JSON.stringify(history))
        renderHistory(history)
    })
})

inputButton.addEventListener("click", () =>{
    history.push(inputEl.value);
    inputEl.value = "";
    //when saving data to local storage, we convert all variables into strings and
    //when fetching data we also convert them from strings
    localStorage.setItem('history', JSON.stringify(history));
    renderHistory(history);
    // console.log(localStorage.getItem('history'));
})

deleteBtn.addEventListener("click", () =>{
   localStorage.clear();
   history = [];
   renderHistory(history);
   alert('Delete History')
   
})
