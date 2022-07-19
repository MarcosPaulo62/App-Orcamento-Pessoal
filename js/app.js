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
        
        // Dialog de sucesso
        $('#sucessoGravacao').modal('show')
    } else {
        // Dialog de erro
        $('#erroGravacao').modal('show')
    }

    
}
 