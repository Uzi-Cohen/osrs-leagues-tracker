// Add event listeners to all individual task checkboxes
document.querySelectorAll('.task input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.classList.add('completed');
        } else {
            label.classList.remove('completed');
        }

        // Update the category styling based on task completion
        updateCategory(this);
    });
});

// Reset all tasks and categories
function resetTasks() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        const label = checkbox.nextElementSibling;
        label.classList.remove('completed');
    });

    document.querySelectorAll('.task-category').forEach(category => {
        category.classList.remove('completed');
    });
}

// Initialize functionality for category headers
document.querySelectorAll('.task-category').forEach(category => {
    // Find all tasks under this category
    const tasks = [];
    let nextElement = category.nextElementSibling;
    while (nextElement && nextElement.classList.contains('task')) {
        tasks.push(nextElement.querySelector('input[type="checkbox"]'));
        nextElement = nextElement.nextElementSibling;
    }

    // Clicking the category toggles all tasks beneath it
    category.addEventListener('click', function () {
        const allChecked = tasks.every(task => task.checked);
        tasks.forEach(task => {
            task.checked = !allChecked;
            const label = task.nextElementSibling;
            if (!allChecked) {
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
        });

        // Update the category styling
        updateCategoryHeader(category, tasks);
    });
});

// Update category styling dynamically based on task completion
function updateCategory(taskCheckbox) {
    const category = taskCheckbox.closest('.task').previousElementSibling;
    if (!category || !category.classList.contains('task-category')) return;

    const tasks = [];
    let nextElement = category.nextElementSibling;
    while (nextElement && nextElement.classList.contains('task')) {
        tasks.push(nextElement.querySelector('input[type="checkbox"]'));
        nextElement = nextElement.nextElementSibling;
    }

    updateCategoryHeader(category, tasks);
}

// Update category header styling
function updateCategoryHeader(category, tasks) {
    const allChecked = tasks.every(task => task.checked);

    if (allChecked) {
        category.classList.add('completed');
    } else {
        category.classList.remove('completed');
    }
}
