$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            var name = $("input#name").val().trim();
            var street = $("input#street").val().trim();
            var streetNumber = $("input#streetNumber").val().trim();
            var city = $("input#city").val().trim();
            var state = $("input#state").val().trim();
            var zip = $("input#zip").val().trim();
            var email = $("input#email").val().trim();
            var phone = $("input#phone").val().trim();
            var service = $("select#service").val();
            var message = $("textarea#message").val().trim();

            function showError(msg) {
                $('#success').html("<div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>" + msg + "</strong></div>");
            }
            function isValidUSAPhone(p) {
                var digits = p.replace(/\D/g, '');
                return (digits.length === 11 && digits.charAt(0) === '1') || (digits.length === 10);
            }

            if (!street || !streetNumber || !city || !state || !zip) {
                showError("Please complete the full address: Street, Number, City, State, and ZIP Code.");
                return;
            }
            if (!/^\d{5}(-\d{4})?$/.test(zip)) {
                showError("Please enter a valid US ZIP Code (e.g., 12345 or 12345-6789).");
                return;
            }
            if (!isValidUSAPhone(phone)) {
                showError("Please enter a valid USA phone number (+1 and 10 digits).");
                return;
            }
            if (!service) {
                showError("Please select a service.");
                return;
            }

            var address = streetNumber + " " + street + ", " + city + ", " + state + " " + zip;
            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : '') + "/api/contact",
                type: "POST",
                data: {
                    name: name,
                    address: address,
                    email: email,
                    phone: phone,
                    service: service,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Thank you for contacting us! We will get back to you within 5-10 minutes.</strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
