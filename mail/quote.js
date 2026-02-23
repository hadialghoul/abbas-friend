$(function () {
    $("#quoteForm").on("submit", function (e) {
        e.preventDefault();

        var name = $("#quoteName").val();
        var address = $("#quoteAddress").val();
        var email = $("#quoteEmail").val();
        var phone = $("#quotePhone").val();
        var message = $("#quoteMessage").val();

        if (!name || !address || !email || !phone || !message) {
            $("#quoteSuccess").html('<div class="alert alert-danger">Please fill in all fields.</div>');
            return;
        }

        var $btn = $("#quoteSubmitBtn");
        $btn.prop("disabled", true);

        $.ajax({
            url: "http://localhost:3000/api/quote",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ name: name, address: address, email: email, phone: phone, message: message }),
            success: function () {
                $("#quoteSuccess").html('<div class="alert alert-success">Thank you for contacting us! We will get back to you within 5-10 minutes.</div>');
                $("#quoteForm")[0].reset();
            },
            error: function () {
                $("#quoteSuccess").html('<div class="alert alert-danger">Sorry, we could not send your message. Please try again later.</div>');
            },
            complete: function () {
                setTimeout(function () {
                    $btn.prop("disabled", false);
                }, 1000);
            }
        });
    });
});
