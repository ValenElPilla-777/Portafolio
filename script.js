// --- script.js completo ---

document.addEventListener('DOMContentLoaded', function() {
    // Navegación entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
  
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active');
  
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Animación de habilidades
    const skillBars = document.querySelectorAll('.skill-progress');
    const habilidadesSection = document.getElementById('habilidades');
  
    if (habilidadesSection && skillBars.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            skillBars.forEach(bar => {
              const val = bar.getAttribute('data-skill') || '0';
              bar.style.width = val + '%';
            });
          }
        });
      }, {threshold: 0.4});
      observer.observe(habilidadesSection);
    }

    // --- FORMULARIO CONTACTO A GMAIL ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        const subject = encodeURIComponent(`Nuevo mensaje de ${name}`);
        const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`);

        // abre el cliente de correo con los datos cargados
       window.open(
  `https://mail.google.com/mail/?view=cm&fs=1&to=vamabra@gmail.com&su=${subject}&body=${body}`,
  '_blank'
);

      });
    }
});
