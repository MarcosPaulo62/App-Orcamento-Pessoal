class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d)) 
        // Passando identificador do objeto e o objeto no formato JSON

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let id = localStorage.getItem('id')
        let despesas = []

        // recuperando todas as despesas
        for(let i = id; i >= 1; i--) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa != null){
                despesa.id = i
                despesas.push(despesa)
            }
        }

        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = this.recuperarTodosRegistros()

        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
 
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        //descrição
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => parseFloat(d.valor) == parseFloat(despesa.valor))
        }

        return despesasFiltradas
    }

    remover(id) {
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = {
        ano: ano.value,
        mes: mes.value,
        dia: dia.value,
        tipo: tipo.value,
        descricao: descricao.value,
        valor: valor.value
    }

    let gravar = true
    let dados = [ano, mes, dia, tipo, descricao, valor]

    // Verificando se todos os campos estão preenchidos
    for(let c in dados) { 
        if(dados[c].value == '' || dados[c].value == null || dados[c].value == undefined){
            gravar = false
        }
    } 

    if(gravar) {
        bd.gravar(despesa)

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

        document.getElementById('tituloModal').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('descricaoModal').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('botaoModal').innerHTML = 'Voltar'
        document.getElementById('classeTituloModal').className = 'modal-header text-success'
        document.getElementById('botaoModal').className = 'btn btn-success'

        // Dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
    } else {
        document.getElementById('tituloModal').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('descricaoModal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        document.getElementById('botaoModal').innerHTML = 'Voltar e corrigir'
        document.getElementById('classeTituloModal').className = 'modal-header text-danger'
        document.getElementById('botaoModal').className = 'btn btn-danger'

        // Dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas() {
    let despesas = bd.recuperarTodosRegistros() // Array das despesas

    preencherTabela(despesas)
}
 
function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = {
        ano, mes, dia, tipo, descricao, valor
    }

    // Recuperando despesas filtradas
    let despesasFiltradas = bd.pesquisar(despesa)

    preencherTabela(despesasFiltradas)
}

function preencherTabela(despesas) {
    let listaDespesas = document.getElementById('listaDespesas') // body da tabela
    listaDespesas.innerHTML = '' // Limpando tabela

    // Percorrendo despesas filtradas
    despesas.forEach( x => {

        // criando a linha (tr)
        let linha = listaDespesas.insertRow()

        // definindo tipo com base no número correspondente
        switch (x.tipo) {
            case '1':
                x.tipo = 'Alimentação'
                break;
            case '2':
                x.tipo = 'Educação'
                break;
            case '3':
                x.tipo = 'Lazer'
                break;
            case '4':
                x.tipo = 'Saúde'
                break;
            case '5':
                x.tipo = 'Transporte'
                break;
        }
        
        // criar as colunas (td)
        linha.insertCell(0).innerHTML = `${x.dia}/${x.mes}/${x.ano}`
        linha.insertCell(1).innerHTML = x.tipo
        linha.insertCell(2).innerHTML = x.descricao
        linha.insertCell(3).innerHTML = x.valor
        
        //criar botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${x.id}` // passando id da despesa como id do botão
        btn.onclick = function() {
            // formatando o id
            let id = this.id.replace('id_despesa_', '')
            
            // Removendo item do local storage
            bd.remover(id)

            // Recarregando a página para atualizar a lista
            window.location.reload()
        }
        linha.insertCell(4).append(btn)


    })
}