var map;
var tb;
var serviceAreaTask, params, clickpoint;
require(["esri/map",
    "dojo/on",
    'dojo/dom',
    "esri/layers/FeatureLayer",
    "esri/geometry/Extent",
    "esri/tasks/query",
    "dojo/ready",
    "esri/config", 
    "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/FeatureSet",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
    "esri/geometry/Point", "esri/graphic",
    "dojo/parser", "dojo/dom", "dijit/registry", 
    "esri/Color", "dojo/_base/array",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
    "dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels", "dijit/form/HorizontalSlider",
    "dojo/domReady!"
    ],
    function(
      Map,
      on,
      dom,
      FeatureLayer,
      Extent,
      Query,
      ready,
      esriConfig, 
      ServiceAreaTask, ServiceAreaParameters, FeatureSet, 
      SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
      Point, Graphic,
      parser, dom, registry,
      Color, arrayUtils
      
      

    ) {

  ready(function () {
    // parser.parse();
  

    

    map = new Map("map", {
      basemap: "topo",
      extent: new Extent({
      "xmax": -372173.0838826194,
      "xmin": -434316.387878384,
      "ymax": 4955413.140307776,
      "ymin": 4893422.710368582,
        "spatialReference":{"wkid":102100,"latestWkid": 3857}
      })
    

    
    });

  var salud = new FeatureLayer('https://services8.arcgis.com/BtkRLT3YBKaVGV3g/arcgis/rest/services/CENTROS_SALUD2/FeatureServer/0')
  
  map.addLayer(salud);

 

  

      params = new ServiceAreaParameters();
      params.defaultBreaks= [1];
      params.outSpatialReference = map.spatialReference;
      params.returnFacilities = false;
      params.returnPolygonBarriers = true;
      params.outputGeometryPrecisionUnits = "esriMeters"

//Falta el parametro facilities, que necesita un featureSet. El feature set es el resultado de la query. 
      
      serviceAreaTask = new ServiceAreaTask("http://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/NAServer/ServiceArea");

    var query = new Query(); 
    query.where = "1=1"; 
    salud.selectFeatures(query,FeatureLayer.SELECTION_NEW);

    salud.on('selection-complete',function(resultados){
      params.facilities = resultados; 
    })

//Solve: 

    serviceAreaTask.solve(params,function(serviceAreaSolveResult){
      var polygonSymbol = new SimpleFillSymbol(
        "solid",  
        new SimpleLineSymbol("solid", new Color([232,104,80]), 2),
        new Color([232,104,80,0.25])
      );
      
    });
    // arrayUtils.forEach(solveResult.serviceAreaPolygons, function(serviceArea){
    //   serviceArea.setSymbol(polygonSymbol);
    //   map.graphics.add(serviceArea);
    // });



      
    });

});

  

   
