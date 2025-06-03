// variables
let hora = document.getElementById('hora');
let minutos = document.getElementById('minutos');
let segundos = document.getElementById('segundos');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');
let bomba = document.getElementById('container-2');
let contador = 1;
let yaEjecutadoCorreccion = false;
let regresionSegundos;
let regresionMinutos;
let regresionHora;
let reiniciar;

// eventos
validarInput(hora);
validarInput(minutos);
validarInput(segundos);

limitarNumero(hora);
limitarNumero(minutos);
limitarNumero(segundos);

stop.addEventListener('click', ()=>{
    detener();
});

reset.addEventListener('click', ()=>{
    resetear();
    location.reload();
});

document.addEventListener('DOMContentLoaded',()=>{
    hora.textContent= '00';
    minutos.textContent= '00';
    segundos.textContent= '00';
    bomba.textContent = '💣';
});

start.addEventListener('click', ()=>{
    iniciar();
})




// funciones
function validarInput(elementos){
    elementos.addEventListener('input', function() {
        this.textContent = this.textContent.replace(/[^0-9]/g,'');

        if(this.textContent.length > 2){
            this.textContent = this.textContent.slice(0,2);
        }else if(this.textContent.length<=2){
            this.textContent = '00';
        };
    });
};

function resetear(){
    hora.textContent = '00';
    minutos.textContent = '00';
    segundos.textContent = '00';
    if (hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00') {
            clearInterval(regresionSegundos);
            clearInterval(regresionMinutos);
            clearInterval(regresionHora);
    }
    // location.reload();
};

function limitarNumero(numero){
    numero.addEventListener('input',function(){
        valorId = this.id;

        if(valorId === 'hora'){

        if(this.textContent > '23'){
            this.textContent = '00';
        }

    };

        if(valorId === 'minutos' || valorId === 'segundos'){

            if(this.textContent > '59'){
                this.textContent = '00';
            }
        };
    });
};

