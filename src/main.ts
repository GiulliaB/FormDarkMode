import './style.css';

const form = document.querySelector<HTMLFormElement>('#form')!;
const name = document.querySelector<HTMLInputElement>('#name')!;
const email = document.querySelector<HTMLInputElement>('#email')!;
const maleGender = document.querySelector<HTMLInputElement>('#male')!;
const femaleGender = document.querySelector<HTMLInputElement>('#female')!;
const course = document.querySelector<HTMLSelectElement>('#course')!;
const description = document.querySelector<HTMLTextAreaElement>('#description')!;
const terms = document.querySelector<HTMLInputElement>('#terms')!;

function limparFormulario() {
    form.reset();
}

function getGenderSelected() {
    if (maleGender.checked) return 'male';
    if (femaleGender.checked) return 'female';
    return '';
}

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    try {
        const parsedData = ({
            name: name.value,
            email: email.value,
            gender: getGenderSelected(),
            course: course.value,
            description: description.value,
            terms: terms.checked
        });

        await fetch('http://localhost:3000/data', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(parsedData),
        })

        limparFormulario();
    } catch (err) {
        console.error("Erro de validação:", err);
    }
});

const changeMode = document.getElementById("change-mode");
const body = document.body;

changeMode?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
