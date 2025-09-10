// Función de pintura para dibujar en la página
document.addEventListener('DOMContentLoaded', function() {
    const paintToggle = document.getElementById('paint-toggle');
    const clearCanvasBtn = document.getElementById('clear-canvas');
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    
    let isPainting = false;
    let isPaintingMode = false;
    let brushColor = '#00ff41'; // Color cyberpunk por defecto
    let brushSize = 5;
    
    // Ajustar el tamaño del canvas al viewport
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Inicializar el canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Alternar modo pintura
    paintToggle.addEventListener('click', function() {
        isPaintingMode = !isPaintingMode;
        
        if (isPaintingMode) {
            // Activar modo pintura
            canvas.style.display = 'block';
            paintToggle.textContent = 'DESACTIVAR MODO PINTURA';
            clearCanvasBtn.style.display = 'block';
            
            // Cambiar cursor a crosshair
            document.body.style.cursor = 'crosshair';
            
            // Añadir mensaje de instrucciones
            if (!document.getElementById('paint-instructions')) {
                const instructions = document.createElement('div');
                instructions.id = 'paint-instructions';
                instructions.style.position = 'fixed';
                instructions.style.bottom = '10px';
                instructions.style.right = '10px';
                instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                instructions.style.color = '#00ff41';
                instructions.style.padding = '10px';
                instructions.style.border = '1px solid #00ff41';
                instructions.style.borderRadius = '5px';
                instructions.style.zIndex = '10000';
                instructions.style.fontFamily = 'Share Tech Mono, monospace';
                instructions.style.fontSize = '12px';
                instructions.innerHTML = '<strong>INSTRUCCIONES:</strong><br>' +
                                         '- Click y arrastra para dibujar<br>' +
                                         '- Rueda del mouse: cambiar tamaño<br>' +
                                         '- Tecla C: cambiar color<br>' +
                                         '- Tecla E: borrador<br>' +
                                         '- Tecla X: limpiar lienzo';
                document.body.appendChild(instructions);
            }
        } else {
            // Desactivar modo pintura
            canvas.style.display = 'none';
            paintToggle.textContent = 'ACTIVAR MODO PINTURA';
            clearCanvasBtn.style.display = 'none';
            
            // Restaurar cursor normal
            document.body.style.cursor = 'default';
            
            // Eliminar instrucciones
            const instructions = document.getElementById('paint-instructions');
            if (instructions) {
                instructions.remove();
            }
        }
    });
    
    // Limpiar el lienzo
    clearCanvasBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Empezar a dibujar
    canvas.addEventListener('mousedown', startPainting);
    
    // Dejar de dibujar
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    
    // Dibujar
    canvas.addEventListener('mousemove', draw);
    
    // Cambiar tamaño del pincel con la rueda del mouse
    canvas.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            // Rueda hacia arriba - aumentar tamaño
            brushSize = Math.min(brushSize + 1, 50);
        } else {
            // Rueda hacia abajo - disminuir tamaño
            brushSize = Math.max(brushSize - 1, 1);
        }
    });
    
    // Atajos de teclado
    document.addEventListener('keydown', function(e) {
        if (!isPaintingMode) return;
        
        switch(e.key) {
            case 'c':
            case 'C':
                // Cambiar color aleatorio
                const colors = ['#00ff41', '#ff00ff', '#00ffff', '#ffff00', '#ff7700'];
                brushColor = colors[Math.floor(Math.random() * colors.length)];
                break;
            case 'e':
            case 'E':
                // Modo borrador (usar color de fondo)
                brushColor = '#0a0a12';
                break;
            case 'x':
            case 'X':
                // Limpiar lienzo
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                break;
        }
    });
    
    function startPainting(e) {
        if (!isPaintingMode) return;
        
        isPainting = true;
        draw(e); // Para dibujar un punto al hacer click
    }
    
    function stopPainting() {
        isPainting = false;
        ctx.beginPath(); // Reiniciar el path para que la siguiente línea no se conecte
    }
    
    function draw(e) {
        if (!isPainting) return;
        
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
        
        // Obtener coordenadas del mouse
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    // Posicionar botones de pintura
    function positionPaintButtons() {
        paintToggle.style.position = 'fixed';
        paintToggle.style.top = '10px';
        paintToggle.style.right = '10px';
        paintToggle.style.zIndex = '10000';
        
        clearCanvasBtn.style.position = 'fixed';
        clearCanvasBtn.style.top = '50px';
        clearCanvasBtn.style.right = '10px';
        clearCanvasBtn.style.zIndex = '10000';
    }
    
    positionPaintButtons();
    window.addEventListener('resize', positionPaintButtons);
});