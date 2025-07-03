let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirImagemPadrao() {
        document.getElementById('imagemPadrao').style.display = 'block';
        document.getElementById('imagemAcertou').style.display = 'none';
}
exibirImagemPadrao();

function exibirImagemAcertou() {
            document.getElementById('imagemPadrao').style.display = 'none';
            document.getElementById('imagemAcertou').style.display = 'block';
        }

document.getElementById('chutar').removeAttribute('disabled');

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return  gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); 
        return numeroEscolhido;
    }
    
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Descubra o número secreto entre 1 e 10.');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = parseFloat(document.querySelector('input').value);

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
        limparCampo();
        return;
    }

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let mensagemTentativas = tentativas > 1 ? `Você acertou com ${parseFloat(tentativas)} tentativas.` : 'Você acertou na primeira tentativa!';
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
        exibirImagemAcertou();

    } else {
        if (chute === numeroSecreto + 1 || chute === numeroSecreto - 1) {
            exibirTextoNaTela('p', 'Você quase acertou!');
    } else if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é maior que o chute.');
    } else {
            exibirTextoNaTela('p', 'O número secreto é menor que o chute.');
    }
    }
    tentativas++;
    limparCampo();
    }

function limparCampo() { 
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
    exibirImagemPadrao();
}