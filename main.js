// Definición de las variables del proyecto
const tasks = []; // Array para almacenar las tareas
let time = 0; // Variable para llevar el tiempo
let timer = null; // Variable para almacenar el temporizador principal
let timerBreak = null; // Variable para almacenar el temporizador de descanso
let current = null; // Variable para almacenar la tarea actual en ejecución

// Obtención de referencias a elementos del DOM
const bAdd = document.querySelector('#bAdd'); // Botón para agregar tareas (aunque no se usa en el código proporcionado)
const itTask = document.querySelector('#itTask'); // Campo de entrada para la nueva tarea
const form = document.querySelector('#idTask'); // Formulario para agregar una tarea

// Manejo del evento de envío del formulario
form.addEventListener('submit', e => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recarga de la página)

    // Si el campo de entrada no está vacío, crea una nueva tarea y renderiza la lista de tareas
    if (itTask.value !== '') {
        createTask(itTask.value); // Llama a la función para crear una nueva tarea con el valor del campo de entrada
        itTask.value = ''; // Limpia el campo de entrada
        renderTasks(); // Renderiza la lista actualizada de tareas
    }
});

// Función para crear una nueva tarea
function createTask(value) {
    // Crea un nuevo objeto de tarea con un identificador único, título y estado de completado
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3), // Genera un identificador único basado en un número aleatorio
        title: value, // Título de la tarea
        completed: false, // Estado de completado de la tarea (inicialmente no está completada)
    };
    // Añade la nueva tarea al principio del array de tareas
    tasks.unshift(newTask);
}

// Función de renderización para mostrar las tareas en el DOM
function renderTasks() {
    // Crea el HTML para cada tarea en el array 'tasks'
    const html = tasks.map((task) => {
        return `
        <div class="task">
            <div class="completed">
                ${task.completed
                ? `<span class="done">Done</span>`
                : `<button class="start-button" data-id="${task.id}">Iniciar</button>`} 
            </div>
            <div class="title">${task.title}</div> 
        </div>
        `;
    });

    // Obtiene el contenedor de tareas en el DOM y actualiza su contenido con el HTML generado
    const tasksContainer = document.querySelector("#Tasks");
    tasksContainer.innerHTML = html.join(''); // Une todas las cadenas HTML y las inserta en el contenedor
}
