// face-effect.js - Efectos visuales aleatorios para la cara
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que todo esté cargado
    setTimeout(initRandomFaceEffects, 1000);
});

function initRandomFaceEffects() {
    const profilePic = document.getElementById('profile-pic');
    
    // Si no existe la imagen de perfil, salir
    if (!profilePic) {
        console.error("No se encontró la imagen de perfil");
        return;
    }
    
    // Estilos iniciales para la imagen de perfil
    profilePic.style.transition = 'all 0.3s ease-in-out';
    profilePic.style.border = '2px solid #00ff41';
    profilePic.style.borderRadius = '5px';
    profilePic.style.transform = 'scale(1)';
    profilePic.style.filter = 'none';
    
    // Lista de efectos aleatorios
    const effects = [
        // Efecto negativo
        function() {
            profilePic.style.filter = 'invert(1)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 300);
        },
        
        // Efecto de escala grande
        function() {
            profilePic.style.transform = 'scale(1.8)';
            setTimeout(() => { profilePic.style.transform = 'scale(1)'; }, 400);
        },
        
        // Efecto de rotación
        function() {
            profilePic.style.transform = 'rotate(15deg) scale(1.2)';
            setTimeout(() => { profilePic.style.transform = 'rotate(0deg) scale(1)'; }, 350);
        },
        
        // Efecto de rotación negativa
        function() {
            profilePic.style.transform = 'rotate(-15deg) scale(1.2)';
            setTimeout(() => { profilePic.style.transform = 'rotate(0deg) scale(1)'; }, 350);
        },
        
        // Efecto de sepia
        function() {
            profilePic.style.filter = 'sepia(1)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 400);
        },
        
        // Efecto de hue-rotate
        function() {
            profilePic.style.filter = 'hue-rotate(90deg)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 450);
        },
        
        // Efecto de blur
        function() {
            profilePic.style.filter = 'blur(3px)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 300);
        },
        
        // Efecto de brillo
        function() {
            profilePic.style.filter = 'brightness(1.8)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 350);
        },
        
        // Efecto de contraste
        function() {
            profilePic.style.filter = 'contrast(2)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 400);
        },
        
        // Efecto de saturación
        function() {
            profilePic.style.filter = 'saturate(3)';
            setTimeout(() => { profilePic.style.filter = 'none'; }, 350);
        },
        
        // Efecto de combinación múltiple 1
        function() {
            profilePic.style.transform = 'scale(1.5) rotate(10deg)';
            profilePic.style.filter = 'invert(0.7)';
            setTimeout(() => { 
                profilePic.style.transform = 'scale(1) rotate(0deg)';
                profilePic.style.filter = 'none';
            }, 500);
        },
        
        // Efecto de combinación múltiple 2
        function() {
            profilePic.style.transform = 'scale(1.4) rotate(-8deg)';
            profilePic.style.filter = 'hue-rotate(180deg) brightness(1.5)';
            setTimeout(() => { 
                profilePic.style.transform = 'scale(1) rotate(0deg)';
                profilePic.style.filter = 'none';
            }, 550);
        },
        
        // Efecto de combinación múltiple 3
        function() {
            profilePic.style.transform = 'scale(1.6)';
            profilePic.style.filter = 'sepia(1) contrast(1.8)';
            setTimeout(() => { 
                profilePic.style.transform = 'scale(1)';
                profilePic.style.filter = 'none';
            }, 450);
        },
        
        // Efecto de "glitch" (rápido)
        function() {
            const originalFilter = profilePic.style.filter;
            const originalTransform = profilePic.style.transform;
            
            // Primer cambio rápido
            profilePic.style.filter = 'invert(1)';
            profilePic.style.transform = 'scale(1.1) translateX(5px)';
            
            setTimeout(() => {
                // Segundo cambio
                profilePic.style.filter = 'hue-rotate(270deg)';
                profilePic.style.transform = 'scale(0.9) translateX(-5px)';
                
                setTimeout(() => {
                    // Tercer cambio
                    profilePic.style.filter = 'sepia(1) brightness(1.8)';
                    profilePic.style.transform = 'scale(1.2) translateY(3px)';
                    
                    setTimeout(() => {
                        // Volver a normal
                        profilePic.style.filter = originalFilter;
                        profilePic.style.transform = originalTransform;
                    }, 80);
                }, 80);
            }, 80);
        },
        
        // Efecto de vibración
        function() {
            const originalTransform = profilePic.style.transform;
            
            // Secuencia de vibración
            const moves = [
                'translateX(5px) translateY(3px)',
                'translateX(-5px) translateY(-3px)',
                'translateX(4px) translateY(-2px)',
                'translateX(-4px) translateY(2px)',
                'translateX(0) translateY(0)'
            ];
            
            moves.forEach((move, index) => {
                setTimeout(() => {
                    profilePic.style.transform = move;
                    if (index === moves.length - 1) {
                        profilePic.style.transform = originalTransform;
                    }
                }, index * 60);
            });
        }
    ];
    
    // Aplicar un efecto aleatorio
    function applyRandomEffect() {
        // Elegir un efecto aleatorio
        const randomEffectIndex = Math.floor(Math.random() * effects.length);
        const randomEffect = effects[randomEffectIndex];
        
        // Aplicar el efecto
        randomEffect();
        
        // Programar el próximo efecto con tiempo aleatorio (entre 3 y 15 segundos)
        const nextTime = 3000 + Math.random() * 12000;
        setTimeout(applyRandomEffect, nextTime);
    }
    
    // Efecto especial cuando el mouse pasa por encima
    profilePic.addEventListener('mouseenter', function() {
        // 20% de probabilidad de efecto al pasar el mouse
        if (Math.random() < 0.2) {
            const randomEffectIndex = Math.floor(Math.random() * effects.length);
            effects[randomEffectIndex]();
        }
    });
    
    // Efecto especial cuando se hace clic
    profilePic.addEventListener('click', function() {
        // Efecto especial de clic (siempre ocurre)
        profilePic.style.transform = 'scale(1.8) rotate(10deg)';
        profilePic.style.filter = 'invert(1) hue-rotate(90deg)';
        
        setTimeout(() => {
            profilePic.style.transform = 'scale(1) rotate(0deg)';
            profilePic.style.filter = 'none';
        }, 500);
    });
    
    // Iniciar los efectos aleatorios después de un tiempo inicial
    const initialDelay = 2000 + Math.random() * 5000;
    setTimeout(applyRandomEffect, initialDelay);
    
    console.log("Efectos faciales aleatorios inicializados. ¡Mantén tus ojos en la imagen!");
}