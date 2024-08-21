// Definición de las variables del proyecto
const tasks = []; // Array para almacenar las tareas, cada tarea será un objeto con un id, título y estado de completado
let time = 0; // Variable para llevar el tiempo restante en segundos
let timer = null; // Variable para almacenar el temporizador principal
let timerBreak = null; // Variable para almacenar el temporizador de descanso
let current = null; // Variable para almacenar el ID de la tarea actual en ejecución

// Obtención de referencias a elementos del DOM
const itTask = document.querySelector('#itTask'); // Campo de entrada para la nueva tarea
const form = document.querySelector('#idTask'); // Formulario para agregar una tarea
const taskName = document.querySelector('#time #taskname'); // Elemento para mostrar el nombre de la tarea actual

// Renderiza las tareas y el tiempo inicial
renderTasks();
renderTime();

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
                ? `<span class="done">Finalizada</span>` // Muestra "Finalizada" si la tarea está completada
                : `<button class="start-button" data-id="${task.id}">Iniciar</button>`} 
            </div>
            <div class="title">${task.title}</div> 
        </div>
        `;
    });

    // Obtiene el contenedor de tareas en el DOM y actualiza su contenido con el HTML generado
    const tasksContainer = document.querySelector("#Tasks");
    tasksContainer.innerHTML = html.join(''); // Une todas las cadenas HTML y las inserta en el contenedor

    // Obtiene todos los botones de inicio de tarea
    const startButtons = document.querySelectorAll('.task .start-button');
    startButtons.forEach((button) => {
        // Asigna el evento de click al botón de iniciar
        button.addEventListener('click', (e) => {
            if (!timer) { // Asegura que no haya un temporizador en curso antes de iniciar uno nuevo
                const id = button.getAttribute('data-id'); // Obtiene el ID de la tarea desde el atributo 'data-id'
                startButtonHandler(id); // Maneja el inicio del temporizador para la tarea seleccionada
                button.textContent = 'En progreso'; // Cambia el texto del botón para indicar que la tarea está en progreso
            }
        });
    });
}

// Función para manejar el inicio del temporizador
function startButtonHandler(id) {
    time = 3 * 60; // Configura el temporizador para 3 minutos (180 segundos)
    current = id; // Establece la tarea actual en ejecución
    const taskIndex = tasks.findIndex(task => task.id === id); // Encuentra el índice de la tarea actual en el array 'tasks'
    taskName.textContent = tasks[taskIndex].title; // Muestra el nombre de la tarea actual en el DOM

    // Inicia el temporizador
    timer = setInterval(() => {
        timeHandler(id); // Llama a la función para manejar el conteo regresivo del temporizador
    }, 1000); // Llama a la función cada segundo
}

// Función para manejar el conteo regresivo del temporizador
function timeHandler(id) {
    time--; // Decrementa el tiempo restante en segundos
    renderTime(); // Actualiza la visualización del tiempo

    // Si el tiempo llega a cero, detiene el temporizador y realiza otras acciones
    if (time <= 0) {
        clearInterval(timer); // Detiene el temporizador
        markCompleted(id); // Marca la tarea como completada
        timer = null; // Resetea la variable del temporizador
        renderTasks(); // Actualiza la lista de tareas para reflejar los cambios
        startBreak(); // Inicia el temporizador de descanso
    }
}

// Función para renderizar el tiempo restante en el DOM
function renderTime() {
    const timeDiv = document.querySelector("#time #value"); // Elemento para mostrar el tiempo restante
    const minutes = Math.floor(time / 60); // Calcula los minutos
    const seconds = time % 60; // Calcula los segundos

    // Formatea el tiempo para mostrarlo siempre con dos dígitos
    timeDiv.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Función para marcar una tarea como completada
function markCompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id === id); // Encuentra el índice de la tarea en el array 'tasks'
    tasks[taskIndex].completed = true; // Marca la tarea como completada
    current = null; // Limpia la tarea actual en ejecución
}

// Función para iniciar el temporizador de descanso
function startBreak() {
    time = 1 * 60; // Configura el temporizador para 1 minuto (60 segundos)
    taskName.textContent = 'Pausa'; // Muestra "Pausa" en el elemento para indicar el periodo de descanso
    timerBreak = setInterval(() => {
        timerBreakHandler(); // Llama a la función para manejar el conteo regresivo del temporizador de descanso
    }, 1000); // Llama a la función cada segundo
}

// Función para manejar el conteo regresivo del temporizador de descanso
function timerBreakHandler() {
    time--; // Decrementa el tiempo restante en segundos
    renderTime(); // Actualiza la visualización del tiempo

    // Si el tiempo de descanso llega a cero, detiene el temporizador y limpia la tarea actual
    if (time <= 0) {
        clearInterval(timerBreak); // Detiene el temporizador de descanso
        timerBreak = null; // Resetea la variable del temporizador de descanso
        current = null; // Limpia la tarea actual en ejecución
        taskName.textContent = ''; // Limpia el nombre de la tarea actual en el DOM
        renderTasks(); // Actualiza la lista de tareas
    }
}
