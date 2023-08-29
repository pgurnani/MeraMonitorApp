/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
/**
 * @controller: Horizontal Bar Chart UDW
 * @author: Sumeet Bartha and Tejaswini Tubati
 * @category: Reusable Component
 * @componentVersion: 1.0
 * @description: Generates horizontal bar chart by taking the data as input
 */
define(function() {
  	var konyLoggerModule = require('com/konymp/horizontalbar/konyLogger');
  	konymp = {};
  	konymp.logger = new konyLoggerModule("Horizontal Bar Chart Component");
  	return {
    	/**
	 	 * @function constructor
     	 * @private
	 	 * @params {Object} baseConfig, layoutConfig, pspConfig
	 	 */
    	constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"horizontalbar"+"/analytics");
            analytics.notifyAnalytics();
      		konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
          	this._chartProperties = {
              	_titleFontSize: "12",
              	_titleFontColor: "#000000",
              	_lowValue: "0",
              	_highValue: "40",
              	_bgColor: "#FFFFFF",
              	_enableChartAnimation: true,
              	_enableGrid: true,
              	_enableGridAnimation: true,
              	_xAxisTitle: "",
              	_yAxisTitle: "",
              	_enableStaticPreview: true
            };
          	this._chartTitle = "";
          	this._chartData = [];
            chart_hBarDs_defined_global = function(state){
              if(state ==='ready'){
              this.showGridChart();
              }
            }.bind(this);	
      		konymp.logger.trace("----------Exiting constructor---------", konymp.logger.FUNCTION_EXIT);
    	},
    	/**
	 	 * @function initGetterSetters
	 	 * @private
     	 * @description: Logic for getters/setters of custom properties
	 	 */
    	initGettersSetters: function() {
          	this.hexCodeFormat = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
      		konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
      		defineSetter(this, "chartTitle", function(val) {
        		konymp.logger.trace("----------Entering chartTitle Setter---------", konymp.logger.FUNCTION_ENTRY);
        		this._chartTitle = val;
        		konymp.logger.trace("----------Exiting chartTitle Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
      		defineSetter(this, "titleFontSize", function(val) {
        		konymp.logger.trace("----------Entering titleFontSize Setter---------", konymp.logger.FUNCTION_ENTRY);
              	try {
                  	if(!isNaN(parseInt(val))) {
                      	this._chartProperties._titleFontSize = val;
                    }
                  	else {
                      	throw {"Error": "NotNumber", "message": "Title Font Size value should be a number"};
                    }
                }
              	catch(exception) {
                  	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.Error === "NotNumber") {
                      	throw(exception);
                    }
                }
        		konymp.logger.trace("----------Exiting titleFontSize Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
      		defineSetter(this, "titleFontColor", function(val) {
        		konymp.logger.trace("----------Entering titleFontColor Setter---------", konymp.logger.FUNCTION_ENTRY);
              	try {
                  	if(this.hexCodeFormat.test(val)) {
                      	this._chartProperties._titleFontColor = val;
                    }
                  	else {
                      	throw {"Error": "InvalidTitleFontColorCode", "message": "The title font color code must be in hex format. Eg.:#000000"};
                    }
                }
              	catch(exception) {
                  	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.Error === "InvalidTitleFontColorCode") {
                      	throw(exception);
                    }
                }
        		konymp.logger.trace("----------Exiting titleFontColor Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
			defineSetter(this, "lowValue", function(val) {
        		konymp.logger.trace("----------Entering lowValue Setter---------", konymp.logger.FUNCTION_ENTRY);
              	try {
                  	if(!isNaN(parseInt(val))) {
                      	this._chartProperties._lowValue = val;
                    }
                  	else {
                      	throw {"Error": "NotNumber", "message": "Low/High value should be a number"};
                    }
                }
              	catch(exception) {
                  	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.Error === "NotNumber") {
                      	throw(exception);
                    }
                }
        		konymp.logger.trace("----------Exiting lowValue Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
			defineSetter(this, "highValue", function(val) {
        		konymp.logger.trace("----------Entering highValue Setter---------", konymp.logger.FUNCTION_ENTRY);
              	try {
                  	if(!isNaN(parseInt(val))) {
                      	this._chartProperties._highValue = val;
                    }
                  	else {
                      	throw {"Error": "NotNumber", "message": "Low/High value should be a number"};
                    }
                }
              	catch(exception) {
                  	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.Error === "NotNumber") {
                      	throw(exception);
                    }
                }
        		konymp.logger.trace("----------Exiting highValue Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
        	defineSetter(this, "bgColor", function(val) {
        		konymp.logger.trace("----------Entering bgColor Setter---------", konymp.logger.FUNCTION_ENTRY);
              	try {
                  	if(this.hexCodeFormat.test(val)) {
                      	this._chartProperties._bgColor = val;
                    }
                  	else {
                      	throw {"Error": "InvalidBackgoundColorCode", "message": "The background color code must be in hex format. Eg.:#000000"};
                    }
                }
              	catch(exception) {
                  	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                  	if(exception.Error === "InvalidBackgoundColorCode") {
                      	throw(exception);
                    }
                }
        		konymp.logger.trace("----------Exiting bgColor Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
          	defineSetter(this, "xAxisTitle", function(val) {
              	konymp.logger.trace("----------Entering xAxisTitle Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._xAxisTitle = val;
              	konymp.logger.trace("----------Exiting xAxisTitle Setter---------", konymp.logger.FUNCTION_EXIT);
            });
          	defineSetter(this, "yAxisTitle", function(val) {
              	konymp.logger.trace("----------Entering yAxisTitle Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._yAxisTitle = val;
              	konymp.logger.trace("----------Exiting yAxisTitle Setter---------", konymp.logger.FUNCTION_EXIT);
            });
          	defineSetter(this, "enableGrid", function(val) {
              	konymp.logger.trace("----------Entering enableGrid Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._enableGrid = val;
              	konymp.logger.trace("----------Exiting enableGrid Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "enableGridAnimation", function(val) {
              	konymp.logger.trace("----------Entering enableGridAnimation Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._enableGridAnimation = val;
              	konymp.logger.trace("----------Exiting enableGridAnimation Setter---------", konymp.logger.FUNCTION_EXIT);
            });
           	defineSetter(this, "enableChartAnimation", function(val) {
              	konymp.logger.trace("----------Entering enableChartAnimation Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._enableChartAnimation = val;
              	konymp.logger.trace("----------Exiting enableChartAnimation Setter---------", konymp.logger.FUNCTION_EXIT);
            });
          	defineSetter(this, "chartData", function(val) {
        		konymp.logger.trace("----------Entering chartData Setter---------", konymp.logger.FUNCTION_ENTRY);
        		this._chartData = val.data;
        		konymp.logger.trace("----------Exiting chartData Setter---------", konymp.logger.FUNCTION_EXIT);
      		});
          	defineSetter(this, "enableStaticPreview", function(val) {
              	konymp.logger.trace("----------Entering enableStaticPreview Setter---------", konymp.logger.FUNCTION_ENTRY);
              	this._chartProperties._enableStaticPreview = val;
              	konymp.logger.trace("----------Exiting enableStaticPreview Setter---------", konymp.logger.FUNCTION_EXIT);
            });
          	this.view.horizontalBarBrowser.onPageFinished = this.showGridChart.bind(this);
      		konymp.logger.trace("----------Exiting initGettersSetters Function---------", konymp.logger.FUNCTION_EXIT);
    	},
    	/**
     	 * @function createChart         
     	 * @param {JSON array} dataSet - data for the chart
     	 * @description: initiates the creation of doughnut chart
     	 */
    	createChart: function(dataSet) {
    		konymp.logger.trace("----------Entering createChart Function---------", konymp.logger.FUNCTION_ENTRY);
       		try {
              	var data, labels, colors, gridData;
              	if(dataSet !== null && dataSet !== undefined && dataSet !== "" && dataSet.length !== 0) {
       				data = dataSet.map(function(obj){
          				return Number(obj.Value||obj.value);
        			});
        			labels = dataSet.map(function(obj){
          				return obj.label;
        			});
        			colors = dataSet.map(function(obj){
          				return obj.colorCode;
        			});
                }
              	else if(this._chartData !== null && this._chartData !== undefined && this._chartData !== "" && this._chartData.length !== 0) {
                  	gridData = this._chartData;
                  	data = gridData.map(function(obj){
          				return Number(obj.Value||obj.value);
        			});
        			labels = gridData.map(function(obj){
          				return obj.label;
        			});
        			colors = gridData.map(function(obj){
          				return obj.colorCode;
        			});
                }
              	else {
                  	throw {"Error": "noData", "message": "Data not passed to chart"};
                }
        		if(this.validateAllParams(this._chartTitle, data, labels, colors, this._chartProperties)) {
         			this.view.horizontalBarBrowser.evaluateJavaScript('var chartObj = new konymp.charts.horizontalBar(); chartObj.Generate_HorizontalChart(' +
                                                       				JSON.stringify(this._chartTitle) + ',' +
                                                       				JSON.stringify(labels) + ',' +
                                                       				JSON.stringify(data) + ',' +
                                                       				JSON.stringify(colors) + ',' +
                                                       				JSON.stringify(this._chartProperties) + ')');
                  	this.view.forceLayout();
                  	konymp.logger.trace("----------Exiting createChart Function---------", konymp.logger.FUNCTION_EXIT);
					return true;
        		}
      		}
      		catch(exception) {
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.Error === "noData") {
                  	throw(exception);
                }
      		}
    	},
    	/**
     	 * @function _validationData
     	 * @private
     	 * @param {String/js array} data - the paramater to be validated
     	 * @param {String} type - the type in which the parameter should be
     	 * @description: validates the datatype of a single paramater passed
     	 */
    	validateData: function(data, type) {
      		konymp.logger.trace("----------Entering validateData Function---------", konymp.logger.FUNCTION_ENTRY);
      		try {
              	if(type === 'array') {
        			konymp.logger.trace("----------Exiting validateData Function---------", konymp.logger.FUNCTION_EXIT);
        			return Array.isArray(data);
      			}
      			else if(typeof data === type) {
        			konymp.logger.trace("----------Exiting validateData Function---------", konymp.logger.FUNCTION_EXIT);
        			return true;
      			}
      			else {
        			konymp.logger.trace("----------Exiting validateData Function---------", konymp.logger.FUNCTION_EXIT);
        			return false;
      			}
            }
          	catch(exception) {
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            }
    	},
    	/**
     	 * @function validateAllParams
     	 * @private
     	 * @param {String} title 
     	 * @param {js array} data 
     	 * @param {js array} labels 
     	 * @param {js array} colors 
     	 * @description: validates the datatypes of all the paramaters
     	 */
    	validateAllParams: function(title, data, labels, colors, properties) {
      		konymp.logger.trace("----------Entering validateAllParams Function---------", konymp.logger.FUNCTION_ENTRY);
      		try {
              	if(!this.validateData(title,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for title " + title};
      			}
      			if(!this.validateData(data,'array')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for data " + JSON.stringify(data)};
      			}
      			if(!this.validateData(labels,'array')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for labels " + JSON.stringify(labels)};
      			}
      			if(!this.validateData(colors,'array')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for bgColor " + JSON.stringify(colors)};
      			}	
          		if(!this.validateData(properties._xAxisTitle,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for xAxisTitle " + JSON.stringify(properties._xAxisTitle)};
      			}
          		if(!this.validateData(properties._yAxisTitle,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for yAxisTitle " + JSON.stringify(properties._yAxisTitle)};
      			}
          		if(!this.validateData(properties._bgColor,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for bgColor " + JSON.stringify(properties._bgColor)};
      			}
          		if(!this.validateData(properties._titleFontSize,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for titleFontSize " + JSON.stringify(properties._titleFontSize)};
      			}
          		if(!this.validateData(properties._titleFontColor,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for titleFontColor " + JSON.stringify(properties._titleFontColor)};
      			}
          		if(!this.validateData(properties._highValue,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for highValue " + JSON.stringify(properties._highValue)};
      			}
          		if(!this.validateData(properties._lowValue,'string')) {
        			throw {"Error": "Invalid Datatype", "message": "wrong dataType for lowValue " + JSON.stringify(properties._lowValue)};
      			}
            }
          	catch(exception) {
              	konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
              	if(exception.Error === "Invalid Datatype") {
                  	throw(exception);
                }
            }
      		konymp.logger.trace("----------Exiting validateAllParams Function---------", konymp.logger.FUNCTION_EXIT);
      		return true;
    	},
      	/**
       	 * @function showGridChart
       	 * @param dataSet 
         * @description creates the chart with the data in the data grid on browser load
       	 */
      	showGridChart: function() {
          	try {
              	if(this._chartProperties._enableStaticPreview && this._chartData.length !== 0) {
                  	this.createChart(this._chartData);
                }
              	else {
                  	throw {"Error": "NoData", "message": "No data in data grid"};
                }
            }
          	catch(exception) {
              	if(exception.Error === "NoData") {
              		konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                }
            }
        }
  	};
});