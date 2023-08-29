define(function() {
  //logger module
  var voltmxLoggerModule = require('com/voltmx/hamMenu/voltmxLogger');
  var voltmxL = voltmxL || {};
  voltmxL.logger = (new voltmxLoggerModule("hamburgerMenu Component")) || function() {};
  voltmxL.logger.setLogLevel("DEBUG");
  voltmxL.logger.enableServerLogging = true;


  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.segMenu.onRowClick= this.onSegMenuRowClick;
      this.view.btnClose.onClick=this.btnClose;
      voltmxL.logger.trace("Entering hamburgerMenu Component constructor", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.trace("Exiting hamburgerMenu Component constructor", voltmxL.logger.FUNCTION_EXIT);
       this.view.segMenu.widgetDataMap={
        "lblMenuItem":"lblMenuItem"

      };

    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      voltmxL.logger.trace("Entering hamburgerMenu Component initGettersSetters ", voltmxL.logger.FUNCTION_ENTRY);
      voltmxL.logger.trace("Exiting hamburgerMenu Component initGettersSetters ", voltmxL.logger.FUNCTION_EXIT);
    },

    btnClose: function(){
      this.view.flxMenuTrans.isVisible=false;
     
    },


    /**
        	@function : onSegMenuRowClick
            @description : This function is invoked on click of the segment
            @param rowNumber : Row number of the clicked row by the user
            @private
        */
   
    onSegMenuRowClick: function(rowNumber) {
      voltmxL.logger.trace("Entering hamburgerMenu Component onSegMenuRowClick  ", voltmxL.logger.FUNCTION_ENTRY);
        this.setMenuVisibility(false);
      if (this.onMenuItemClick) {
        var menuItemObject = {
          "menuItemIndex": this.view.segMenu.selectedRowIndex[1].toFixed(0),
          "menuItemText": this.view.segMenu.selectedRowItems[0].lblMenuItem,

        };
        this.onMenuItemClick(menuItemObject);

      }      

      voltmxL.logger.trace("Exiting hamburgerMenu Component onSegMenuRowClick  ", voltmxL.logger.FUNCTION_EXIT);
    },

    /**
        	@api : setMenuVisibility
            @description : This function is used to set the visibility of the menu
            @param isVisible : To define whether the menu should be visible or not
            @private
        */
    setMenuVisibility: function(isVisible,menuItemObject) {
      voltmxL.logger.trace("Entering hamburgerMenu Component setMenuVisibility  ", voltmxL.logger.FUNCTION_ENTRY);
      var deviceInfo = voltmx.os.deviceInfo().name;
      if (isVisible) {
        this.view.flxMenuTrans.isVisible = true;
        this.view.width = "100%";
        this.view.height = "100%";
      this.view.flxImage.isVisible=false;
      } else {
        this.view.flxMenuTrans.isVisible = false;
        this.view.flxImage.isVisible=true;
        var item=this.view.segMenu.selectedRowItems[0].lblMenuItem;
        this.view.lblContent.text = "This is " + item ;
        if (deviceInfo === "thinclient") {
          this.view.width = "100%";
          this.view.height = "100%";
        } else {
        }
      }
      voltmxL.logger.trace("Exiting  hamburgerMenu Component setMenuVisibility  ", voltmxL.logger.FUNCTION_EXIT);
      voltmx.application.getCurrentForm();

    },

    /**
        	@api : setMenuZIndex
            @description : This function is used to calculate z indices of the children in form
            @param formReference : This is the instance of the form in which sliding menu is included
            @public
        */
    setMenuZIndex: function(formReference) {
      var widgets = formReference.widgets();
      var zIndexValues = [];
      widgets.forEach((widgetReference) => {
        zIndexValues.push(widgetReference.zIndex);
      });
      zIndexValues.sort();
      this.view.zIndex = zIndexValues[zIndexValues.length - 1] + 1;
    },
    
       setData: function(data){
      this.view.segMenu.data=data;
      
    }
  };
});