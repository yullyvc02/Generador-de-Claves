let cantidad = document.getElementById('cantidad');
let boton = document.getElementById('generar');
let contrasena = document.getElementById('contrasena');
let fortalezaDiv = document.getElementById('fortaleza');

// Palabras en inglés comunes para usar en las contraseñas
const palabrasInglesas = [
    'Make', 'Glam', 'Cool', 'Super', 'Power', 'Mega', 'Ultra', 'Hyper',
    'Smart', 'Bright', 'Quick', 'Fast', 'Strong', 'Safe', 'Secure'
];

const caracteresEspeciales = '@#$%^&*()_+-={}:<>?';
const numeros = '0123456789';

function generarPalabraAleatoria() {
    return palabrasInglesas[Math.floor(Math.random() * palabrasInglesas.length)];
}

function evaluarFortaleza(password) {
    let puntuacion = 0;
    
    // Evaluación de longitud (0-3 puntos)
    if (password.length >= 16) {
        puntuacion += 3;
    } else if (password.length >= 12) {
        puntuacion += 2;
    } else if (password.length >= 8) {
        puntuacion += 1;
    }
    
    // Evaluación de caracteres especiales (0-2 puntos)
    let cantidadEspeciales = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length;
    if (cantidadEspeciales >= 2) {
        puntuacion += 2;
    } else if (cantidadEspeciales >= 1) {
        puntuacion += 1;
    }
    
    // Evaluación de números (0-2 puntos)
    let cantidadNumeros = (password.match(/\d/g) || []).length;
    if (cantidadNumeros >= 2) {
        puntuacion += 2;
    } else if (cantidadNumeros >= 1) {
        puntuacion += 1;
    }
    
    // Evaluación de mayúsculas y minúsculas (0-2 puntos)
    let tieneMayusculas = /[A-Z]/.test(password);
    let tieneMinusculas = /[a-z]/.test(password);
    if (tieneMayusculas && tieneMinusculas) {
        puntuacion += 2;
    } else if (tieneMayusculas || tieneMinusculas) {
        puntuacion += 1;
    }
    
    // Evaluación de variedad de caracteres (0-2 puntos)
    let tiposCaracteres = 0;
    if (/[a-z]/.test(password)) tiposCaracteres++;
    if (/[A-Z]/.test(password)) tiposCaracteres++;
    if (/[0-9]/.test(password)) tiposCaracteres++;
    if (/[^a-zA-Z0-9]/.test(password)) tiposCaracteres++;
    if (tiposCaracteres >= 4) {
        puntuacion += 2;
    } else if (tiposCaracteres >= 3) {
        puntuacion += 1;
    }

    // Determinar nivel de fortaleza (máximo 11 puntos posibles)
    fortalezaDiv.className = 'fortaleza';
    if (puntuacion >= 9) {
        fortalezaDiv.classList.add('fuerte');
        fortalezaDiv.textContent = '¡Contraseña Fuerte!';
    } else if (puntuacion >= 6) {
        fortalezaDiv.classList.add('media');
        fortalezaDiv.textContent = 'Contraseña Media';
    } else {
        fortalezaDiv.classList.add('debil');
        fortalezaDiv.textContent = 'Contraseña Débil';
    }
}

function generar() {
    let numeroDigitado = parseInt(cantidad.value);
    
    if (numeroDigitado < 8) {
        alert("La cantidad de caracteres tiene que ser mayor que 8");
        return;
    }

    // Generar una contraseña base
    let password = '';
    
    // 50% de probabilidad de comenzar con una palabra en inglés
    if (Math.random() < 0.5) {
        password = generarPalabraAleatoria();
    } else {
        // Generar caracteres aleatorios
        for (let i = 0; i < Math.min(4, numeroDigitado); i++) {
            password += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
    
    // Asegurar al menos un número
    password += Math.floor(Math.random() * 100);
    
    // Añadir un carácter especial con 70% de probabilidad
    if (Math.random() < 0.7) {
        password += caracteresEspeciales[Math.floor(Math.random() * caracteresEspeciales.length)];
    }
    
    // Completar la longitud requerida
    while (password.length < numeroDigitado) {
        let tipo = Math.random();
        if (tipo < 0.3) {
            // Añadir letra
            password += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        } else if (tipo < 0.6) {
            // Añadir número
            password += Math.floor(Math.random() * 10);
        } else {
            // Añadir carácter especial
            password += caracteresEspeciales[Math.floor(Math.random() * caracteresEspeciales.length)];
        }
    }
    
    contrasena.value = password;
    evaluarFortaleza(password);
}

function limpiar() {
    cantidad.value = '';
    contrasena.value = '';
    fortalezaDiv.textContent = '';
    fortalezaDiv.className = 'fortaleza';
}