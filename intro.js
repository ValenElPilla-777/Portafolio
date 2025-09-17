// === ESTILOS ===
const style = document.createElement('style');
style.textContent = `
  body {
    margin: 0;
    background: #245EDC;
    font-family: "Tahoma", sans-serif;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
// puedes cambiar esta URL por la foto que quieras:
userImg.src = 'https://i.imgur.com/NH6ktYv.png';
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

// añadimos elementos al login
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

// Añadir al body
document.body.appendChild(loginScreen);
document.body.appendChild(welcomeScreen);

// === FUNCIONALIDAD ===
loginButton.addEventListener('click', () => {
  // Podrías validar aquí si quisieras, de momento pasa siempre
  loginScreen.style.display = 'none';
  document.body.style.background = '#245EDC'; // mismo fondo
  welcomeScreen.style.display = 'block';
});
