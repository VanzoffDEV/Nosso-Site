

//parte para capturar dados da postagem do blog

const blogForm = document.querySelector('#blog-form') as HTMLFormElement;

blogForm?.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const title = (document.querySelector('#post-title') as HTMLInputElement).value;
    const category = (document.querySelector('#post-category') as HTMLSelectElement).value;

    console.log("Enviando para o 'futuro' Back-end:", {
        title,
        category,
        date: new Date().toLocaleDateString()
    });

    alert("Postagem salva com sucesso (Simulação)!");
    blogForm.reset();
});