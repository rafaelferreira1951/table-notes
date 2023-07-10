let nomeParticipanteCount = 0;
let vozCount = 0;
let cantoCount = 0;
let arrayNotas = [];

function adicionaLinha(idTabela) {
  nomeParticipanteCount++;
  vozCount++;
  cantoCount++;

  const tabela = document.getElementById(idTabela);
  const linha = tabela.insertRow();
  linha.innerHTML = `
    <td><input type="text" id="nomeParticipante${nomeParticipanteCount}"></td>
    <td><input type="number" id="voz${vozCount}"></td>
    <td><input type="number" id="canto${cantoCount}"></td>
    <td><button class="btnAdd" onclick="removeLinha(this)">Remover</button></td>
  `;
}

function removeLinha(linha) {
  const i = linha.parentNode.parentNode.rowIndex;
  document.getElementById('tbl').deleteRow(i);
}

function salvar() {
  const novaNotas = [];

  for (let i = 0; i <= nomeParticipanteCount; i++) {
    const nomeParticipante = document.getElementById(`nomeParticipante${i}`).value;
    const notaVoz = Number(document.getElementById(`voz${i}`).value);
    const notaCanto = Number(document.getElementById(`canto${i}`).value);
    const resultado = notaVoz + notaCanto;

    novaNotas.push({ nomeParticipante, voz: notaVoz, canto: notaCanto, resultado });
  }

  arrayNotas = novaNotas;
  exibirResultado();

  const confirmacao = confirm("Deseja salvar as notas em um arquivo JSON?");
  if (confirmacao) {

    const blob = new Blob([JSON.stringify(arrayNotas)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'notas.json';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

function exibirResultado() {
  const tabelaResultado = document.getElementById('tabelaResultado');
  tabelaResultado.innerHTML = `
    <tr>
      <th class="thTblResult">Nome</th>
      <th class="thTblResult">Voz</th>
      <th class="thTblResult">Canto</th>
      <th class="thTblResult">Resultado</th>
    </tr>
    ${arrayNotas
      .map(
        (nota) => `
        <tr>
          <td>${nota.nomeParticipante}</td>
          <td>${nota.voz}</td>
          <td>${nota.canto}</td>
          <td>${nota.resultado}</td>
        </tr>
      `
      )
      .join('')}
  `;
}

function showArray() {
  exibirResultado();
}
