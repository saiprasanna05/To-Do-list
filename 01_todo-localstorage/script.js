document.addEventListener("DOMContentLoaded", () => {
    let input = document.getElementById("todo-input");
    let addButton = document.getElementById("add-task-btn");
    let todo = document.getElementById("todo-list")


    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((n) => renderTask(n));

    addButton.addEventListener("click", () => {
        const taskText = input.value.trim();
        if (taskText === "") return;


        const newTasks = {
            id: Date.now(),
            text: taskText,
            status: false
        }

        tasks.push(newTasks);
        saveTask();
        renderTask(newTasks);
        input.value = "";




    })



    function renderTask(task) {
        const li = document.createElement("li");

        li.innerHTML = `<span>${task.text}</span>
        <div><button class = "combtn">${task.status ? "Not Compeleted" : "Compeleted"}</button><button class = "deleteBtn"><img src = "icons8-delete-24.png" alt=""></button></div>`;
        const com = li.querySelector(".combtn");
        const span = li.querySelector("span");
        const del = li.querySelector(".deleteBtn");
        console.log(task);


        if (task.status) {
            span.classList.add("completed");
        }

        if (com) {
            com.addEventListener("click", () => {
                task.status = !task.status;
                console.log("text");


                if (task.status == true) {
                    com.innerHTML = "Not Compeleted";
                    span.classList.add("completed")
                } else if (task.status == false) {
                    com.innerHTML = "Compeleted";
                    span.classList.remove("completed")
                }

                saveTask();
            })
        }

        del.addEventListener("click", (e) => {
            e.stopPropagation()
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTask();

        })


        todo.appendChild(li);
        saveTask();

    }

    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }





})


