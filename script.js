//Variáveis
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.getElementById('alternar-musica')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const pauseButton = document.querySelector('.app__card-primary-butto-icon')

//Variáveis do Temporizador
const tempoNaTela = document.querySelector('#timer')

//Variáveis de Sons
const musica = new Audio('/Fokus-projeto-base/sons/luna-rise-part-one.mp3')
const pause = new Audio('/Fokus-projeto-base/sons/pause.mp3')
const play = new Audio('/Fokus-projeto-base/sons/play.wav')
const tempoFinalizado = new Audio('/Fokus-projeto-base/sons/beep.mp3')

//Variáveis Botoes "Começar e Pausar" e Temporizador 
let tempoDecorridoEmSegundos = 1500 
let intervaloId = null

//Fuções de Sons
musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

//Funções dos botoes
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})
//Função do texto
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/Fokus-projeto-base/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma repirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>` 
            break;   
        default:
            break;
    }
}
//Funções do temporizador
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        tempoFinalizado.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

//Funções Botoes "Começar e Pausar"
startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId) {
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    pauseButton.setAttribute('src', `/Fokus-projeto-base/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    pauseButton.setAttribute('src', `/Fokus-projeto-base/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()