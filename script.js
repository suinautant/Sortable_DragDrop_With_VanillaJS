const draggablesEl = document.querySelectorAll('.draggable');
const containersEl = document.querySelectorAll('.container');

draggablesEl.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
});

containersEl.forEach((container) => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterEl = getDragAfterElement(container, e.clientY);
        const draggableEl = document.querySelector('.dragging');
        if (afterEl == null) {
            container.appendChild(draggableEl);
        } else {
            container.insertBefore(draggableEl, afterEl);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableEls = [
        ...container.querySelectorAll('draggable:not(.dragging)'),
    ];

    return draggableEls.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            console.log(offset);
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.POSITIVE_INFINITY }
    ).element;
}
