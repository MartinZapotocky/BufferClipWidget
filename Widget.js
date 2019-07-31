
define(['dojo/_base/declare',"esri/map","esri/geometry/Extent", 'jimu/BaseWidget',"jimu/LayerStructure", "dojo/dom", "dojo/on", "esri/SpatialReference","esri/tasks/FeatureSet", "esri/Color", "esri/graphic", "esri/graphicsUtils", "esri/tasks/LinearUnit", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
      "esri/tasks/GeometryService", "esri/tasks/Geoprocessor",   "esri/layers/FeatureLayer",  "dojo/_base/lang", "dojo/domReady!"],
function(declare,Map,Extent, BaseWidget, LayerStructure, dom, on, SpatialReference, FeatureSet, Color, Graphic, graphicsUtils, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
      GeometryService, Geoprocessor, FeatureLayer, lang) {
  //To create a widget, you need to derive from BaseWidget.
  return declare([BaseWidget], {
    // DemoWidget code goes here

    //please note that this property is be set by the framework when widget is loaded.
    //templateString: template,

    baseClass: 'jimu-widget-bufferclip',

    postCreate: function() {
      this.inherited(arguments);
      console.log('postCreate');
	  	  
    },

    startup: function() {
      this.inherited(arguments);     
      console.log('startup');
	  
	    var gpUrl =
        "https://portal.esprit-bs.sk/server/rest/services/MartinZ/MartinZtool/GPServer/MartinZtool";
      gp = new Geoprocessor(gpUrl);
	  
	/*this.testLayer = this.map.getLayer("testLayer_7116");
	this.vchuLayer = this.map.getLayer("chvuLayer_655");
		
		var layerStructure = LayerStructure.getInstance();
		console.log(layerStructure);*/
	 	 
    },
	
		  run_service: function() {
        this.map.graphics.clear();
	  var vsDistance = new LinearUnit();
	  vsDistance.distance = this.distance.value;
	  vsDistance.units = "esriKilometers";	  	  
        var featureSet = new FeatureSet();
        featureSet.features = this.testlayer.graphics;
		
		var featureSetVchu = new FeatureSet();
        featureSetVchu.features = this.vchulayer.graphics;
	  
	  var params = {	
	  "Distance": vsDistance,
	  "Input": featureSet,
	  "ClipInput": featureSetVchu
	  };  
	  gp.execute(params).addCallback(lang.hitch(this, this.displayResult));
	    },
		
		
	  	displayResult: function(result, messages) {
	  var polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
		new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
		new Color([255,0,0]), 2),new Color([255,255,0,0.25])
		);
		var features = result[0].value.features;
		for (var f=0; f < features.length; f++){			
			features[f].setSymbol(polySymbol);
			this.map.graphics.add(features[f]);
			}			
  
	  
	  },
	  
	 

    onOpen: function(){
	  console.log('onOpen');

	   this.vchulayer = new FeatureLayer(this.config.vchuVrstva, {id:"vchulayer"});			 		
		this.map.addLayer(this.vchulayer);
	   this.testlayer = new FeatureLayer(this.config.testVrstva, {id:"testlayer"});
    this.map.addLayer(this.testlayer);
    
      console.log(this.map);


    },

    onClose: function(){
	  this.map.graphics.clear();
	  this.map.removeLayer(this.vchulayer);
	  this.map.removeLayer(this.testlayer);
      console.log('onClose');
    },

    onMinimize: function(){
      console.log('onMinimize');
    },

    onMaximize: function(){
      console.log('onMaximize');
    },

    onSignIn: function(credential){
      /* jshint unused:false*/
      console.log('onSignIn');
    },

    onSignOut: function(){
      console.log('onSignOut');
    },

    showVertexCount: function(count){
      this.vertexCount.innerHTML = 'The vertex count is: ' + count;
    }
  });
});