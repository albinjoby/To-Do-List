const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addtask() {
    if (inputbox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        let span = document.createElement("span");
        span.innerHTML = "✕";
        li.appendChild(span);
        listcontainer.appendChild(li);
    }
    inputbox.value = '';
    savedata();
    reorderTasks();
}

listcontainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savedata();
        reorderTasks(); // Reorder tasks whenever a task is toggled
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savedata();
    }
}, false);

function reorderTasks() {
    let tasks = Array.from(listcontainer.children);
    tasks.sort((a, b) => a.classList.contains('checked') - b.classList.contains('checked'));
    tasks.forEach(task => listcontainer.appendChild(task));
}

function savedata() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showtask() {
    listcontainer.innerHTML = localStorage.getItem("data");
    reorderTasks(); // Reorder tasks when showing them initially
}
showtask();

// Listen for the Enter key press event on the input box
inputbox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addtask();
    }
});