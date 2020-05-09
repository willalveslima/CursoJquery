var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    $("#tamanho-frase").text($(".frase").text().split(" ").length);
}
/*
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras);
*/
function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        $("#contador-palavras").text(conteudo.split(/\S+/).length - 1);
        $('#contador-caracteres').text(conteudo.replace(/\s+/g, '').length);
        /*
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        var conteudo = campo.val();
        var conteudoSemEspaco = conteudo.replace(/\s+/g,'');
        var qtdCaracteres = conteudoSemEspaco.length;
        $('#contador-caracteres').text(qtdCaracteres);
        */
    });
}

function inicializaCronometro() {
    campo.one("focus", function () {
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

//$("#botao-reiniciar").click(reiniciaJogo);

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    campo.toggleClass("campo-desativado");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}
