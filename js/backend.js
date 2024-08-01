// backend.js

const token = 'fb935631-4684-4e8c-b751-ef2e3288f568';

// Função para buscar a lista de chamados
function buscarChamados() {
    fetch('https://backchamadoentrevista.esferasolutions.com.br/chamados/', {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        const listaChamados = document.getElementById('lista-chamados');
        const mensagemErro = document.getElementById('mensagem-erro');
        listaChamados.innerHTML = '';
        if (data.length > 0) {
            data.forEach(chamado => {
                const itemLista = document.createElement('li');
                itemLista.textContent = `${chamado.assunto} - ${chamado.descricao}`;
                itemLista.onclick = () => visualizarChamado(chamado.id);
                listaChamados.appendChild(itemLista);
            });
            mensagemErro.textContent = '';
        } else {
            mensagemErro.textContent = 'Nenhum chamado encontrado.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensagem-erro').textContent = 'Erro ao carregar a lista de chamados.';
    });
}

// Função para criar um novo chamado
function criarChamado(assunto, descricao, local, prioridade, criado_por, anexo) {
    const formData = new FormData();
    formData.append('file', anexo);

    fetch('https://backchamadoentrevista.esferasolutions.com.br/chamados/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        const nomeAnexo = result.fileName;
        const raw = JSON.stringify({
            assunto: assunto,
            descricao: descricao,
            local: local,
            prioridade: prioridade,
            anexo: nomeAnexo,
            criado_por: criado_por
        });

        return fetch('https://backchamadoentrevista.esferasolutions.com.br/chamados/', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: raw
        });
    })
    .then(response => response.json())
    .then(result => {
        console.log('Chamado criado:', result);
        carregarChamados();
    })
    .catch(error => console.error('Error:', error));
}

// Função para buscar detalhes de um chamado
function buscarDetalhesChamado(id, modo = 'visualizar') {
    fetch(`https://backchamadoentrevista.esferasolutions.com.br/chamados/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (modo === 'visualizar') {
            document.getElementById('detalhes-visualizar').innerHTML = `
                <p>Assunto: ${data.assunto}</p>
                <p>Descrição: ${data.descricao}</p>
                <p>Local: ${data.local}</p>
                <p>Prioridade: ${data.prioridade}</p>
                <p>Criado por: ${data.criado_por}</p>
                <p>Anexo: <a href="https://backchamadoentrevista.esferasolutions.com.br/chamados/download/${data.anexo}" target="_blank">${data.anexo}</a></p>
                <button onclick="mostrarFormularioEdicao(${data.id})">Editar</button>
            `;
            document.getElementById('secao-visualizar').style.display = 'block';
            document.getElementById('secao-editar').style.display = 'none';
        } else if (modo === 'editar') {
            document.getElementById('campo-editar-assunto').value = data.assunto;
            document.getElementById('campo-editar-descricao').value = data.descricao;
            document.getElementById('campo-editar-local').value = data.local;
            document.getElementById('campo-editar-prioridade').value = data.prioridade;
            document.getElementById('secao-editar').dataset.id = id;
            document.getElementById('secao-editar').style.display = 'block';
            document.getElementById('secao-visualizar').style.display = 'none';
        }
    })
    .catch(error => console.error('Error:', error));
}

// Função para atualizar um chamado
function atualizarChamado(id, assunto, descricao, local, prioridade, anexo) {
    const formData = new FormData();
    formData.append('file', anexo);

    fetch('https://backchamadoentrevista.esferasolutions.com.br/chamados/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        const nomeAnexo = result.fileName;
        const raw = JSON.stringify({
            assunto: assunto,
            descricao: descricao,
            local: local,
            prioridade: prioridade,
            anexo: nomeAnexo
        });

        return fetch(`https://backchamadoentrevista.esferasolutions.com.br/chamados/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: raw
        });
    })
    .then(response => response.json())
    .then(result => {
        console.log('Chamado atualizado:', result);
        carregarChamados();
        document.getElementById('secao-editar').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}