function getInputs(){
    return {
        nome_completo: document.getElementById('nome_completo'),
        email: document.getElementById('email'),
        data_nascimento: document.getElementById('data_nascimento'),
        pais_favorito: document.getElementById('pais_favorito'),
        jogador_favorito: document.getElementById('jogador_favorito')
    };
}

function getValores(inputs){
    return {
        nome_completo: inputs.nome_completo.value.trim(),
        email: inputs.email.value.trim(),
        pais_favorito: inputs.pais_favorito.value.trim(),
        data_nascimento: inputs.data_nascimento.value,
        jogador_favorito: inputs.jogador_favorito.value
    };
}

async function cadastrar(){

    const inputs = getInputs();
    const dados = getValores(inputs);

    console.log(dados);

    await fetch('/api/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
    });

    window.location.href = './../html/resultado.html'; 
}

function calcularIdade(dataNascimento) {

    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

async function mostrarResultado(){
    console.log("passei aqui");

    const res = await fetch('/api/usuarios');
    const usuarios = await res.json();
    console.log(usuarios);

    let html = `<table border="1">
        <tr>
            <th>ID</th><th>Nome_Completo</th><th>Email</th>
            <th>Idade</th><th>Pais_Favorito</th><th>Jogador_Favorito</th>
        </tr>`;

    for(const u of usuarios){
        html += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nome_completo}</td>
            <td>${u.email}</td>
            <td>${calcularIdade(u.data_nascimento)}</td>
            <td>${u.pais_favorito}</td>
            <td>${u.jogador_favorito}</td>
        </tr>`;
    }

    html += "</table>";

    document.getElementById('resultado').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('btnEnviar');

    if(btn){
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cadastrar();
        });
    }

    if(document.getElementById('resultado')){
        mostrarResultado();
    }
});