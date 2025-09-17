// === ESTILOS ===
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    background: #000; /* Fondo negro */
    font-family: "Tahoma", sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #login-screen {
    background: #f0f0f0;
    border: 2px solid #003399;
    width: 350px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
  }
  #login-screen img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #003399;
    margin-bottom: 10px;
  }
  #login-screen h1 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #003399;
  }
  #password {
    width: 80%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
  }
  #login-button {
    background: #245EDC;
    color: #fff;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 1rem;
  }
  #login-button:hover {
    background: #003399;
  }
  #welcome-screen {
    display: none;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    animation: fadeIn 1s ease forwards;
    margin-top: 100px;
  }
  #top-bar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #111;
    color: #fff;
    font-size: 1rem;
    padding: 10px;
    text-align: right;
    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  #top-bar a {
    color: #0f9dff;
    text-decoration: none;
    font-weight: bold;
  }
  #top-bar a:hover {
    text-decoration: underline;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(style);

// === LOGIN SCREEN ===
const loginScreen = document.createElement('div');
loginScreen.id = 'login-screen';

const userImg = document.createElement('img');
userImg.src = 'https://i.imgur.com/NH6ktYv.png'; // tu foto de perfil
userImg.alt = 'Usuario';

const userTitle = document.createElement('h1');
userTitle.textContent = 'Usuario';

const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.id = 'password';
passwordInput.placeholder = 'Contraseña';

const loginButton = document.createElement('button');
loginButton.id = 'login-button';
loginButton.textContent = 'Iniciar sesión';

// añadir elementos
loginScreen.appendChild(userImg);
loginScreen.appendChild(userTitle);
loginScreen.appendChild(passwordInput);
loginScreen.appendChild(document.createElement('br'));
loginScreen.appendChild(loginButton);

// === WELCOME SCREEN ===
const welcomeScreen = document.createElement('div');
welcomeScreen.id = 'welcome-screen';
const welcomeText = document.createElement('h1');
welcomeText.textContent = 'Bienvenido a mi portafolio';
welcomeScreen.appendChild(welcomeText);

// === TOP BAR ===
const topBar = document.createElement('div');
topBar.id = 'top-bar';
const link = document.createElement('a');
link.href = 'https://tusitio.com'; // cambia esto a tu página real
link.textContent = 'Ir a la página principal';
topBar.appendChild(link);

// Añadir al body
document.body.appendChild(topBar);
document.body.appendChild(loginScreen);
document.body.appendChild(welcomeScreen);

// === FUNCIONALIDAD ===
loginButton.addEventListener('click', () => {
  // Podrías validar aquí si quisieras, de momento pasa siempre
  loginScreen.style.display = 'none';
  welcomeScreen.style.display = 'block';
  topBar.style.display = 'block';
});
