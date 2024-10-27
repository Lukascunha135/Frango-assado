document.addEventListener('DOMContentLoaded', function() {
    const faturarBtn = document.getElementById('faturarBtn');
    const atualizarBtn = document.getElementById('atualizarBtn');
    const quantidadeInput = document.getElementById('quantidade');
    const contadorFrangos = document.getElementById('contadorFrangos');
    const precoFrangoInput = document.getElementById('precoFrango');
    const totalFrangosInput = document.getElementById('totalFrangos');
    const recibo = document.getElementById('recibo');
    const reciboContent = document.getElementById('reciboContent');
    const reciboData = document.getElementById('reciboData');

    faturarBtn.addEventListener('click', function() {
        const quantidade = parseInt(quantidadeInput.value);
        const totalFrangos = parseInt(contadorFrangos.textContent);
        const precoFrango = parseFloat(precoFrangoInput.value);
        
        if (quantidade > 0 && quantidade <= totalFrangos) {
            // Atualiza a contagem de frangos disponíveis
            contadorFrangos.textContent = totalFrangos - quantidade;

            // Gera o conteúdo do recibo
            reciboContent.innerHTML = `Quantidade: ${quantidade}<br>Total: R$ ${(quantidade * precoFrango).toFixed(2)}`;
            
            // Define a data de hoje
            const dataHoje = new Date();
            reciboData.innerHTML = dataHoje.toLocaleDateString('pt-BR');

            // Mostra o recibo
            recibo.style.display = 'block';

            // Imprime somente o recibo
            window.print();
        } else {
            alert('Quantidade inválida.');
        }
    });

    atualizarBtn.addEventListener('click', function() {
        const novoPreco = parseFloat(precoFrangoInput.value);
        const novoTotalFrangos = parseInt(totalFrangosInput.value);
        
        if (novoPreco > 0 && novoTotalFrangos >= 0) {
            precoFrangoInput.value = novoPreco;
            contadorFrangos.textContent = novoTotalFrangos;
        } else {
            alert('Por favor, insira valores válidos.');
        }
    });
});
