const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const main = document.querySelector('.main-list')

btn.addEventListener('click', function (e) {
    e.preventDefault()

    let zipCode = input.value
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')


    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response) {
            main.innerHTML = ''
            if (response.data.erro) throw new Error('CEP imválido')
            createLine(`A sua cidade ${response.data.localidade} `)
            createLine(`Seu estado ${response.data.localidade} `)
            createLine(`Seu DDD deve ser ${response.data.ddd} `)
        })
        .catch(function (error) {
            main.innerHTML = ''
            createLine('Ops, algo deu errado! Tente novamente preenchendo os dados corretamente')
        })
})


function createLine(text) {
    const line = document.createElement('p')
    const texto = document.createTextNode(text)

    line.appendChild(texto)
    main.appendChild(line)
}
