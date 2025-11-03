const tempoElemento = document.getElementById('tempo');
const iniciarBtn = document.getElementById('iniciarBtn');
const addMinuteBtn = document.getElementById('addMinuteBtn');
const mensagemTexto = document.getElementById('mensagemTexto'); // span separado

let tempoRestante = 3600; // 1 hora
let cronometroInterval = null;
let isRunning = false;

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
    mensagemTexto.textContent = 'Timer started!';
    iniciarBtn.textContent = 'PAUSE';
    addMinuteBtn.disabled = false;

    cronometroInterval = setInterval(() => {
        if (tempoRestante > 0) {
            tempoRestante--;
            atualizarCronometro();
        } else {
            clearInterval(cronometroInterval);
            isRunning = false;
            mensagemTexto.textContent = 'Time out! Please restart.';
            iniciarBtn.textContent = 'RESTART';
            addMinuteBtn.disabled = true;
        }
    }, 1000);
}

function pausarCronometro() {
    if (!isRunning) return;
    clearInterval(cronometroInterval);
    isRunning = false;
    mensagemTexto.textContent = 'Paused';
    iniciarBtn.textContent = 'CONTINUE';
}

function reiniciarCronometro() {
    tempoRestante = 3600;
    atualizarCronometro();
    mensagemTexto.textContent = 'Ready to start';
    iniciarBtn.textContent = 'START';
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
    mensagemTexto.textContent = '1 minute added!';
});

// Inicializa cronômetro
atualizarCronometro();
