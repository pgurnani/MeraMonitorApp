define({ 
//    AS_Button_bf46e9a3f20145c3a96572d16e9aeab6: function AS_Button_bf46e9a3f20145c3a96572d16e9aeab6(eventobject) {
//         var self = this;
//       var recipient = "testMonitor1324@gmail.com"
//       var subject = 'Hello'
//       const body = 'This is the body of the email.'

//       const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

//       window.location.href = mailtoLink;
//    }
   /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for btnSignin **/
    AS_Button_ae93db6e840e4238a12806a39332b6c7: function AS_Button_ae93db6e840e4238a12806a39332b6c7(eventobject) {
        var self = this;

        function INVOKE_IDENTITY_SERVICE_c8c08baaa34d47219c4dcaa24dcd16d2_Callback(status, Login) {}
        voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (Login_inputparam == undefined) {
            var Login_inputparam = {};
        }
        Login_inputparam["serviceID"] = "MeraAuthentication$Login";
        Login_inputparam["email"] = self.view.txtUserName.text;
        Login_inputparam["password"] = self.view.txtPassword.text;
        var Login_httpheaders = {};
        Login_inputparam["httpheaders"] = Login_httpheaders;
        var Login_httpconfigs = {};
        Login_inputparam["httpconfig"] = Login_httpconfigs;
        MeraAuthentication$Login = mfintegrationsecureinvokerasync(Login_inputparam, "MeraAuthentication", "Login", INVOKE_IDENTITY_SERVICE_c8c08baaa34d47219c4dcaa24dcd16d2_Callback);
      	console.log(MeraAuthentication$Login)
    },
    /** preShow defined for frmUserLogin **/
    AS_Form_jedf605021524276bec1fcd09cce5e9e: function AS_Form_jedf605021524276bec1fcd09cce5e9e(eventobject) {
        var self = this;
        this.view.txtUserName.text = "";
        this.view.txtPassword.text = "";
    },
    /** onDone defined for txtPassword **/
    AS_TextField_e0310a169d1447fcbbb10a18da80705d: function AS_TextField_e0310a169d1447fcbbb10a18da80705d(eventobject, changedtext) {
        var self = this;

        function INVOKE_SERVICE_g97dd17f31754be6a9d468cea2c59253_Success(response) {
            voltmx.application.dismissLoadingScreen();
            var ntf = new voltmx.mvc.Navigation("undefined");
            ntf.navigate();
        }

        function INVOKE_SERVICE_g97dd17f31754be6a9d468cea2c59253_Failure(error) {
            voltmx.application.dismissLoadingScreen();

            function SHOW_ALERT_ifda69d401714f998f57b56d5fc52abc_Callback() {
                SHOW_ALERT_ifda69d401714f998f57b56d5fc52abc_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "message": "Login is failed! Please try again Later.",
                "alertHandler": SHOW_ALERT_ifda69d401714f998f57b56d5fc52abc_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }

        function SHOW_ALERT_ifda69d401714f998f57b56d5fc52abc_True() {}
        voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        if (login_inputparam == undefined) {
            var login_inputparam = {};
        }
        login_inputparam["serviceID"] = "UserAuthentication$login";
        login_inputparam["operation"] = "login";
        login_inputparam["userid"] = self.view.txtUserName.text;
        login_inputparam["password"] = self.view.txtPassword.text;
        UserAuthentication$login = mfidentityserviceinvoker("UserAuthentication", login_inputparam, INVOKE_SERVICE_g97dd17f31754be6a9d468cea2c59253_Success, INVOKE_SERVICE_g97dd17f31754be6a9d468cea2c59253_Failure);
    }
 });