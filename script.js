let tempoRestante = 3600; // 1 horas em segundos
let cronometroInterval = null;
let isRunning = false;

const tempoElemento = document.getElementById('tempo');
const iniciarBtn = document.getElementById('iniciarBtn');
const addMinuteBtn = document.getElementById('addMinuteBtn');
const message = document.getElementById('message');

// Formata segundos para HH:MM:SS
function formatarTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    return `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundosRestantes.toString().padStart(2,'0')}`;
}

function atualizarCronometro() {
    tempoElemento.textContent = formatarTempo(tempoRestante);
}

function iniciarCronometro() {
    if (isRunning) return;
    isRunning = true;
    message.textContent = 'Timer started';
    iniciarBtn.textContent = 'Pause';
    iniciarBtn.setAttribute('aria-pressed', 'true');
    addMinuteBtn.disabled = false;

    cronometroInterval = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarCronometro();
        } else {
            clearInterval(cronometroInterval);
            isRunning = false;
            message.textContent = 'Time out! Please restart.';
            iniciarBtn.textContent = 'Restart';
            iniciarBtn.setAttribute('aria-pressed', 'false');
            addMinuteBtn.disabled = true;
        }
    }, 1000);
}

function pausarCronometro() {
    if (!isRunning) return;
    clearInterval(cronometroInterval);
    isRunning = false;
    message.textContent = 'Paused';
    iniciarBtn.textContent = 'Continue';
    iniciarBtn.setAttribute('aria-pressed', 'false');
}

function reiniciarCronometro() {
    tempoRestante = 10800;
    atualizarCronometro();
    message.textContent = 'Ready to start';
    iniciarBtn.textContent = 'Start';
    iniciarBtn.setAttribute('aria-pressed', 'false');
    isRunning = false;
    addMinuteBtn.disabled = false;
}

iniciarBtn.addEventListener('click', () => {
    if (!isRunning && tempoRestante > 0) {
        iniciarCronometro();
    } else if (isRunning) {
        pausarCronometro();
    } else if (tempoRestante === 0) {
        reiniciarCronometro();
    }
});

addMinuteBtn.addEventListener('click', () => {
    if (tempoRestante === 0) return;
    tempoRestante += 60;
    atualizarCronometro();
    message.textContent = '1 minute added';
});

// Inicializa cronômetro na tela
atualizarCronometro();
