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
                despesas.push(despesa)
            }
        }

        return despesas
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

    let listaDespesas = document.getElementById('listaDespesas') // body da tabela

    /*
    <tr>
        <td>15/03/2018</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>500.00</td>
    </tr>
    */

    // Percorrendo despesas
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
    })
}
 