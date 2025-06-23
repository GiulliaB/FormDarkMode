import './style.css';
import { dadosSchema } from './validators/dadosSchema.ts';

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
        const parsedData = dadosSchema.parse({
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
        carregarInscricoes();
    } catch (err) {
        console.error("Erro de validação:", err);
    }
});

const changeMode = document.getElementById("change-mode");
const body = document.body;

changeMode?.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});

window.addEventListener('DOMContentLoaded', () => {
  carregarInscricoes();
});

async function carregarInscricoes() {
  const tabela = document.querySelector<HTMLTableElement>('#table tbody')!;
  tabela.innerHTML = '';

  try {
    const resposta = await fetch('http://localhost:3000/data');
    const dados = await resposta.json();

    dados.forEach((item: any) => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.gender === 'male' ? 'Masculino' : 'Feminino'}</td>
        <td>${item.course}</td>
        <td>${item.description || '-'}</td>
      `;
      tabela.appendChild(linha);
    });
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  }
}
