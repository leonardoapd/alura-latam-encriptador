let messageToProcess = document.getElementById('message');

// Ocultar el botón de copiar al portapapeles por defecto
let copyButton = document.getElementById('copyButton');
copyButton.style.display = 'none';

// Objeto con las claves de encriptación
let encryptionValues = {
	a: 'ai',
	e: 'enter',
	i: 'imes',
	o: 'ober',
	u: 'ufat',
};

/**
 * Copia el contenido del resultado al portapapeles.
 * @function copyToClipboard
 * @returns {void}
 */
function copyToClipboard() {
    let element = document.getElementById('result');
    
    if (document.body.createTextRange) {
      // Para Internet Explorer
      const range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      // Para otros navegadores
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    // Copiar el texto al portapapeles
    let textToCopy = element.innerHTML;
    navigator.clipboard.writeText(textToCopy);
  }
  
/**
 * Valida que el mensaje ingresado por el usuario contenga solo letras minúsculas.
 * @function phraseValidation
 * @param {string} word - Palabra a validar.
 * @returns {boolean}
 */
function phraseValidation(sentence) {
	const validCharacters = /^[a-z\s!]+$/i;
    return validCharacters.test(sentence);
}

/**
 * Muestra el botón de copiar al portapapeles.
 * @function showCopyButton
 * @returns {void}
 */
function showCopyButton() {
	copyButton.style.display = 'block';
}

// Función para mostrar u ocultar elementos por selector
function toggleDisplay(selector, displayStyle = 'block') {
	document.querySelector(selector).style.display = displayStyle;
}

// Función para actualizar el contenido de un elemento
function updateElementContent(selector, content) {
	document.querySelector(selector).innerHTML = content;
    document.querySelector('.aside').style.textAlign = 'justify';
    document.querySelector('.aside').style.justifyContent = 'space-between';
    document.querySelector('.aside__message').style.color = '#343A40';
}

// Función para encriptar o desencriptar un mensaje
function processMessage(isEncrypting) {
	let message = messageToProcess.value;
	if (!phraseValidation(message)) {
		alert('Please enter only lowercase letters');
		return;
	}

	let processedMessage = isEncrypting ? encryptMessage(message) : decryptMessage(message);

	updateElementContent('#result', processedMessage);
	toggleDisplay('.aside__title', 'none');
	toggleDisplay('.aside__img', 'none');
	messageToProcess.value = '';
	showCopyButton();
}

/**
 * Encripta un mensaje ingresado por el usuario utilizando un conjunto predefinido de valores de encriptación.
 * @function encryptMessage
 * @returns {string}
 * @param {string} message - Mensaje a encriptar.
 */
function encryptMessage(message) {
	// if (!charactersValidation(message)) {
	// 	alert('Please enter only lowercase letters');
	// 	return;
	// }
	return message
		.split('')
		.map((letter) => {
			return encryptionValues[letter] || letter;
		})
		.join('');
}

/**
 * Desencripta un mensaje ingresado por el usuario utilizando un conjunto predefinido de valores de encriptación.
 * @function decryptMessage
 * @returns {string}
 * @param {string} message - Mensaje a desencriptar.
 */
function decryptMessage(message) {
	let decryptedMessage = message;
	Object.keys(encryptionValues).forEach((key) => {
		decryptedMessage = decryptedMessage.split(encryptionValues[key]).join(key);
	});
	return decryptedMessage;
}

function encrypt() {
	processMessage(true);
}

function decrypt() {
	processMessage(false);
}
