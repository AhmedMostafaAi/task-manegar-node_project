document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    setupDarkMode();
});


// Function to setup dark mode based on localStorage
const setupDarkMode = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
};

// const darkModeToggle = document.getElementById("dark-mode-toggle");
// const body = document.body;

// // Load user preference from localStorage
// const darkMode = localStorage.getItem("dark-mode");

// if (darkMode === "enabled") {
//   body.classList.add("dark-mode");
// }

// darkModeToggle.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");

//   // Save user preference
//   if (body.classList.contains("dark-mode")) {
//     localStorage.setItem("dark-mode", "enabled");
//   } else {
//     localStorage.setItem("dark-mode", "disabled");
//   }
// });

const tasksDOM = document.querySelector('.tasks');
console.log('Tasks DOM element:', tasksDOM);
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');

// Load tasks from API
const showTasks = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const response = await axios.get('/api/v1/tasks');
        console.log('Fetching tasks...');
        console.log('Full API Response:', response.data);

        const { tasks } = response.data;

        if (!Array.isArray(tasks)) {
            console.error('Error: tasks is not an array', tasks);
            tasksDOM.innerHTML = '<h5 class="empty-list">Invalid data format received</h5>';
            loadingDOM.style.visibility = 'hidden';
            return;
        }

        if (tasks.length === 0) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
            loadingDOM.style.visibility = 'hidden';
            return;
        }

        const allTasks = tasks.map((task) => {
            if (!task._id || !task.name) {
                console.error('Invalid task structure:', task);
                return '';
            }

            return `
                <div class="single-task ${task.completed ? 'task-completed' : ''}">
                    <h5><span><i class="far fa-check-circle"></i></span>${task.name}</h5>
                    <div class="task-links">
                        <a href="task.html?id=${task._id}" class="edit-link"><i class="fas fa-edit"></i></a>
                        <button type="button" class="delete-btn" data-id="${task._id}"><i class="fas fa-trash"></i></button>
                    </div>
                </div>`;
        }).join('');

        console.log('Generated HTML:', allTasks);
        tasksDOM.innerHTML = allTasks;
        console.log('Tasks displayed successfully!');
        
    } catch (error) {
        console.error('API Request Failed:', error.response ? error.response.data : error.message);
        tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
    }
    loadingDOM.style.visibility = 'hidden';
};

// Delete Task
tasksDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible';
        const id = el.parentElement.dataset.id;
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.error('Failed to delete task:', error.response ? error.response.data : error.message);
        }
        loadingDOM.style.visibility = 'hidden';
    }
});

// Handle Task Submission
formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = taskInputDOM.value.trim();

    if (!name) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = `Task name cannot be empty`;
        return;
    }

    try {
        await axios.post('/api/v1/tasks', { name });
        showTasks();
        taskInputDOM.value = '';
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Success, task added`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        console.error('Failed to add task:', error.response ? error.response.data : error.message);
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = `Error, please try again`;
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
});