(function($) {

    $(document).ready(function() {
        NEWSBLUR.paypal_return = new NEWSBLUR.PaypalReturn();
    });

    NEWSBLUR.PaypalReturn = function() {
        this.retries = 0;
        this.detect_premium();
    };

    NEWSBLUR.PaypalReturn.prototype = {

        detect_premium: function() {
            $.get('/profile/is_premium', {'retries': this.retries}, _.bind(function(resp) {
                if (!resp.is_premium) {
                    this.retries += 1;
                    _.delay(_.bind(function() {
                        this.detect_premium();
                    }, this), 3000);
                } else if (resp.is_premium) {
                    window.location.href = '/';
                }
            }, this));
        }

    };
    
})(jQuery);