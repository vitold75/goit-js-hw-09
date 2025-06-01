const STORAGE_KEY = "feedback-form-state";

// Обʼєкт для збереження даних форми
const formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");

// Функція для збереження даних у localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для відновлення даних із localStorage у форму і formData
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
}

// Обробник вводу в полях форми
function onInput(event) {
  const { name, value } = event.target;
  formData[name] = value;
  saveToLocalStorage();
}

// Обробник відправки форми
function onSubmit(event) {
  event.preventDefault();

  // Перевірка, чи всі поля заповнені
  if (!formData.email.trim() || !formData.message.trim()) {
    alert("Fill please all fields");
    return;
  }

  console.log("Form data submitted:", formData);

  // Очистка localStorage, formData і форми
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
  form.reset();
}

populateForm();

form.addEventListener("input", onInput);
form.addEventListener("submit", onSubmit);
