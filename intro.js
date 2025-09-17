<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pantalla de Carga Estilo Old Brother</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #C0C0C0;
            font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Arial, sans-serif;
            overflow: hidden;
        }
        
        #oldbrother-intro {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #000080 0%, #1084d0 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #FFFFFF;
        }
        
        .window {
            width: 500px;
            background-color: #C0C0C0;
            border: 2px solid;
            border-top-color: #FFFFFF;
            border-left-color: #FFFFFF;
            border-right-color: #808080;
            border-bottom-color: #808080;
            padding: 3px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
        }
        
        .title-bar {
            background: linear-gradient(90deg, #000080, #1084d0);
            color: white;
            padding: 2px 5px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .window-content {
            padding: 15px;
            color: #000;
        }
        
        h1 {
            font-size: 24px;
            text-align: center;
            margin: 10px 0 20px 0;
            color: #000080;
        }
        
        .progress-container {
            width: 100%;
            height: 23px;
            background-color: #FFFFFF;
            border: 2px solid;
            border-top-color: #808080;
            border-left-color: #808080;
            border-right-color: #FFFFFF;
            border-bottom-color: #FFFFFF;
            margin: 15px 0;
            padding: 2px;
        }
        
        .progress-bar {
            height: 100%;
            background-color: #000080;
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .console-output {
            height: 120px;
            overflow-y: auto;
            background-color: #000;
            color: #C0C0C0;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            border: 2px solid;
            border-top-color: #808080;
            border-left-color: #808080;
            border-right-color: #FFFFFF;
            border-bottom-color: #FFFFFF;
            margin: 10px 0;
        }
        
        .status-text {
            font-size: 14px;
            margin: 10px 0;
            text-align: center;
            color: #000;
        }
        
        button {
            background-color: #C0C0C0;
            border: 2px solid;
            border-top-color: #FFFFFF;
            border-left-color: #FFFFFF;
            border-right-color: #808080;
            border-bottom-color: #808080;
            padding: 5px 15px;
            margin: 10px 5px;
            font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Arial, sans-serif;
            font-size: 14px;
        }
        
        button:active {
            border-top-color: #808080;
            border-left-color: #808080;
            border-right-color: #FFFFFF;
            border-bottom-color: #FFFFFF;
        }
        
        .button-container {
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
        
        /* Estilo para la barra de desplazamiento antigua */
        .console-output::-webkit-scrollbar {
            width: 16px;
        }
        
        .console-output::-webkit-scroll-track {
            background: #C0C0C0;
            border: 1px solid #808080;
        }
        
        .console-output::-webkit-scrollbar-thumb {
            background: #C0C0C0;
            border: 2px solid;
            border-top-color: #FFFFFF;
            border-left-color: #FFFFFF;
            border-right-color: #808080;
            border-bottom-color: #808080;
        }
        
        .logo {
            margin-bottom: 20px;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #FFFFFF;
            text-shadow: 2px 2px 0 #000080;
        }
    </style>
</head>
<body>
    <div id="oldbrother-intro">
        <div class="logo">OLD BROTHER SYSTEMS</div>
        
        <div class="window">
            <div class="title-bar">
                <span>Inicialización del Sistema</span>
                <span>― □ X</span>
            </div>
            
            <div class="window-content">
                <h1>INICIANDO SISTEMA OPERATIVO</h1>
                
                <div class="progress-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                
                <div class="status-text" id="boot-status">Inicializando sistema...</div>
                
                <div class="console-output" id="console-output"></div>
                
                <div class="button-container">
                    <button disabled>Cancelar</button>
                    <button disabled>Detalles</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const introOverlay = document.getElementById('oldbrother-intro');
            const progressBar = document.getElementById('progress-bar');
            const statusText = document.getElementById('boot-status');
            const consoleOutput = document.getElementById('console-output');
            
            // Mensajes de booteo simulados
            const bootMessages = [
                "> Iniciando sistema operativo OBS v2.1...",
                "> Verificando memoria del sistema...",
                "> Detectando unidades de disco...",
                "> Unidad C:\\ detectada (4.2 GB)",
                "> Unidad D:\\ detectada (CD-ROM)",
                "> Inicializando controladores de dispositivo...",
                "> Controlador de video: S3 Trio64",
                "> Controlador de sonido: Sound Blaster 16",
                "> Controlador de red: Dial-up Adapter",
                "> Cargando configuración del sistema...",
                "> Iniciando servicios...",
                "> Servicio de temporizador iniciado",
                "> Servicio de impresión iniciado",
                "> Cargando interfaz de usuario...",
                "> Sistema listo"
            ];

            // Simular proceso de booteo
            let currentProgress = 0;
            let currentMessage = 0;

            function updateBootProgress() {
                if (currentProgress < 100) {
                    currentProgress += Math.random() * 4;
                    if (currentProgress > 100) currentProgress = 100;
                    
                    progressBar.style.width = currentProgress + '%';
                    
                    // Añadir mensajes según el progreso
                    if (currentMessage < bootMessages.length && 
                        currentProgress >= (currentMessage + 1) * (100 / bootMessages.length)) {
                        
                        const messageElement = document.createElement('div');
                        messageElement.textContent = bootMessages[currentMessage];
                        consoleOutput.appendChild(messageElement);
                        consoleOutput.scrollTop = consoleOutput.scrollHeight;
                        
                        currentMessage++;
                    }
                    
                    statusText.textContent = `Cargando... ${Math.floor(currentProgress)}% completado`;
                    
                    setTimeout(updateBootProgress, 200 + Math.random() * 300);
                } else {
                    // Finalizar booteo
                    statusText.textContent = "¡Sistema listo! Haga clic para continuar";
                    
                    // Hacer el overlay clickeable para cerrar
                    introOverlay.style.cursor = 'pointer';
                    introOverlay.addEventListener('click', function() {
                        document.body.removeChild(introOverlay);
                    });
                }
            }

            // Iniciar la animación de booteo
            setTimeout(updateBootProgress, 1000);
        });
    </script>
</body>
</html>
