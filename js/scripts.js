// dom.js

// Função para carregar a lista de chamados
function carregarChamados() {
    buscarChamados();
}

// Função para visualizar detalhes de um chamado
function visualizarChamado(id) {
    buscarDetalhesChamado(id);
    document.getElementById('mostrar-formulario-criar').style.display = 'none';
}

// Função para fechar a visualização de detalhes
function fecharVisualizacao() {
    document.getElementById('secao-visualizar').style.display = 'none';
    document.getElementById('mostrar-formulario-criar').style.display = 'block';
}

// Função para mostrar o formulário de edição
function mostrarFormularioEdicao(id) {
    buscarDetalhesChamado(id, 'editar');
    document.getElementById('mostrar-formulario-criar').style.display = 'none';
}

// Função para mostrar o formulário de criar chamado
function mostrarFormularioCriar() {
    document.getElementById('secao-criar').style.display = 'block';
    document.getElementById('mostrar-formulario-criar').style.display = 'none';
}

// Função para cancelar a criação de chamado
function cancelarCriacao() {
    if (confirm('Tem certeza de que deseja cancelar a criação do chamado?')) {
        document.getElementById('formulario-criar').reset();
        document.getElementById('secao-criar').style.display = 'none';
        document.getElementById('mostrar-formulario-criar').style.display = 'block';
        
    }
}

// Função para cancelar a edição de chamado
function cancelarEdicao() {
    if (confirm('Tem certeza de que deseja cancelar a edição do chamado?')) {
        document.getElementById('formulario-editar').reset();
        document.getElementById('secao-editar').style.display = 'none';
        document.getElementById('mostrar-formulario-criar').style.display = 'block';
    }
}

// Função para exibir detalhes de um chamado
function exibirDetalhes(id) {
    visualizarChamado(id);
}

// Adiciona o listener para mostrar o formulário de criar chamado
document.getElementById('mostrar-formulario-criar').addEventListener('click', function() {
    mostrarFormularioCriar();
});

// Adiciona o listener para criar chamado
document.getElementById('formulario-criar').addEventListener('submit', function(event) {
    event.preventDefault();
    if (confirm('Tem certeza de que deseja salvar o chamado?')) {
        const assunto = document.getElementById('campo-assunto').value;
        const descricao = document.getElementById('campo-descricao').value;
        const local = document.getElementById('campo-local').value;
        const prioridade = document.getElementById('campo-prioridade').value;
        const criado_por = document.getElementById('campo-criado-por').value;
        const anexo = document.getElementById('campo-anexo').files[0];

        criarChamado(assunto, descricao, local, prioridade, criado_por, anexo);

        // Limpar o formulário após salvar
        document.getElementById('formulario-criar').reset();
        document.getElementById('secao-criar').style.display = 'none';
        document.getElementById('mostrar-formulario-criar').style.display = 'block';
    }
});

// Adiciona o listener para cancelar a criação de chamado
document.getElementById('cancelar-criacao').addEventListener('click', function() {
    cancelarCriacao();
});

// Adiciona o listener para editar chamado
document.getElementById('formulario-editar').addEventListener('submit', function(event) {
    event.preventDefault();
    if (confirm('Tem certeza de que deseja atualizar o chamado?')) {
        const id = document.getElementById('secao-editar').dataset.id;
        const assunto = document.getElementById('campo-editar-assunto').value;
        const descricao = document.getElementById('campo-editar-descricao').value;
        const local = document.getElementById('campo-editar-local').value;
        const prioridade = document.getElementById('campo-editar-prioridade').value;
        const criado_por = document.getElementById('campo-editar-criado-por').value;
        const anexo = document.getElementById('campo-editar-anexo').files[0];

        atualizarChamado(id, assunto, descricao, local, prioridade, criado_por, anexo);
    }

});

// Adiciona o listener para cancelar a edição de chamado
document.getElementById('cancelar-edicao').addEventListener('click', function() {
    cancelarEdicao();
    
});

// Função para atualizar a lista de chamados com o botão de detalhes e contador
function atualizarListaChamados(chamados) {
    const listaChamados = document.getElementById('lista-chamados');
    const contadorChamados = document.getElementById('contador-chamados');
    listaChamados.innerHTML = ''; // Limpa a lista

    chamados.forEach(chamado => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${chamado.assunto}</strong><br>
            Descrição: ${chamado.descricao}<br>
            Local: ${chamado.local}<br>
            Prioridade: ${chamado.prioridade}<br>
            Criado por: ${chamado.criado_por}<br>
            <button onclick="exibirDetalhes(${chamado.id})">Detalhes</button>
        `;
        listaChamados.appendChild(li);
    });

    // Atualiza o contador de chamados
    contadorChamados.textContent = `Total de Chamados: ${chamados.length}`;
}

// Carregar a lista de chamados ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    carregarChamados();
});
