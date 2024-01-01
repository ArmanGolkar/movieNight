import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-bb3b8-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const movieListInDB = ref(database, "Movies")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const movieListEl = document.getElementById("movie-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(movieListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(movieListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearmovieListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTomovieListEl(currentItem)
        }    
    } else {
        movieListEl.innerHTML = "No items here... yet"
    }
})

function clearmovieListEl() {
    movieListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemTomovieListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `Movies/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    movieListEl.append(newEl)
}