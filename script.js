document.addEventListener("DOMContentLoaded", carregarUsuarios);

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    if (!nome || !email) {
        alert("Preencha todos os campos!");
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let data = new Date().toLocaleString();
    usuarios.push({ nome, email, data });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
    limparCampos();
}

function carregarUsuarios() {
    let lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.forEach((user, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${user.data} - ${user.nome} (${user.email}) <button onclick="excluir(${index})">Excluir</button>`;
        lista.appendChild(li);
    });
}

function excluir(index) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(index, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    carregarUsuarios();
}

function excluirTodos() {
    if (confirm("Tem certeza que deseja excluir todos?")) {
        localStorage.removeItem("usuarios");
        carregarUsuarios();
    }
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
}

function pesquisar() {
    let termo = document.getElementById("pesquisa").value.toLowerCase();
    let lista = document.getElementById("listaUsuarios");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    lista.innerHTML = "";
    usuarios.filter(user => user.nome.toLowerCase().includes(termo) || user.email.toLowerCase().includes(termo))
        .forEach((user, index) => {
            let li = document.createElement("li");
            li.innerHTML = `${user.data} - ${user.nome} (${user.email}) <button onclick="excluir(${index})">Excluir</button>`;
            lista.appendChild(li);
        });
}
