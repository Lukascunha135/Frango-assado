document.addEventListener('DOMContentLoaded', () => {
            const contadorFrangos = document.getElementById('contadorFrangos');
            const faturarBtn = document.getElementById('faturarBtn');
            const quantidadeInput = document.getElementById('quantidade');
            const temAdicionalCheckbox = document.getElementById('temAdicionalCheckbox');
            const linguicaInfo = document.getElementById('linguicaInfo');
            const precoFrangoInput = document.getElementById('precoFrango');
            const precoLinguicaInput = document.getElementById('precoLinguica');
            const quantidadeLinguicaInput = document.getElementById('quantidadeLinguica');
            const totalFrangosInput = document.getElementById('totalFrangos');
            const atualizarBtn = document.getElementById('atualizarBtn');
            const recibo = document.getElementById('recibo');
            const reciboContent = document.getElementById('reciboContent');
            const reciboValor = document.getElementById('reciboValor');
            const reciboData = document.getElementById('reciboData');
            const reservaCheckbox = document.getElementById('reservaCheckbox');
            const nomeReservaInput = document.getElementById('nomeReserva');

            // Mostrar/Esconder informações de linguiça
            temAdicionalCheckbox.addEventListener('change', () => {
                linguicaInfo.style.display = temAdicionalCheckbox.checked ? 'block' : 'none';
            });

            // Mostrar/Esconder campo de nome de reserva
            reservaCheckbox.addEventListener('change', () => {
                nomeReservaInput.style.display = reservaCheckbox.checked ? 'block' : 'none';
            });

            faturarBtn.addEventListener('click', () => {
                const quantidadeFrangos = parseInt(quantidadeInput.value) || 0;
                const precoFrango = parseFloat(precoFrangoInput.value);
                const precoLinguica = parseFloat(precoLinguicaInput.value);

                // Cada frango dá direito a uma linguiça grátis
                const linguicasGratis = quantidadeFrangos;

                // Verifica a quantidade adicional de linguiças, se o checkbox estiver marcado
                let quantidadeLinguicaAdicional = 0;
                let totalLinguicaCobrar = 0;
                let linguicasAdicionaisTexto = "";

                if (temAdicionalCheckbox.checked) {
                    const quantidadeLinguica = parseInt(quantidadeLinguicaInput.value) || 0;
                    // Quantidade de linguiças adicionais que serão cobradas
                    quantidadeLinguicaAdicional = quantidadeLinguica;
                    totalLinguicaCobrar = quantidadeLinguicaAdicional * precoLinguica;
                    linguicasAdicionaisTexto = `${quantidadeLinguicaAdicional} linguiça adicional a R$ ${precoLinguica.toFixed(2)} cada. `;
                }

                // Calcula o total
                const total = (quantidadeFrangos * precoFrango) + totalLinguicaCobrar;

                // Atualiza o contador de frangos
                const frangosDisponiveis = parseInt(contadorFrangos.innerText);
                contadorFrangos.innerText = Math.max(0, frangosDisponiveis - quantidadeFrangos); // Não permitir quantidade negativa

                // Gera um número de recibo único para dificultar falsificação
                const numeroRecibo = Date.now().toString().slice(-6);

                // Atualiza o recibo
                let reciboText = `<strong>Estação do Frango</strong><br>Bom Almoço!<br>`;
                
                if (reservaCheckbox.checked && nomeReservaInput.value) {
                    reciboText += `Reservado para: ${nomeReservaInput.value}<br>`;
                }

                reciboText += `${quantidadeFrangos} Frango Assado<br>`;
                reciboText += `${linguicasGratis} linguiça + ${quantidadeLinguicaAdicional} linguiça(s) adicional(is)<br>`;
                reciboText += `${linguicasGratis} saquinho(s) de farofa<br>`;

                if (reservaCheckbox.checked && nomeReservaInput.value) {
                    reciboText += `Reservado para: ${nomeReservaInput.value}<br>`;
                }

                reciboText += `Número do recibo: ${numeroRecibo}<br>`;
                reciboText += `Vencimento do recibo: ${new Date().toLocaleDateString()}`;

                reciboContent.innerHTML = reciboText;
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
