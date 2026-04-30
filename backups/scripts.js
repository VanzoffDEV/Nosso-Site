//parte para capturar dados da postagem do blog
var blogForm = document.querySelector('#blog-form');
blogForm === null || blogForm === void 0 ? void 0 : blogForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = document.querySelector('#post-title').value;
    var category = document.querySelector('#post-category').value;
    console.log("Enviando para o 'futuro' Back-end:", {
        title: title,
        category: category,
        date: new Date().toLocaleDateString()
    });
    alert("Postagem salva com sucesso (Simulação)!");
    blogForm.reset();
});
