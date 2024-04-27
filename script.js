
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto"); 
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const  titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const iniciarTemporizador = new Audio('/sons/play.wav');
const pausarTemporizador = new Audio('/sons/pause.mp3');
const finalizarTemporizador = new Audio('/sons/beep.mp3');
const imagemBt = document.querySelector('.app__card-primary-butto-icon');
const tempoNatela = document.querySelector('#timer');

let tempoDecorridoEmSegundo = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
});

focoBt.addEventListener("click", () =>{
    tempoDecorridoEmSegundo = 1500;
    alterarContexto('foco'); 
    focoBt.classList.add("active") ;
});

curtoBt.addEventListener("click", () =>{
    tempoDecorridoEmSegundo = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add("active") ; 
});

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundo = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add("active") ; 
})

function alterarContexto(contexto){

    mostrarTempo();
    botoes.forEach((botao) =>{
        botao.classList.remove("active");
    })

    html.setAttribute("data-contexto",contexto);
    banner.setAttribute("src",`/imagens/${contexto}.png`);

    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
       `;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
       `;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
       `;
            break;
        default :
            break;
    }
}

const contagemRegressiva = () => { 
    
    if(tempoDecorridoEmSegundo <= 0){
        finalizarTemporizador.play();
        zera();
        alert("Finalizar");
        return;
    }
    tempoDecorridoEmSegundo -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener("click",  iniciarOuPausar);

function iniciarOuPausar(){
    
    if(intervaloId){
        pausarTemporizador.play();
        zera();
        return;
    }

    iniciarTemporizador.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    imagemBt.setAttribute('src', '/imagens/pause.png');
}

function zera(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    imagemBt.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundo * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br',{minute:'2-digit',second:'2-digit'})
    tempoNatela.innerHTML = `${tempoFormatado} `;
}

mostrarTempo();