/**
 * Created by Team voltmx.
 * Copyright (c) 2018 voltmx Inc. All rights reserved.
 */
define(function () {
    /**
     * @member of  voltmxLogger.js
     * @function voltmxLogger
     * @param method - The function to be called to log the given message. 
     * When no parameter is passed, voltmx.print is called by default.
     * @returns an instance of voltmxLogger class.
     * @description - This is the constructor for voltmxLogger. 
     * This method initializes the instance created.
     **/
    var voltmxLogger = function () {

        this.printMethod = voltmx.print;
        this.reuseableComponentName = arguments[0]|| "appContext";

        var loggerGenerator = function (){

            this.trace = function(message, event)
            {
                var caller;
                try
                {
                    caller = arguments.callee.caller.name;
                }
                catch(err)
                {
                    caller = "Global";
                }
                this.logMethod(caller,"TRACE",message,event);
            };

            this.debug = function(message, event)
            {
                var caller;
                try
                {
                    caller = arguments.callee.caller.name;
                }
                catch(err)
                {
                    caller = "Global";
                }
                this.logMethod(caller,"DEBUG",message,event);
            };

            this.info = function(message, event)
            {
                var caller;
                try
                {
                    caller = arguments.callee.caller.name;
                }
                catch(err)
                {
                    caller = "Global";
                }
                this.logMethod(caller,"INFO",message,event);
            };

            this.warn = function(message, event)
            {
                var caller;
                try
                {
                    caller = arguments.callee.caller.name;
                }
                catch(err)
                {
                    caller = "Global";
                }
                this.logMethod(caller,"WARN",message,event);
            };

            this.error = function(message, event)
            {
                var caller;
                try
                {
                    caller = arguments.callee.caller.name;
                }
                catch(err)
                {
                    caller = "Global";
                }
                this.logMethod(caller,"ERROR",message,event);
            };
        };

        this.setLogLevel = function(logLevel)
        {
            if(this.isValidLogLevel(logLevel)){
                if(typeof logLevel === "string"){
                    this.currentLogLevel = this.logLevels[logLevel];
                }
                else if(typeof logLevel === "number"){
                    this.currentLogLevel = logLevel;
                }

                var  logMethods = Object.keys(this.logLevels);

                for (var i = 0; i < logMethods.length; i++) {
                    var methodName = logMethods[i].toLowerCase();

                    this[methodName] = (i < this.currentLogLevel) ?
                        function(){} :
                        (new loggerGenerator())[methodName];
                }

                return true;
            }
            else {
                return false;
            }
        };
		
      	this.enableServerLogging = false;
      	this.logMethod = function(functionName, logLevel, message, eventType){
          	var logObj = {
                "component": this.reuseableComponentName || "",
              	"event" : this.supportedEventTypes[eventType] || this.supportedEventTypes[this.DEFAULT],
                "function": functionName || "",
                "timestamp": voltmxLogger.Utils.getDateTimeStamp() || "",
                "level": logLevel || "",
                "message": message || ""
            };
          	if(this.enableServerLogging === true) {
              	if((KNYMetricsService !== undefined) && (KNYMetricsService !== null) && (KNYMetricsService !== "")){
                  	if(typeof KNYMetricsService.sendEvent === "function"){
                  		/** sendEvent params - eventType, subEventType, formID, widgetID, flowTag, metaInfo{JSON} **/
                    	KNYMetricsService.sendEvent("Custom", "voltmxLogger", "MarketPlaceComponent", logObj.component, null, logObj); 	
                    }
                }
            }
          	this.printMethod(JSON.stringify(logObj,null,'\t'));
        };
      	
        this.setLogLevel("TRACE");

    };

    /**
     * @member of  voltmxLogger
     * @property logLevels - This enum holds the 6 levels of logging and their order.
     **/
    voltmxLogger.prototype.logLevels = { 
        "TRACE" : 0, 
        "DEBUG" : 1, 
        "INFO" : 2, 
        "WARN" : 3,
        "ERROR" : 4, 
        "SILENT" : 5
    };
 
    /**
     * @member of  voltmxLogger
     * @property eventTypes - This array holds 8 types of events.
     **/
    voltmxLogger.prototype.supportedEventTypes = [
		"DEFAULT",
        "FUNCTION_ENTRY",
      	"FUNCTION_EXIT",
      	"SUCCESS_CALLBACK",
      	"ERROR_CALLBACK",
      	"EXCEPTION",
		"SERVICE_CALL",
		"DATA_STORE"
    ];
  	
  	/** voltmxLogger EventTypes**/
	voltmxLogger.prototype.DEFAULT = 0;
  	voltmxLogger.prototype.FUNCTION_ENTRY = 1;
  	voltmxLogger.prototype.FUNCTION_EXIT = 2;
  	voltmxLogger.prototype.SUCCESS_CALLBACK = 3;
  	voltmxLogger.prototype.ERROR_CALLBACK = 4;
  	voltmxLogger.prototype.EXCEPTION = 5;
	voltmxLogger.prototype.SERVICE_CALL = 6;
	voltmxLogger.prototype.DATA_STORE = 7;

    /**
     * @member of  voltmxLogger
     * @property defaultLogLevel - This property holds the default logLevel
     * It is intialised to "TRACE".
     **/
    voltmxLogger.prototype.defaultLogLevel = voltmxLogger.prototype.logLevels["TRACE"];

    /**
     * @member of  voltmxLogger
     * @function isValidLogLevel
     * @param logLevel - (string or number)
     * @description - This method validates the logLevel parameter with the enum logLevels
     * @return boolean
     **/
    voltmxLogger.prototype.isValidLogLevel = function(logLevel){
        if((logLevel !== undefined) && (logLevel !== null) && (logLevel !== "")){
            if(typeof logLevel === "string"){		
                if (logLevel.toUpperCase() in this.logLevels){
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (typeof logLevel === "number"){
                for(var logLevelKey in this.logLevels){
                    if(logLevel === this.logLevels.logLevelKey){
                        return true;
                    }
                }
                return false;
            }
            else {
                return false;
            } 	
        }
    };


    /**
     * @member of  voltmxLogger
     * @function getLogLevel
     * @param none
     * @description - This method returns the current log level of the instance
     * @return type number
     **/
    voltmxLogger.prototype.getLogLevel = function(){
        return this.currentLogLevel;
    };

    /**
     * @member of  voltmxLogger
     * @function setPrintMethod
     * @param method: type function - The method to print the log/message.
     * The default value is voltmx.print
     * @description - This method sets the current log method to 'method'
     * @return none
     **/
    voltmxLogger.prototype.setPrintMethod = function(method){
        if((method !== undefined) && (method !== null) && (method !== "")){
            if(typeof method === "function"){
                this.printMethod = method;
            }
        }
    };

    voltmxLogger.Utils = {};

    /**
     * @member of  voltmxLogger
     * @function getDateTimeStamp
     * @param none
     * @description - It returns the current date and time stamp in "DD/MM/YY HH:MM AM/PM" format
     * @return type string
     **/
    voltmxLogger.Utils.getDateTimeStamp = function(){
        var dateTimeStamp = "";

        var currentDateObj = new Date();
        dateTimeStamp += currentDateObj.getDate() + "/" + (currentDateObj.getMonth()+1) + "/" + currentDateObj.getFullYear();
        dateTimeStamp += " ";
        var hours = currentDateObj.getHours();
        if(hours > 12){
            dateTimeStamp += (hours - 12) + ":" + currentDateObj.getMinutes() + " PM";
        }
        else {
            dateTimeStamp += hours + ":" + currentDateObj.getMinutes() + " AM";
        }

        return dateTimeStamp;
    };
    return voltmxLogger;
});
