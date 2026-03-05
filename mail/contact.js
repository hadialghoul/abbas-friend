$(function () {
    // Custom service dropdown
    $("#serviceDisplay").on("click", function (e) {
        e.stopPropagation();
        $("#serviceOptions").toggleClass("show");
    });
    $(document).on("click", function () { $("#serviceOptions").removeClass("show"); });
    $("#contactForm .custom-service-option").on("click", function (e) {
        e.stopPropagation();
        var val = $(this).data("value");
        var text = $(this).text();
        $("#serviceDisplay").text(text);
        $("#service").val(val);
        $("#serviceOptions").removeClass("show");
        $("#contactForm .custom-service-option").removeClass("selected");
        $(this).addClass("selected");
    });
    $("#contactForm").on("reset", function () {
        $("#serviceDisplay").text("Choose a Service");
        $("#service").val("");
        $("#contactForm .custom-service-option").removeClass("selected");
    });

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            var name = $("input#name").val().trim();
            var street = $("input#street").val().trim();
            var city = $("input#city").val().trim();
            var state = $("input#state").val().trim();
            var zip = $("input#zip").val().trim();
            var email = $("input#email").val().trim();
            var phone = $("input#phone").val().trim();
            var service = $("select#service").val();
            var message = $("textarea#message").val().trim();

            var US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];
            function showError(msg) {
                $('#success').html("<div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>" + msg + "</strong></div>");
            }
            function isValidUSAPhone(p) {
                var digits = p.replace(/\D/g, '');
                if (digits.length !== 10 && digits.length !== 11) return false;
                if (digits.length === 11 && digits.charAt(0) !== '1') return false;
                if (p.trim().startsWith('+')) {
                    var afterPlus = p.trim().substring(1).replace(/\s/g, '');
                    var firstDigit = afterPlus.match(/\d/);
                    if (firstDigit && firstDigit[0] !== '1') return false;
                }
                return true;
            }
            function isValidUSState(s) {
                return s && US_STATES.indexOf(s.toUpperCase().trim()) !== -1;
            }

            if (!street || !city || !state || !zip) {
                showError("Please complete the full address: Street, City, State, and ZIP Code.");
                return;
            }
            if (!/^\d{5}(-\d{4})?$/.test(zip)) {
                showError("Please enter a valid US ZIP Code (e.g., 12345 or 12345-6789).");
                return;
            }
            if (!isValidUSState(state)) {
                showError("Please enter a valid 2-letter US State code (e.g., CA, MA, NY).");
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

            var address = street + ", " + city + ", " + state + " " + zip;
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
