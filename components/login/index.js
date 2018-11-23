'use strict';

app.login = kendo.observable({
    onShow: function () {
        setupaudio();
    },
    afterShow: function() {}
});
app.localization.registerView('login');

// START_CUSTOM_CODE_login
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_login