$(function () {
    function showError(msg) {
        $("#quoteSuccess").html('<div class="alert alert-danger">' + msg + '</div>');
    }

    var US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC"];

    function isValidUSAPhone(phone) {
        var digits = phone.replace(/\D/g, '');
        if (digits.length !== 10 && digits.length !== 11) return false;
        if (digits.length === 11 && digits.charAt(0) !== '1') return false;
        if (phone.trim().startsWith('+')) {
            var afterPlus = phone.trim().substring(1).replace(/\s/g, '');
            var firstDigit = afterPlus.match(/\d/);
            if (firstDigit && firstDigit[0] !== '1') return false;
        }
        return true;
    }

    function isValidUSState(state) {
        return state && US_STATES.indexOf(state.toUpperCase().trim()) !== -1;
    }

    $("#quoteForm").on("submit", function (e) {
        e.preventDefault();

        var name = $("#quoteName").val().trim();
        var street = $("#quoteStreet").val().trim();
        var city = $("#quoteCity").val().trim();
        var state = $("#quoteState").val().trim();
        var zip = $("#quoteZip").val().trim();
        var email = $("#quoteEmail").val().trim();
        var phone = $("#quotePhone").val().trim();
        var service = $("#quoteService").val();
        var message = $("#quoteMessage").val().trim();

        if (!name || !email || !message) {
            showError("Please fill in all required fields.");
            return;
        }

        if (!street || !city || !state || !zip) {
            showError("Please complete the full address: Street, City, State, and ZIP Code.");
            return;
        }

        var zipRegex = /^\d{5}(-\d{4})?$/;
        if (!zipRegex.test(zip)) {
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
        var $btn = $("#quoteSubmitBtn");
        $btn.prop("disabled", true);

        $.ajax({
            url: (typeof API_BASE_URL !== 'undefined' ? API_BASE_URL : '') + "/api/quote",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ name: name, address: address, email: email, phone: phone, service: service, message: message }),
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
