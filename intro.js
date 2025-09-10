// intro.js - Pantalla de carga retro cyberpunk
document.addEventListener('DOMContentLoaded', function() {
    // Crear el overlay de carga
    const introOverlay = document.createElement('div');
    introOverlay.id = 'cyberpunk-intro';
    introOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0a0a12;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Share Tech Mono', monospace;
        color: #00ff41;
        overflow: hidden;
    `;

    // Efecto de scanlines
    const scanlines = document.createElement('div');
    scanlines.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, 
                    rgba(255, 255, 255, 0.03) 50%, 
                    rgba(0, 0, 0, 0.1) 50%);
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 1;
    `;
    introOverlay.appendChild(scanlines);

    // Efecto de ruido
    const noise = document.createElement('div');
    noise.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.05;
        pointer-events: none;
        z-index: 2;
    `;
    introOverlay.appendChild(noise);

    // Contenedor principal
    const container = document.createElement('div');
    container.style.cssText = `
        position: relative;
        z-index: 3;
        text-align: center;
        padding: 20px;
        border: 1px solid #00ff41;
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        max-width: 600px;
        width: 80%;
    `;
    introOverlay.appendChild(container);

    // Título
    const title = document.createElement('h1');
    title.textContent = 'SYSTEM BOOT';
    title.style.cssText = `
        font-size: 2.5rem;
        margin-bottom: 30px;
        text-shadow: 0 0 10px #00ff41;
        animation: flicker 3s infinite alternate;
        color: #00ff41;
        font-family: 'Orbitron', monospace;
    `;
    container.appendChild(title);

    // Barra de progreso
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        width: 100%;
        height: 20px;
        background-color: #222;
        border-radius: 10px;
        margin: 20px 0;
        overflow: hidden;
        position: relative;
    `;
    container.appendChild(progressContainer);

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #00ff41, #ff00ff);
        border-radius: 10px;
        width: 0%;
        transition: width 0.5s ease;
    `;
    progressContainer.appendChild(progressBar);

    // Texto de estado
    const statusText = document.createElement('div');
    statusText.id = 'boot-status';
    statusText.textContent = 'Inicializando sistema...';
    statusText.style.cssText = `
        font-size: 1rem;
        margin: 10px 0;
        min-height: 20px;
        color: #00ffff;
    `;
    container.appendChild(statusText);

    // Mensajes de consola
    const consoleOutput = document.createElement('div');
    consoleOutput.id = 'console-output';
    consoleOutput.style.cssText = `
        text-align: left;
        margin: 20px 0;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid #00ff41;
        height: 150px;
        overflow-y: auto;
        font-size: 0.9rem;
        line-height: 1.4;
    `;

    // Estilo para la barra de desplazamiento
    consoleOutput.style.scrollbarWidth = 'thin';
    consoleOutput.style.scrollbarColor = '#00ff41 #000';
    consoleOutput.innerHTML = `
        <style>
            #console-output::-webkit-scrollbar {
                width: 8px;
            }
            #console-output::-webkit-scrollbar-track {
                background: #000;
            }
            #console-output::-webkit-scrollbar-thumb {
                background: #00ff41;
                border-radius: 4px;
            }
        </style>
    `;
    container.appendChild(consoleOutput);

    // Añadir al body
    document.body.appendChild(introOverlay);
    document.body.style.overflow = 'hidden';

    // Mensajes de booteo simulados
    const bootMessages = [
        "> Iniciando sistema operativo...",
        "> Cargando módulos del kernel...",
        "> Inicializando controladores de hardware...",
        "> Montando sistemas de archivos...",
        "> Verificando integridad del sistema...",
        "> Cargando servicios del sistema...",
        "> Conectando con base de datos...",
        "> Iniciando interfaz de usuario...",
        "> Cargando recursos multimedia...",
        "> Sistema listo para el usuario..."
    ];

    // Simular proceso de booteo
    let currentProgress = 0;
    let currentMessage = 0;

    function updateBootProgress() {
        if (currentProgress < 100) {
            currentProgress += Math.random() * 5;
            if (currentProgress > 100) currentProgress = 100;
            
            progressBar.style.width = currentProgress + '%';
            
            // Añadir mensajes según el progreso
            if (currentMessage < bootMessages.length && 
                currentProgress >= (currentMessage + 1) * (100 / bootMessages.length)) {
                
                const messageElement = document.createElement('div');
                messageElement.textContent = bootMessages[currentMessage];
                messageElement.style.marginBottom = '5px';
                consoleOutput.appendChild(messageElement);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
                
                currentMessage++;
            }
            
            statusText.textContent = `Cargando sistema... ${Math.floor(currentProgress)}%`;
            
            setTimeout(updateBootProgress, 100 + Math.random() * 200);
        } else {
            // Finalizar booteo
            statusText.textContent = "Sistema listo. Iniciando...";
            
            setTimeout(() => {
                // Efecto de desvanecimiento
                introOverlay.style.opacity = '0';
                introOverlay.style.transition = 'opacity 1s ease';
                
                setTimeout(() => {
                    document.body.removeChild(introOverlay);
                    document.body.style.overflow = 'auto';
                    
                    // Iniciar efectos de la página principal
                    if (typeof initPageEffects === 'function') {
                        initPageEffects();
                    }
                }, 1000);
            }, 1000);
        }
    }

    // Iniciar la animación de booteo
    setTimeout(updateBootProgress, 500);

    // Añadir estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41;
                opacity: 1;
            }
            20%, 24%, 55% {
                text-shadow: none;
                opacity: 0.7;
            }
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Función para iniciar efectos de la página principal (si es necesario)
function initPageEffects() {
    console.log("Página principal cargada y lista");
    // Aquí puedes inicializar cualquier efecto que necesites después de la intro
}
