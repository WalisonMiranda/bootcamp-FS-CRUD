
// ---------------------evento--função
window.addEventListener('load', start);

var globalNames = ['primeiro', 'segundo', 'terceiro', 'quarto'];
var inputName = null;
var isEditing = false;
var currentIndex = null;

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

    function updateName(newName){
        globalNames[currentIndex] = newName;
    }
    
    // Captura o dado do formulário
    function handleTyping(event){


        var hasText = !!event.target.value && event.target.value.trim() !== '';

        if (!hasText){
            clearInput();
            return;
        }

        if (event.key === 'Enter'){
            if (isEditing) {
                updateName(event.target.value);
            }
            else {
                insertName(event.target.value);
            }
            
            render();
            isEditing = false;
            clearInput();
        } 
    }
       
    inputName.addEventListener('keyup', handleTyping);
    // Ativa automaticamente o input ao carregar a página
    inputName.focus();
}

// Escrveve os dados na tela
function render(){
    function createDeleteButton(index){
        function deleteName(){
            globalNames.splice(index, 1);
            render();
        }

        var button = document.createElement('button');
        button.classList.add('deleteButton');
        button.textContent = 'x';
        button.addEventListener('click', deleteName);

        return button;
    }

    function createSpan(name, index){
        // Editando os dados salvos
        function editItem(){
            inputName.value = name;
            inputName.focus();
            isEditing = true;
            currentIndex = index;
        }

        var span = document.createElement('span');
        span.classList.add('clickable');
        span.textContent = name;
        span.addEventListener('click', editItem);

        return span;
    }

    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');
    
    // Iteração
    for (var i = 0; i < globalNames.length; i++){
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var button = createDeleteButton(i);
        var span = createSpan(currentName, i);


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

