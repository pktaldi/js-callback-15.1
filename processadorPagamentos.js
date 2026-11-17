function processarTransacaoPix(chavePix, valor, callbackAcao) {
  if (valor <= 0) {
    console.log("❌ Erro: O valor da transação deve ser maior que zero.");
    return;
  }

  const transacao = {
    id: Math.floor(Math.random() * 100000),
    chavePix,
    valor,
    data: new Date().toLocaleTimeString()
  };

  callbackAcao(transacao);
}

function emitirComprovantePorEmail(transacao) {
  console.log(
    `📧 [COMPROVANTE] Transação #${transacao.id} de R$ ${transacao.valor.toFixed(2)} enviada para a chave ${transacao.chavePix} às ${transacao.data}.`
  );
}

function creditarCashback(transacao) {
  const bonus = transacao.valor * 0.02;
  console.log(
    `💰 [CASHBACK] Bônus de R$ ${bonus.toFixed(2)} (2%) creditado pela transação #${transacao.id}.`
  );
}

function auditarTransacaoSuspeita(transacao) {
  if (transacao.valor > 5000) {
    console.log(
      `🚩 [ALERTA ANTIFRAUDE] Bandeira vermelha! Transação #${transacao.id} no valor de R$ ${transacao.valor.toFixed(2)} enviada para análise.`
    );
  } else {
    console.log(
      `✅ [AUDITORIA] Transação #${transacao.id} aprovada dentro do limite normal.`
    );
  }
}

processarTransacaoPix("cliente@email.com", 250, emitirComprovantePorEmail);
processarTransacaoPix("11999998888", 500, creditarCashback);
processarTransacaoPix("123.456.789-00", 7500, auditarTransacaoSuspeita);

processarTransacaoPix("loja@parceira.com", 100, (transacao) => {
  const valorComDesconto = transacao.valor - 5;
  console.log(
    `🏷️ [DESCONTO] Transação #${transacao.id}: Taxa de R$ 5,00 aplicada. Valor final: R$ ${valorComDesconto.toFixed(2)}.`
  );
});

function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
  console.log(
    `⏳ [${new Date().toLocaleTimeString()}] Notificação de webhook agendada para a transação #${transacao.id}...`
  );

  setTimeout(() => {
    callbackFinalizacao(transacao);
  }, 2000);
}

processarTransacaoPix("ecommerce@loja.com", 320, (transacao) => {
  enviarWebhookAssincrono(transacao, (dados) => {
    console.log(
      `🔔 [${new Date().toLocaleTimeString()}] Webhook entregue com sucesso para a loja externa (ID #${dados.id})!`
    );
  });
});