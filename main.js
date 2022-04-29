const rua =  document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');


function preencherFormulario (endereco) {
    
    rua.value = endereco.logradouro;
    bairro.value = endereco.bairro;
    cidade.value = endereco.localidade;
    estado.value = endereco.uf;

}

function limparFormulario (endereco) {
    rua.value = "";
    bairro.value ="";
    cidade.value = "";
    estado.value = "";

}


const eNumero = (numero) => /^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length == 8 &&  eNumero(cep);


const pesquisarCep = async () =>{
    limparFormulario();
    const cep = document.querySelector('#cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            rua.value ='CEP`não encontrado';
            
    
        } else{
            preencherFormulario(endereco);
        }
        
    } else {
        rua.value ='CEP incorrreto';
    }

}

document.querySelector('[data-cep]').addEventListener('focusout', pesquisarCep);

const enviarFormulario = document.querySelector('[data-botao]');

enviarFormulario.addEventListener('click', (evento)=>{
    evento.preventDefault()
    limparFormulario();
    alert('O Seu cadastro foi realizado');
})