function iniciar(){
    if(hora.textContent >= 1 && minutos.textContent === '00' && segundos.textContent === '00'){
        minutos.textContent = '59';
        segundos.textContent = '59';
        let valorHora = parseInt(hora.textContent);
        valorHora -= contador;
        hora.textContent = valorHora < 10 ? '0' + valorHora: valorHora;  
    }

    if(minutos.textContent >= 1 && segundos.textContent === '00'){
        segundos.textContent = '59';

        let valorMinutos = parseInt(minutos.textContent);
        valorMinutos -= contador;
        minutos.textContent = valorMinutos < 10 ? '0' + valorMinutos : valorMinutos;
    }

    

    if(hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00'){
        clearInterval(regresionSegundos);
        clearInterval(regresionMinutos);
        clearInterval(regresionHora);
    }

    


    // intervalos

    // segundos
    regresionSegundos = setInterval(() => {
    if(hora.textContent >=1 || minutos.textContent >= 1 || segundos.textContent > 0){
            let valorSegundos = parseInt(segundos.textContent);
            valorSegundos -= contador;
            segundos.textContent = valorSegundos < 10 ? '0' + valorSegundos : valorSegundos;
    }
    

    if (minutos.textContent >= 1 && segundos.textContent === '00') {
        segundos.textContent = '60';
    }

    if(hora.textContent >= 1  && minutos.textContent === '00' && !yaEjecutadoCorreccion && segundos.textContent === '00'){
        minutos.textContent = '59';
        segundos.textContent = '60';
        let valorHora = parseInt(hora.textContent);
        valorHora -= contador;
        hora.textContent = valorHora < 10 ? '0' + valorHora : valorHora;
        yaEjecutadoCorreccion = true;
        
        // Reiniciar Intervalo
        // minutos
        clearInterval(regresionMinutos);
        regresionMinutos = setInterval(() => {
            let valorMinutosInterno = parseInt(minutos.textContent);
            valorMinutosInterno -= contador;
            minutos.textContent = valorMinutosInterno < 10 ? '0' + valorMinutosInterno : valorMinutosInterno;

            if (hora.textContent >= 1 && minutos.textContent === '00' && segundos.textContent === '00') {
                minutos.textContent = '60';
                segundos.textContent = '60';
            }

            if (hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00') {
                clearInterval(regresionSegundos);
                clearInterval(regresionMinutos);
                clearInterval(regresionHora);
            }
        }, 60000);
        // hora
        clearInterval(regresionHora);
        regresionHora = setInterval(()=>{
        let valorHora = parseInt(hora.textContent);
        valorHora -= contador;
        hora.textContent = valorHora < 10 ? '0' + valorHora : valorHora;

            if(hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00'){
        clearInterval(regresionSegundos);
        clearInterval(regresionMinutos);
        clearInterval(regresionHora);
    }
    },3600000);
    return;
}

    if (segundos.textContent !== '59' && parseInt(minutos.textContent) >= 1 && segundos.textContent === '60' && !yaEjecutadoCorreccion) {
        segundos.textContent = '60';
        let valorMinutos = parseInt(minutos.textContent);
        valorMinutos -= contador;
        minutos.textContent = valorMinutos < 10 ? '0' + valorMinutos : valorMinutos;

        // Reiniciar el intervalo de minutos
        clearInterval(regresionMinutos);
        regresionMinutos = setInterval(() => {
            let valorMinutosInterno = parseInt(minutos.textContent);
            valorMinutosInterno -= contador;
            minutos.textContent = valorMinutosInterno < 10 ? '0' + valorMinutosInterno : valorMinutosInterno;

            if (hora.textContent >= 1 && minutos.textContent === '00' && segundos.textContent === '00') {
                minutos.textContent = '60';
                segundos.textContent = '60';
            }

            if (hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00') {
                clearInterval(regresionSegundos);
                clearInterval(regresionMinutos);
                clearInterval(regresionHora);
            }
        }, 60000);

        return;
    }

    if(hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '02'){
        audio('audio/contadorBomba.mp3');
    }

    if (hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00') {
        clearInterval(regresionSegundos);
        clearInterval(regresionMinutos);
        clearInterval(regresionHora);
        bomba.textContent = '💥';
        audio('audio/explosion-fx-343683.mp3');
        reiniciar = setInterval(()=>{
            location.reload();
        },10000);
    }
}, 1000);

    // minutos
    regresionMinutos = setInterval(() => {
        if(hora.textContent >= 1 || minutos.textContent >= 1){
    let valorMinutos = parseInt(minutos.textContent);
    valorMinutos -= contador;
    minutos.textContent = valorMinutos < 10 ? '0' + valorMinutos : valorMinutos;
        }

    if (hora.textContent >= 1 && minutos.textContent === '00' && segundos.textContent === '00') {
        minutos.textContent = '59';
        segundos.textContent = '60';
    }

    

    if (hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00') {
        bomba.textContent = '💥';
        audio('audio/explosion-fx-343683.mp3');
        clearInterval(regresionSegundos);
        clearInterval(regresionMinutos);
        clearInterval(regresionHora);
    }
}, 60000);
        
        // horas
        regresionHora = setInterval(()=>{
        let valorHora = parseInt(hora.textContent);
        valorHora -= contador;
        hora.textContent = valorHora < 10 ? '0' + valorHora : valorHora;

    if(hora.textContent === '00' && minutos.textContent === '00' && segundos.textContent === '00'){
        bomba.textContent = '💥';
        audio('audio/explosion-fx-343683.mp3');
        clearInterval(regresionSegundos);
        clearInterval(regresionMinutos);
        clearInterval(regresionHora);
        
    }
    },3600000);
}

function detener(){
    clearInterval(regresionSegundos);
    clearInterval(regresionMinutos);
    clearInterval(regresionHora);
}

function audio(url){
    const audio = new Audio(url);
    audio.play();
}



