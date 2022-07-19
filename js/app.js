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
 