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

    console.log(despesa)
}