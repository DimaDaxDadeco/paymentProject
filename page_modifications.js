$(document).ready(function() {
    if (typeof SPG_FORM_ADAPTIVE === 'undefined' || !SPG_FORM_ADAPTIVE) {
        return;
    }
    $(".img-responsive").css("width", "300px");
    $(".img-responsive").css("margin-top", "18px");
    $(".img-responsive").css("margin-bottom", "-10px");
    var logo = $(".footer .cert-logo");
    logo.removeClass("visible-lg-block").removeClass("visible-md-block");
    logo.html(' \
					<div class="cert-logo-icon" id="mastercard-mono"></div> \
					<div class="cert-logo-icon" id="mastercard-securecode-mono"></div> \
					<div class="cert-logo-icon" id="maestro-mono"></div> \
          <div class="cert-logo-icon" id="visa-mono"></div> \
          <div class="cert-logo-icon" id="mir-mono"></div> \
          <div class="cert-logo-icon" id="pcidss-mono"></div> \
					<div class="cert-logo-icon" id="thawte-mono"></div> \
					');

    var cvcField = $('#PayForm_cvc2');
    cvcField.after('<div id="toggle-icon" class="eye-icon"></div>');

    var toggleIcon = $('.textinput #toggle-icon');
    var cvcFieldType = "number";
    try {
        if (window.matchMedia('(min-width: 992px)').matches) {
            cvcFieldType = "password";
        } else {
            cvcFieldType = "number";
            toggleIcon.removeClass("eye-icon").addClass("eye-blocked-icon");
        }
    } catch (error) {
        console.error(error);
    }

    cvcField.prop("type", cvcFieldType);
    cvcField.prop("pattern", "[0-9]*");
    cvcField.prop("inputmode", "numeric");

    toggleIcon.on('click',
        function(e) {
            var type = cvcField.prop("type");
            if (type === "password") {
                e.target.className = "eye-blocked-icon";
                cvcField.prop("type", "number");
            } else {
                e.target.className = "eye-icon";
                cvcField.prop("type", "password");
            }
        });

    var cardField = $('#PayForm_card');
    cardField.prop("inputmode", "numeric");

    var monthField = $('#PayForm_exp_month');
    monthField.prop("type", "number");
    monthField.prop("pattern", "[0-9]*");
    monthField.prop("inputmode", "numeric");

    var yearField = $('#PayForm_exp_year');
    yearField.prop("type", "number");
    yearField.prop("pattern", "[0-9]*");
    yearField.prop("inputmode", "numeric");

    $(".logo.col-lg-5.col-md-5.col-sm-12.col-sx-12 a").attr("href", "https://kontur.ru/diadoc");
    $(".logo.col-lg-5.col-md-5.col-sm-12.col-sx-12 a").attr("target", "_blank");
    $(".cert-logo.col-lg-4.col-md-4.text-left.col-lg-offset-3.col-md-offset-3").css("width", "100%");
    $(".cert-logo.col-lg-4.col-md-4.text-left.col-lg-offset-3.col-md-offset-3").css("margin-left", "0%");
    $(".cert-logo.col-lg-4.col-md-4.text-left.col-lg-offset-3.col-md-offset-3").css("margin-top", "40px");
    $(".copyright.col-lg-5.col-md-5.col-sm-12.col-sx-12").remove();
    var summ = $(".summ").html();
    $(".btn.btn-block.btn-lg").val(`Оплатить ${summ} Р`);
    $(".logo.col-lg-5.col-md-5.col-sm-12.col-sx-12").css("width", "100%");
    $(".info.col-lg-4.col-md-4.visible-lg-block.visible-md-block.text-left.col-lg-offset-3.col-md-offset-3").remove();
    $(".pay-methods").children(".container").addClass("pay-form-frame");
    $(".visible-xs-inline").remove();
    //var invoiceInfo = "Оплата счёта \"Контур.Фокус\"/*/ca9b3ad1-74d4-44fa-9f4e-8d4344c52204/*/89784521547".split("/*/");
    var invoiceInfo = $(".invoice-info").html().split("/*/");
    var [serviceName, billId, billNumber] = invoiceInfo;
    $(".invoice-info").remove();
    $(".invoice-summ").remove();
    $(".invoice-from").remove();

    $(".col-lg-12.col-md-12.col-sm-12.col-sx-12.text-left.text-center").remove();
    var infoDiv =
        '<div class="col-md-12" style="text-align: center; margin-bottom: 25px; margin-top: 20px; display: flex; flex-direction: column;"> ' +
            '<span class="payment-info">' +
            serviceName.substring(14, serviceName.length - 1) +
            ' на сумму ' +
            '<span class="summ">' +
            summ +
            '</span> Р' +
            '</span>' +
            '</div>';

    $(".help-exp_year.help_text.input-help").toggleClass("help-exp_year");
    $(".row.pay-choice-head").html(infoDiv);
    $(".invoice-line").remove();
    $(".btn").css("width", "245px");
    $(".btn").css("margin-top", "20px");
    $(".input-exp_year").attr("placeholder", "");
    $(".input-cvc2").attr("placeholder", "");
    $(".input-card_holder").attr("placeholder", "");
    $(".input-exp_month").attr("placeholder", "");
    $(".input-card-unmasked").attr("placeholder", "");
    $(".input-exp_year").css("max-width", "158.4px");
    $(".input-cvc2").css("max-width", "112.8px");
    $(".input-card_holder").css("max-width", "330px");
    $(".input-exp_month").css("max-width", "158.4px");
    $(".input-card-unmasked").css("max-width", "330px");
    $(".card_block_submit").toggleClass("col-md-5");
    $(".card_block_submit").toggleClass("col-md-offset-4");
    $(".card_block_submit").toggleClass("card_block_submit");
    //$(".help-exp_year").html("Год");
    //$(".help-exp_month").html("Месяц");
    $(".cert-logo.col-lg-4.col-md-4.text-left.col-lg-offset-3.col-md-offset-3").remove();
    $(".footer").css("margin", "0 auto");
    $(".footer").css("width", "700px");
    $(".footer .container").css("display", "flex");
    $(".footer .container").css("width", "700px");
    $(".footer .container").css("margin-top", "13px");
    $(".footer .container .row").css("width", "700px");
    var bankLink =
        "<div class='bank_link'>© <a class='link' href='http://rficb.ru/'>RFI Bank JSC</a> — банк для онлайн предпринимателей</div>";
    var helpLink =
        "<div class='help_link'><a class='link' href='http://help.rficb.ru/'>Помощь</a></div>";

    $(".footer .container .row").html(bankLink + helpLink);
    $(".col-md-6.col-xs-4.textinput.validating").css("max-width", "158.4px");
    $("#PayForm_exp_year").css("margin-left", "10px");
    $("#PayForm_exp_year").css("max-width", "158.4px");
    $("#PayForm_cvc2").css("max-width", "95px");

    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("max-width", "100px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("margin-left", "20px");
    $(".text-center .col-md-12.col-xs-12.textinput.validating").css("margin-right", "10000px");
    $(".col-md-6.col-xs-12").css("width", "400px");
    $(".col-md-12.col-xs-12.textinput").css("margin-right", "0px");
    //$(".input-help.help-cvc2").html("CVC");

    $("#toggle-icon").remove();

    $(".input-help.help-exp_year").toggleClass("help_text");
    $(".input-help.help-exp_month").toggleClass("help_text");
    $(".input-help.help-card").toggleClass("help_text");
    $(".input-help.help-card_holder").toggleClass("help_text");
    $(".input-help.help-cvc2").toggleClass("help_text");

    $(".col-md-6.col-xs-4.textinput").css("margin-left", "0px");
    $(".col-md-6.col-xs-4.textinput").css("width", "158.4px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("margin-left", "20px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("width", "95px");
    $(".help-exp_year").css("margin-left", "20px");
    $(".col-md-10.col-md-offset-2.card_block").css("margin-left", "45px");
});