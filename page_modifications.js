$(document).ready(function() {
    if (typeof SPG_FORM_ADAPTIVE === 'undefined' || !SPG_FORM_ADAPTIVE) {
        return;
    }

    function upBlock(node, content) {
        var prev = node.prev();

        node.insertBefore(prev);
        node.text(content);
    }

    function modifyCardCode() {
        var hiddenCardCode = $("#PayForm_cvc2_em_");
        var cardCodeText = $('.help-cvc2');

        $(".back_side").append($(".textinput.cart_cvc2"));
        cardCodeText.text('Три цифры с оборотной стороны');
        cardCodeText.append(hiddenCardCode);
        $(".cart_cvc2").prepend("<span class='help_text'>CVC</span>");
    }

    function modifySendBtn() {
        var sendBtn = $("#send_button").parent();

        sendBtn.css({
            paddingTop: "60px",
            textAlign: "center"
        });
        sendBtn.prepend("<span>Без комиссии</span>");
    }

    function additionalInfo() {
        var sendBtn = $("#send_button").parent();
        var text = "<span>Данные защищены по международному стандарту PCI DSS</span>"
        var security = "<div class='security'></div>";
        var content = "<div class=additional-info>" + text + security + "</div>";

        sendBtn.append(content);
    }

    function removeAddClass(removedClass, addedClass) {
        var el = $('.' + removedClass);

        el.removeClass(removedClass);

        if (addedClass) {
            el.addClass(addedClass);
        }
    }

    function validation(className) {
        return $("<div class='validation-field " + className + "'></div>");
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
    $(".btn.btn-block.btn-lg").val(`Оплатить ${summ} ₽`);
    $(".logo.col-lg-5.col-md-5.col-sm-12.col-sx-12").css("width", "100%");
    $(".info.col-lg-4.col-md-4.visible-lg-block.visible-md-block.text-left.col-lg-offset-3.col-md-offset-3").remove();
    $(".pay-methods").children(".container").addClass("pay-form-frame");
    $(".visible-xs-inline").remove();
    //var invoiceInfo = "Оплата счёта \"Контур.Фокус\"/*/ca9b3ad1-74d4-44fa-9f4e-8d4344c52204/*/89784521547".split("/*/");
    var invoiceInfo = $(".invoice-info").html();

    $(".invoice-info").remove();
    $(".invoice-summ").remove();
    $(".invoice-from").remove();

    $(".col-lg-12.col-md-12.col-sm-12.col-sx-12.text-left.text-center").remove();
    var infoDiv =
        '<div class="col-md-12" style="text-align: center; margin-bottom: 25px; margin-top: 20px; display: flex; flex-direction: column;"> ' +
            '<span class="payment-info">' +
            invoiceInfo.substring(14, invoiceInfo.length - 1) +
            ' на сумму ' +
            '<span class="summ">' +
            summ +
            '</span> &#8381;' +
            '</span>' +
            '</div>';

    $(".help-exp_year.help_text.input-help").toggleClass("help-exp_year");
    $(".row.pay-choice-head").html(infoDiv);
    $(".invoice-line").remove();
    $(".btn").css({
        width: "auto",
        marginTop: "17px",
    });
    $(".input-exp_year").attr("placeholder", "");
    $(".input-cvc2").attr("placeholder", "");
    $(".input-card_holder").attr("placeholder", "");
    $(".input-exp_month").attr("placeholder", "");
    $(".input-card-unmasked").attr("placeholder", "");
    $(".input-exp_year").css("max-width", "66px");
    $(".input-cvc2").css("max-width", "112.8px");
    $(".input-exp_month").css("max-width", "66px");
    $(".card_block_submit").toggleClass("col-md-5");
    $(".card_block_submit").toggleClass("col-md-offset-4");
    $(".card_block_submit").toggleClass("card_block_submit");
    //$(".help-exp_year").html("Год");
    //$(".help-exp_month").html("Месяц");
    $(".cert-logo.col-lg-4.col-md-4.text-left.col-lg-offset-3.col-md-offset-3").remove();
    var bankLink =
        "<div class='bank_link'><a class='link' href='http://rficb.ru/'>RFI Bank JSC</a> — банк для онлайн предпринимателей</div>";
    var contacts =
        "<div class='contacts'><span>8 800 500-70-54</span><span class='dot'>&bull;</span><a class='link grey' href='mailto:office@rfibank.ru'>office@rfibank.ru</a></div>";

    $(".footer .container .row").html(bankLink + contacts);
    $(".col-md-6.col-xs-4.textinput.validating").css("max-width", "66px");
    $("#PayForm_exp_year").css("max-width", "66px");
    $("#PayForm_cvc2").css("max-width", "80px");

    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("max-width", "100px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("margin-left", "20px");
    $(".text-center .col-md-12.col-xs-12.textinput.validating").css("margin-right", "10000px");
    $(".col-md-6.col-xs-12").css({
        width: "582px",
        background: "#EBEBEB",
        border: "1px solid #E7E4E4",
        boxShadow: "6px 6px 15px 0 rgba(0, 0, 0, 0.07)",
        borderRadius: "18px",
        padding: "40px"
    });
    $(".col-md-6.col-xs-12").addClass('card-container')
    $(".col-md-6.col-xs-12").prepend("<div class='card-name'></div>")
    $(".card-name").append("<span>Бизнес-карта</span><div class='card-logo'></div>");
    $(".col-md-12.col-xs-12.textinput").css({
        marginRight: "0px",
        paddingTop: "25px"
    });
    $(".text-center .col-md-12.col-xs-12.textinput").css({
        paddingTop: "18px"
    })
    //$(".input-help.help-cvc2").html("CVC");

    $("#toggle-icon").remove();

    $(".input-help.help-card").toggleClass("help_text");
    $(".input-help.help-card_holder").toggleClass("help_text");
    $(".input-help.help-cvc2").toggleClass("help_text");

    $(".col-md-6.col-xs-4.textinput").css("margin-left", "0px");
    $(".col-md-6.col-xs-4.textinput").css("width", "66px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("margin-left", "20px");
    $(".col-md-6.col-xs-4.textinput.cart_cvc2").css("width", "95px");
    $(".help-exp_year").css("margin-left", "20px");
    $(".col-md-10.col-md-offset-2.card_block").css("margin-left", "45px");

    upBlock($(".help-card"), "Номер карты");
    upBlock($(".help-card_holder"), "Владелец");
    $(".help-card_holder")
        .parent()
        .wrapInner("<div class='col-md-7 col-xs-7 textinput validating'></div>");
    var cardHolderWrapper = $(".help-card_holder").parent();
    var monthFieldWrapper = monthField.parent();
    var yearFieldWrapper = yearField.parent();
    monthFieldWrapper.insertAfter(cardHolderWrapper);
    yearFieldWrapper.insertAfter(monthFieldWrapper);
    $(".help-exp_year").remove();
    $(".help-exp_month").remove();
    var dateWrapper = $(".col-md-6.col-xs-4.textinput").not(".cart_cvc2");
    dateWrapper.wrapAll("<div class='col-md-5 col-xs-5 textinput'></div>");
    dateWrapper.parent().prepend("<div class='input-help help_text help_date'>Срок действия</div");
    dateWrapper.wrapAll("<div class='date'></div>");
    $("<div class='input-lg delimiter'> / </div>").insertAfter(monthFieldWrapper);

    $(".card_block").prepend("<div class='back_side'><div class='band'></div></div>");
    modifyCardCode();
    modifySendBtn();
    additionalInfo();
    removeAddClass('help-card');
    validation('help-card').insertAfter(cardField);
    removeAddClass('help-card_holder');
    validation('help-exp_month').insertAfter($('#PayForm_exp_month'));
    validation('help-exp_year').insertAfter($('#PayForm_exp_year'));
    removeAddClass('help-cvc2', 'cvc2');
    validation('help-cvc2').insertAfter($('#PayForm_cvc2'));
});