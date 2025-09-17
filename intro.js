// intro-oldschool.js – Pantalla de carga retro 2000s
document.addEventListener('DOMContentLoaded', function() {
  const introOverlay = document.createElement('div');
  introOverlay.id = 'oldschool-intro';
  introOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #00ff00;
    font-family: "Courier New", monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    width: 600px;
    max-width: 90%;
    border: 2px solid #00ff00;
    background-color: #000;
    padding: 20px;
    text-align: left;
  `;
  introOverlay.appendChild(container);

  // Título tipo BIOS
  const title = document.createElement('div');
  title.textContent = '== SYSTEM BOOT ==';
  title.style.cssText = `
    font-size: 1.5rem;
    margin-bottom: 10px;
    text-align: center;
  `;
  container.appendChild(title);

  // Barra de progreso estilo Windows viejo
  const progressContainer = document.createElement('div');
  progressContainer.style.cssText = `
    width: 100%;
    height: 20px;
    background-color: #333;
    border: 1px solid #00ff00;
    margin: 10px 0;
    overflow: hidden;
  `;
  container.appendChild(progressContainer);

  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    height: 100%;
    width: 0%;
    background-image: repeating-linear-gradient(
      45deg,
      #00ff00,
      #00ff00 10px,
      #009900 10px,
      #009900 20px
    );
    transition: width 0.4s linear;
  `;
  progressContainer.appendChild(progressBar);

  // Texto de estado
  const statusText = document.createElement('div');
  statusText.textContent = 'Inicializando sistema...';
  statusText.style.cssText = `
    font-size: 1rem;
    margin-top: 5px;
  `;
  container.appendChild(statusText);

  // Consola tipo DOS
  const consoleOutput = document.createElement('div');
  consoleOutput.style.cssText = `
    height: 150px;
    overflow-y: auto;
    font-size: 0.9rem;
    margin-top: 10px;
    background-color: #000;
    padding: 5px;
    border: 1px solid #00ff00;
    white-space: pre;
  `;
  container.appendChild(consoleOutput);

  document.body.appendChild(introOverlay);
  document.body.style.overflow = 'hidden';

  const bootMessages = [
    "Cargando controladores...",
    "Comprobando disco...",
    "Iniciando servicios...",
    "Configurando red...",
    "Cargando interfaz...",
    "Preparando entorno gráfico...",
    "Sistema operativo listo."
  ];

  let currentProgress = 0;
  let currentMessage = 0;

  function updateBootProgress() {
    if (currentProgress < 100) {
      currentProgress += Math.random() * 8;
      if (currentProgress > 100) currentProgress = 100;

      progressBar.style.width = currentProgress + '%';

      if (currentMessage < bootMessages.length &&
        currentProgress >= (currentMessage + 1) * (100 / bootMessages.length)) {

        const line = document.createElement('div');
        line.textContent = "> " + bootMessages[currentMessage];
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;

        currentMessage++;
      }

      statusText.textContent = `Cargando... ${Math.floor(currentProgress)}%`;

      setTimeout(updateBootProgress, 150 + Math.random() * 200);
    } else {
      statusText.textContent = "Sistema listo. Presione cualquier tecla...";
      setTimeout(() => {
        introOverlay.style.opacity = '0';
        introOverlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
          document.body.removeChild(introOverlay);
          document.body.style.overflow = 'auto';
          if (typeof initPageEffects === 'function') initPageEffects();
        }, 500);
      }, 1000);
    }
  }

  setTimeout(updateBootProgress, 500);
});

function initPageEffects() {
  console.log("Página principal cargada y lista");
}
