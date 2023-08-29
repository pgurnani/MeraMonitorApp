define(function() {
    return {
        analyticsHost: "https://sampleapps.hclvoltmx.net:443/services/data/v1/analytics/objects/log",
        constructBody: function() {
            try {
                var date = new Date();
                var deviceInfo = this.getDeviceOS();
                var body = {
                    "deviceModel": deviceInfo.model,
                    "Locale": kony.i18n.getCurrentDeviceLocale().language,
                    "Platform": deviceInfo.name,
                    "PlatformVersion": deviceInfo.version,
                    "appId": appConfig.appId,
                    "serviceUrl": appConfig.serviceUrl,
                    "itemGuid": "hbc5ec59c322467e93c0a9e1169654f1",
                    "assetName": "com.konymp.horizontalbar",
                    "assetVersion": "1.0.0",
                    "releaseMode": !appConfig.isDebug,
                    "konySdkVersion": kony.sdk.version,
                    "date": date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear(),
                    "endpointId": this.generateUniqueId(),
                    "deviceHeight": deviceInfo.deviceHeight,
                    "deviceWidth": deviceInfo.deviceWidth,
                    "kuid":"uf62c372b307485da3e954f7853b1dd9",
                };
                return body;
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },

        notifyAnalytics: function() {
            try {
                if (this.checkInternetConnectivity() && this.isItFirstTime()) {
                    var httpclient = new kony.net.HttpRequest();
                    httpclient.open(constants.HTTP_METHOD_POST, this.analyticsHost);
                    httpclient.setRequestHeader("Content-Type", "application/json");
                    httpclient.send(JSON.stringify(this.constructBody()));
                }
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },
        getDeviceOS: function() {
            try {
                return kony.os.deviceInfo();
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }

        },
        generateUniqueId: function() {
            try {
                return kony.crypto.createHMacHash("SHA512", this.getDeviceOS().deviceid, "KonyAnalytics");
            } catch (exception) {
                kony.print(JSON.stringify(exception));
            }
        },
        isItFirstTime: function() {
            var bodyDetails = this.constructBody();
            var assetVersion = kony.store.getItem(bodyDetails.assetName + "Version");
            if (kony.sdk.isNullOrUndefined(assetVersion) || assetVersion != bodyDetails.assetVersion) {
                kony.store.setItem(bodyDetails.assetName + "Version", bodyDetails.assetVersion);
                return true;
            } else {
                return false;
            }
        },
        checkInternetConnectivity: function() {
            return kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY);
        }
    };
});
