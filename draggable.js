// Función para hacer elementos arrastrables
document.addEventListener('DOMContentLoaded', function() {
    const draggableElements = document.querySelectorAll('.draggable-element');
    
    draggableElements.forEach(element => {
        let isDragging = false;
        let offsetX, offsetY;
        
        // Evento para iniciar el arrastre
        element.addEventListener('mousedown', function(e) {
            isDragging = true;
            
            // Calcular el offset entre el cursor y la posición del elemento
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            
            // Añadir clase de arrastre para feedback visual
            element.classList.add('dragging');
            
            // Prevenir la selección de texto durante el arrastre
            e.preventDefault();
        });
        
        // Evento para mover el elemento
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            // Calcular la nueva posición
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // Aplicar la nueva posición
            element.style.left = x + 'px';
            element.style.top = y + 'px';
        });
        
        // Evento para soltar el elemento
        document.addEventListener('mouseup', function() {
            isDragging = false;
            element.classList.remove('dragging');
        });
    });
    
    // Posicionar elementos arrastrables en posiciones aleatorias al cargar
    function positionDraggableElements() {
        draggableElements.forEach(element => {
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);
            
            element.style.left = randomX + 'px';
            element.style.top = randomY + 'px';
        });
    }
    
    // Posicionar elementos al cargar y al redimensionar
    positionDraggableElements();
    window.addEventListener('resize', positionDraggableElements);
});