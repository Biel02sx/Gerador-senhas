function getCharTypes() {
  const uppercase = document.querySelector("#include_uppercase").checked;
  const lowercase = document.querySelector("#include_lowercase").checked;
  const number = document.querySelector("#include_number").checked;
  const specialCharacter = document.querySelector(
    "#include_special_character"
  ).checked;

  const charTypes = [];
  if (uppercase) {
    charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if (lowercase) {
    charTypes.push("abcdefghijklmnopqrstuvwxyz");
  }
  if (number) {
    charTypes.push("0123456789");
  }
  if (specialCharacter) {
    charTypes.push("?!@#$%&*");
  }
  return charTypes;
}
function getPasswordSize() {
  const size = document.querySelector("#size").value;
  if (isNaN(size) || size < 4 || size > 16) {
    message("tamanho inválido, digite um numero entre 4 e 16!", "#dc2626");
  }
  return size;
}
function randomChartype(charTypes) {
  const randomIndex = Math.floor(Math.random() * charTypes.length);

  return charTypes[randomIndex][
    Math.floor(Math.random() * charTypes[randomIndex].length)
  ];
}
function generatePassword(size, charTypes) {
  let passwordGenerated = "";

  while (passwordGenerated.length < size) {
    passwordGenerated += randomChartype(charTypes);
  }
  return passwordGenerated;
}
function message(text, background) {
  Toastify({
    text: text,
    duration: 1500,
    style: {
      background: background,
    },
  }).showToast();
}

document.querySelector("#generate").addEventListener("click", function () {
  const size = getPasswordSize();
  const charTypes = getCharTypes();

  if (!size) {
    return;
  }
  if (!charTypes.length) {
    message("pelo menos um tipo de caracter!", "#dc2626");
    return;
  }
  const passwordGenerated = generatePassword(size, charTypes);
  document.querySelector("#password").textContent = passwordGenerated;
  document.querySelector("#password_container").classList.add("show");
});
document.querySelector("#copy").addEventListener("click", function () {
  navigator.clipboard.writeText(
    document.querySelector("#password").textContent
  );
  message("senha copiada com sucesso!", "#84cc16");
});
