
/* Criação das cartas */
let cards = [
  {
    "id": 1,
    "nome": "Luke Skywalker",
    "imagem": "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg",
    "atributos": {
      "ataque": 15,
      "defesa": 15,
      "magia": 15
    }
  },
  {
    "id": 2,
    "nome": "Darth Vader",
    "imagem": "https://disneyplusbrasil.com.br/wp-content/uploads/2021/06/Darth-Vader-serie-Disney-Plus-1024x576.jpg",
    "atributos": {
      "ataque": 20,
      "defesa": 18,
      "magia": 15
    }
  },
  {
    "id": 3,
    "nome": "Darth Sidious",
    "imagem": "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-emperor-palpatine-16x9-xl.jpg.adapt.crop1x1.320w.jpg",
    "atributos": {
      "ataque": 20,
      "defesa": 10,
      "magia": 25
    }
  },
  {
    "id": 4,
    "nome": "Obi-Wan Kenobi",
    "imagem": "https://img.olhardigital.com.br/wp-content/uploads/2021/03/obi-wan-kenobi-1024x635.jpg",
    "atributos": {
      "ataque": 10,
      "defesa": 20,
      "magia": 10
    }
  },
  {
    "id": 5,
    "nome": "Darth Maul",
    "imagem": "https://www.greenscene.co.id/wp-content/uploads/2020/07/Maul-696x497.jpg",
    "atributos": {
      "ataque": 18,
      "defesa": 10,
      "magia": 10
    }
  },
  {
    "id": 6,
    "nome": "Mestre Yoda",
    "imagem": "https://i.pinimg.com/originals/8a/7d/1f/8a7d1f40a77f99f287c3f2f1eff0d392.jpg",
    "atributos": {
      "ataque": 20,
      "defesa": 10,
      "magia": 25
    }
  }
]
let baralhoJogador = []
let baralhoMaquina = []
let cartaMaquina
let cartaJogador

/* 
  Sorteia a carta do jogador e da maquina, e exibe
  apenas a do jogador e limpa a ultima carta da máquina
*/
function sortearCarta() {
  for(let i = -1; i < cards.length; i++) {
    let numeroCartaMaquina = parseInt(Math.random() * cards.length)
    

    cartaMaquina = cards[numeroCartaMaquina]
    baralhoMaquina.push(cartaMaquina)
    cards.splice(numeroCartaMaquina, 1)

    
    if(cards.length == 1) {
      baralhoJogador.push(cards[0])
    } else {
      let numeroCartaJogador = parseInt(Math.random() * cards.length)
      while (numeroCartaMaquina == numeroCartaJogador) {
        numeroCartaJogador = parseInt(Math.random() * cards.length)
      }
      cartaJogador = cards[numeroCartaJogador]
      baralhoJogador.push(cartaJogador)
      cards.splice(numeroCartaJogador, 1)
    }
  }



  document.getElementById("btnSortear").disabled = true
  document.getElementById("btnJogar").disabled = false

  exibirCartaJogador()
  limparUltimaCarta()
}

/*
  Aqui será o atributo que as cartas irão disputar
*/
function obtemAtributoSelecionado() {
  let radioAtributos = document.getElementsByName("atributo")
  console.log(radioAtributos)
  for (let i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      console.log(" Valor radio: " + radioAtributos[i].value)
      return radioAtributos[i].value
    }
  }
}

/* 
  Para o jogador poder jogar novamente, é limpado qual
  foi a última carta da máquina 
*/
function limparUltimaCarta() {
  let divCartaMaquina = document.getElementById("carta-maquina")
  divCartaMaquina.style.backgroundImage = ""
  let moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';

  divCartaMaquina.innerHTML = moldura + "</div>"
}
/*
  Pega o valor do atributo selecionado de cada carta
  e compara as duas para ver quem ganhou
*/
function jogar() {
  let atributoSelecionado = obtemAtributoSelecionado()
  let divResultado = document.getElementById("resultado")
  let valorCartaJogador = cartaJogador.atributos[atributoSelecionado]
  let valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado]

  if (valorCartaJogador > valorCartaMaquina) {
    htmlResultado = "<p class='resultado-final'>Venceu</p>"
    baralhoJogador.push(cartaMaquina)
    baralhoMaquina.splice(baralhoMaquina.indexOf(cartaMaquina), 1)
  } else if (valorCartaMaquina > valorCartaJogador) {
    htmlResultado = "<p class='resultado-final'>Perdeu</p>"
    baralhoMaquina.push(cartaJogador)
    baralhoJogador.splice(baralhoJogador.indexOf(cartaJogador), 1)
  } else {
    htmlResultado = "<p class='resultado-final'>Empatou</p>"
  }
  divResultado.innerHTML = htmlResultado

  document.getElementById("btnSortear").disabled = true
  document.getElementById("btnJogar").disabled = false
  exibirCartaMaquina()
}

/*
  Exibe a carta do jogador selecionado o atributo mais alto
  que ela tem
*/
function exibirCartaJogador() {
  let divCartaJogador = document.getElementById("carta-jogador")
  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
  let moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  let tagHTML = "<div id='opcoes' class='carta-status'>"
  let atributosArr = []
  let opcoesTexto = ""

  for (let atributo in cartaJogador.atributos) {
    atributosArr.push(cartaJogador.atributos[atributo])
    console.log(cartaJogador.atributos[atributo])
  }
  atributosArr.sort((a, b) => a - b)
  for (let atributo in cartaJogador.atributos) {
    if (atributosArr[atributosArr.length - 1] <= cartaJogador.atributos[atributo]) {
      opcoesTexto += `<input checked type="radio" name="atributo" value="${atributo}">${atributo} ${cartaJogador.atributos[atributo]} <br>`
    } else {
      opcoesTexto += `<input type="radio" name="atributo" value="${atributo}">${atributo} ${cartaJogador.atributos[atributo]} <br>`
    }
  }
  let nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`

  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>"
}

/* 
  Mesma coisa que a carta do jogador, só que devido a ser a máquina,
  o atributo selecionado dela será o mesmo do jogador. 
*/
function exibirCartaMaquina() {
  let divCartaMaquina = document.getElementById("carta-maquina")
  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
  let moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  let tagHTML = "<div id='opcoes' class='carta-status'>"

  let opcoesTexto = ""

  for (let atributo in cartaMaquina.atributos) {
    opcoesTexto += `<p type="radio" name="atributo" value="${atributo}">${atributo} ${cartaMaquina.atributos[atributo]} </p>`
  }
  let nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`

  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>"
}