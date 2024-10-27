document.addEventListener('DOMContentLoaded', function() {
    const faturarBtn = document.getElementById('faturarBtn');
    const atualizarBtn = document.getElementById('atualizarBtn');
    const quantidadeInput = document.getElementById('quantidade');
    const contadorFrangos = document.getElementById('contadorFrangos');
    const precoFrangoInput = document.getElementById('precoFrango');
    const totalFrangosInput = document.getElementById('totalFrangos');
    const recibo = document.getElementById('recibo');
    const reciboContent = document.getElementById('reciboContent');
    const reciboValor = document.getElementById('reciboValor');
    const reciboData = document.getElementById('reciboData');
    const linguicaCheckbox = document.getElementById('linguicaCheckbox');
    const linguiçaContainer = document.getElementById('linguicaContainer');
    const quantidadeLinguicaInput = document.getElementById('quantidadeLinguica');

    // Carregar dados do localStorage
    const frangosDisponiveis = localStorage.getItem('frangosDisponiveis');
    const precoFrango = localStorage.getItem('precoFrango');

    // Se existir um valor salvo, atualiza os elementos na página
    if (frangosDisponiveis) {
        contadorFrangos.textContent = frangosDisponiveis;
        totalFrangosInput.value = frangosDisponiveis;
    }
    
    // Se existir um preço salvo, atualiza o campo de preço
    if (precoFrango) {
        precoFrangoInput.value = precoFrango;
    }

    // Exibir ou ocultar o campo de linguiça
    linguicaCheckbox.addEventListener('change', function() {
        linguiçaContainer.style.display = linguicaCheckbox.checked ? 'block' : 'none';
    });

    faturarBtn.addEventListener('click', function() {
        const quantidade = parseInt(quantidadeInput.value);
        const totalFrangos = parseInt(contadorFrangos.textContent);
        const quantidadeLinguica = parseInt(quantidadeLinguicaInput.value);
        const precoFrango = parseFloat(precoFrangoInput.value);

        // Verifica se a quantidade de frangos e linguiças está correta
        if (quantidade > 0 && quantidade <= totalFrangos && quantidadeLinguica >= 0) {
            // Atualiza a contagem de frangos disponíveis
            const novosFrangos = totalFrangos - quantidade;
            contadorFrangos.textContent = novosFrangos;

            // Salva a nova quantidade de frangos no localStorage
            localStorage.setItem('frangosDisponiveis', novosFrangos);

            // Gera o conteúdo do recibo
            reciboContent.innerHTML = `Frangos: ${quantidade}<br>`;
            if (quantidadeLinguica > 0) {
                reciboContent.innerHTML += `Linguiças: ${quantidadeLinguica}<br>`;
            }

            // Calcula e exibe o valor total dos frangos
            const valorTotal = quantidade * precoFrango;
            reciboValor.innerHTML = `Valor: R$ ${valorTotal.toFixed(2)}`;

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

            // Salva o novo preço e a nova quantidade de frangos no localStorage
            localStorage.setItem('precoFrango', novoPreco);
            localStorage.setItem('frangosDisponiveis', novoTotalFrangos);
        } else {
            alert('Por favor, insira valores válidos.');
        }
    });
});
