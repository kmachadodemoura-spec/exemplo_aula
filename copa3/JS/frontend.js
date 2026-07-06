// Mensagem ao carregar a página
window.onload = function () {
    alert("Bem-vindo ao Portal Oficial da Seleção do Egito!");
};


// Tema Claro/Escuro
function tema() {
    document.body.classList.toggle("dark");
}


// Página Inicial
const titulo = document.getElementById("titulo");

if (titulo) {

    titulo.ondblclick = function () {
        alert("Vai Egito! 🇪🇬");
    };

}

const imagem = document.getElementById("Egito");

if (imagem) {

    imagem.onmouseover = function () {
        imagem.style.transform = "scale(1.08)";
    };

    imagem.onmouseout = function () {
        imagem.style.transform = "scale(1)";
    };

}


// Página Classificação
const classificados = document.querySelectorAll(".classificado");

classificados.forEach(function(time){

    time.onmouseover = function(){

        this.style.color = "green";
        this.style.fontWeight = "bold";

    }

    time.onmouseout = function(){

        this.style.color = "";
        this.style.fontWeight = "";

    }

});

const eliminado = document.querySelector(".eliminado");

if(eliminado){

    eliminado.onmouseover = function(){

        this.style.color = "red";
        this.style.textDecoration = "line-through";

    }

    eliminado.onmouseout = function(){

        this.style.color = "";
        this.style.textDecoration = "";

    }

}


// Cadastro
const formulario = document.getElementById("formulario");

if(formulario){

    const nome_completo = document.getElementById("nome_completo");
    const email = document.getElementById("email");
    const data_nascimento = document.getElementById("data_nascimento");
    const pais_favorito = document.getElementById("pais_favorito");
    const jogador_favorito = document.getElementById("jogador_favorito");

    nome_completo.onfocus = function(){
        this.style.background = "#ffffcc";
    }

    nome_completo.onblur = function(){
        this.style.background = "white";
    }

    email.onkeyup = function(){
        email.style.borderColor = "green";
    }

    jogador_favorito.onchange = function(){
        alert("Jogador escolhido: " + jogador_favorito.value);
    }

}


// Resultado
if(document.getElementById("rNome_completo")){

    document.getElementById("rNome_completo").innerHTML = localStorage.getItem("nome_completo");
    document.getElementById("rEmail").innerHTML = localStorage.getItem("email");
    document.getElementById("rData_nascimento").innerHTML = localStorage.getItem("data_nascimento");
    document.getElementById("rPais_favorito").innerHTML = localStorage.getItem("pais_favorito");
    document.getElementById("rJogador_favorito").innerHTML = localStorage.getItem("jogador_favorito");

    const nascimento = new Date(localStorage.getItem("data_nascimento"));
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mes = hoje.getMonth() - nascimento.getMonth();

    if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
        idade--;
    }

    document.getElementById("idade").innerHTML = idade;

    let categoria = "";

    if(idade <= 16){

        categoria = "Torcedor Mirim";

    }else if(idade <= 30){

        categoria = "Torcedor Novato";

    }else{

        categoria = "Torcedor Experiente";

    }

    document.getElementById("categoria").innerHTML = categoria;

}