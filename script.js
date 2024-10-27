// script.js

document.addEventListener('DOMContentLoaded', () => {
    const contadorFrangos = document.getElementById('contadorFrangos');
    const faturarBtn = document.getElementById('faturarBtn');
    const quantidadeInput = document.getElementById('quantidade');
    const quantidadeLinguicaInput = document.getElementById('quantidadeLinguica');
    const linguicaCheckbox = document.getElementById('linguicaCheckbox');
    const linguicaInfo = document.getElementById('linguicaInfo');
    const precoFrangoInput = document.getElementById('precoFrango');
    const precoLinguicaInput = document.getElementById('precoLinguica');
    const totalFrangosInput = document.getElementById('totalFrangos');
    const atualizarBtn = document.getElementById('atualizarBtn');
    const recibo = document.getElementById('recibo');
    const reciboContent = document.getElementById('reciboContent');
    const reciboValor = document.getElementById('reciboValor');
    const reciboData = document.getElementById('reciboData');

    // Mostra ou esconde informações da linguiça
    linguicaCheckbox.addEventListener('change', () => {
        linguicaInfo.style.display = linguicaCheckbox.checked ? 'block' : 'none';
    });

    faturarBtn.addEventListener('click', () => {
        const quantidade = parseInt(quantidadeInput.value);
        const quantidadeLinguica = parseInt(quantidadeLinguicaInput.value);
        const precoFrango = parseFloat(precoFrangoInput.value);
        const precoLinguica = linguicaCheckbox.checked ? parseFloat(precoLinguicaInput.value) : 0;

        // Não cobrar uma linguiça se a quantidadeLinguica for maior que zero
        const quantidadeCobrarLinguica = Math.max(0, quantidadeLinguica - 1); // Não permitir negativo

        // Calcula o total
        const total = (quantidade * precoFrango) + (quantidadeCobrarLinguica * precoLinguica);
        
        // Atualiza o contador de frangos
        const frangosDisponiveis = parseInt(contadorFrangos.innerText);
        contadorFrangos.innerText = Math.max(0, frangosDisponiveis - quantidade); // Não permitir negativo

        // Atualiza o recibo
        reciboContent.innerText = `Você comprou ${quantidade} frango(s) e 
${quantidadeLinguica} linguiça(s).`;
        reciboValor.innerText = `Total a pagar: R$ ${total.toFixed(2)}`;
        reciboData.innerText = new Date().toLocaleDateString();

        // Exibe o recibo
        recibo.style.display = 'block';

        // Chama a função de impressão automaticamente
        setTimeout(() => {
            window.print();
        }, 500); // Aguarda meio segundo para garantir que o recibo seja renderizado
    });

    atualizarBtn.addEventListener('click', () => {
        const totalFrangos = parseInt(totalFrangosInput.value);
        contadorFrangos.innerText = totalFrangos;
    });
});

// Função para imprimir o recibo
function imprimirRecibo() {
    // Exibe o recibo e prepara para impressão
    const recibo = document.getElementById('recibo');
    recibo.style.display = 'block';
    window.print();
    recibo.style.display = 'none'; // Esconde o recibo após a impressão
}
