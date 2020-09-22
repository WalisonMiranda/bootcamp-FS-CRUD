
// ---------------------evento--função
window.addEventListener('load', start);

var globalNames = ['primeiro', 'segundo', 'terceiro', 'quarto'];
var inputName = null;

// Ao iniciar a página
function start(){
    inputName = document.querySelector('#inputName');
    
    render();
    preventFormSubmit();
    activateInput();
}

// Evita o carregamento da página ao enviar o formulário
function preventFormSubmit(){
    function handleFormSubmit(event){
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

// Executando o input
function activateInput(){
    //Adiciona os dados no vetor
    function insertName(newName){
        globalNames.push(newName);
    }
    // Captura o dado do formulário
    function handleTyping(event){
        if (event.key === 'Enter'){
            insertName(event.target.value);
            console.log(globalNames);
        }
    }
       
    inputName.addEventListener('keyup', handleTyping);
    // Ativa automaticamente o input ao carregar a página
    inputName.focus();
}

// Escrveve os dados na tela
function render(){
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    // Iteração
    var ul = document.createElement('ul');
    
    for (var i = 0; i < globalNames.length; i++){
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = document.createElement('button');
        button.textContent = 'x';

        var span = document.createElement('span');
        span.textContent = currentName;

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }

    divNames.appendChild(ul);
    clearInput();
}

// Limpa o input depois de enviar o dado
function clearInput (){
    inputName.value = '';
    inputName.focus();
}

