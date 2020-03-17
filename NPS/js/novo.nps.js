function sendPass() {

    var nemail = $(".ipt-email").val();
    var nmsg = $(".text-mensagem").val();
    var nradio = $(".nota-selecionada").attr("rel");

    if ((nemail == "") || (validateEmail(nemail) == false)) {

        alerta("Por favor, coloque um email válido.");

    } else if (nradio == undefined) {

        alerta("Por favor, atribua uma nota o quanto você indicaria nossa empresa para um amigo.");

    } else {

        var date = new Date;
        var dataHora = date.toLocaleString();
        var ndataHora = dataHora.split(" ");
        var datos = {};

        datos.email = nemail;
        datos.resposta = nradio;
        datos.data = ndataHora[0];
        datos.observacoes = nmsg;

        $.ajax({
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "x-vtex-api-appKey": "vtexappkey-montecarlojoais-XCNQYA",
                "x-vtex-api-appToken": "GUSBEZOXLBSTQFKJVEKVBLRQRRVFCCFHTHBIMSNHSLLGYRZQCDJEUULVDBKMDIUIVKZJEBWCQCCPZKRZRFDYSAMZWFFKIAEKQDKNRQMAHHOSRVWSKKUYEVPUYANYWLTP",
                "Content-Type": "application/json"
            },
            data: JSON.stringify(datos),
            type: "POST",
            url: "/api/dataentities/NP/documents",
            beforeSend: function(xhr) {
                $(".overlay-alert").css("display", "inline")
            },
            success: function(data) {
                console.log(data), alerta("Obrigado por responder nossa pesquisa."), $(".alertClose").click((function(e) {
                    location.href = "https://www.montecarlo.com.br/"
                }))
            },
            error: function(data) {
                alerta("Ops! Ocorreu algum erro, por favor tente novamente.")
            }
        })
    }
}

function validateEmail(email) {
    var re;
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function alerta(texto) {
    $(".overlay-alert,#modalAlert").fadeIn(500), $(".alertMessage").text(texto), $(".alertClose").click((function() {
        $(".overlay-alert,#modalAlert").fadeOut(500)
    }))
}
$(document).ready((function() {
    $(".nps-button-enviar").click((function() {
        sendPass()
    })), $(".nps-notas").click((function() {
        $(".nps-notas").removeClass("nota-selecionada"), $(this).addClass("nota-selecionada")
    }))
}));