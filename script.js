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

    // Elementos para reserva
    const reservaCheckbox = document.getElementById('reservaCheckbox');
    const nomeReservaInput = document.getElementById('nomeReserva');

    // Carregar valores do localStorage
    function carregarValores() {
        const quantidadeFrangosSalvos = localStorage.getItem('quantidadeFrangos') || 10;
        const precoFrangoSalvo = localStorage.getItem('precoFrango') || 10;

        contadorFrangos.innerText = quantidadeFrangosSalvos;
        precoFrangoInput.value = precoFrangoSalvo;
    }

    // Salvar valores no localStorage
    function salvarValores() {
        const quantidadeFrangos = parseInt(contadorFrangos.innerText);
        const precoFrango = parseFloat(precoFrangoInput.value);

        localStorage.setItem('quantidadeFrangos', quantidadeFrangos);
        localStorage.setItem('precoFrango', precoFrango);
    }

    // Chama a função para carregar os valores ao iniciar
    carregarValores();

    // Mostra ou esconde informações da linguiça
    linguicaCheckbox.addEventListener('change', () => {
        linguicaInfo.style.display = linguicaCheckbox.checked ? 'block' : 'none';
    });

    // Mostra ou esconde o campo de nome da reserva
    reservaCheckbox.addEventListener('change', () => {
        nomeReservaInput.style.display = reservaCheckbox.checked ? 'block' : 'none';
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
        let reciboText = `Você comprou ${quantidade} frango(s) e ${quantidadeLinguica} linguiça(s).`;
        
        // Sempre verifica se o checkbox de reserva está selecionado
        if (reservaCheckbox.checked) {
            const nomeReserva = nomeReservaInput.value.trim() || "Não especificado";
            reciboText += `<br>Reserva: ${nomeReserva}`;
        }
        
        reciboContent.innerHTML = reciboText;
        reciboValor.innerText = `Total a pagar: R$ ${total.toFixed(2)}`;
        reciboData.innerText = new Date().toLocaleDateString();

        // Exibe o recibo
        recibo.style.display = 'block';

        // Chama a função de impressão automaticamente
        setTimeout(() => {
            window.print();
        }, 500); // Aguarda meio segundo para garantir que o recibo seja renderizado

        // Salva os valores atualizados
        salvarValores();
    });

    atualizarBtn.addEventListener('click', () => {
        const totalFrangos = parseInt(totalFrangosInput.value);
        contadorFrangos.innerText = totalFrangos;
        salvarValores(); // Salva a quantidade atualizada
    });
});
