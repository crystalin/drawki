var canvas;
var context;
 
// Taille du cadre
var canvasWidth = 500;
var canvasHeight = 500;
 
/*
var padding = 25;
var lineWidth = 8;
*/
 
//Les couleurs c'est ici
var colorGreen = "#659b41";
var curColor = colorGreen;
 
//Pour rajouter des couleurs
//var colorPurple = "#cb3594";
//var colorYellow = "#ffcf33";
//var colorBrown = "#986928";
//var clickColor = new Array();
 
//Non utilisé ici
//var curTool = "crayon";
//var clickTool = new Array();
 
/*
// Pour rajouter les images des bouttons de contrôle
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var crayonBackgroundImage = new Image();
var markerBackgroundImage = new Image();
var eraserBackgroundImage = new Image();
var crayonTextureImage = new Image();
*/
 
var clickX = new Array();
var clickY = new Array();
 
//Variables nécessaires aux fonctions de contrôle
 
var clickDrag = new Array();
var paint = false;
 
/*
var mediumStartX = 18;
var mediumStartY = 19;
var mediumImageWidth = 93;
var mediumImageHeight = 46;
var drawingAreaX = 111;
var drawingAreaY = 11;
var drawingAreaWidth = 267;
var drawingAreaHeight = 200;
var toolHotspotStartY = 23;
var toolHotspotHeight = 38;
var sizeHotspotStartY = 157;
var sizeHotspotHeight = 36;
*/
 
//Si on veux pouvoir choisir la taille  du cursseur décommenter les lignes suivantes et changer dans function redraw la ligne context.lineWidth = 25;
//var clickSize = new Array();
/*var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = 39;
sizeHotspotWidthObject.large = 25;
sizeHotspotWidthObject.normal = 18;
sizeHotspotWidthObject.small = 16;
var curSize = "huge";
*/
 
/* Fonction non appelée pour effacer le canevas si elle a été appellé 8 fois ou plus
 
var totalLoadResources = 8;
var curLoadResNum = 0;
 
function resourceLoaded()
{
                if(++curLoadResNum >= totalLoadResources){
                               redraw();
                }
}
*/
 
function prepareCanvas()
{
//La ligne suivante défini l'élément dans laquelle on va créer notre canevas id="canvasDiv"
var canvasDiv = document.getElementById('canvasDiv');
//On crée l'élément
canvas = document.createElement('canvas');
//La ligne suivante défini la largeur
canvas.setAttribute('width', canvasWidth);
//La ligne suivante défini la hauteur
canvas.setAttribute('height', canvasHeight);
//La ligne suivante défini le nom
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
                canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");
 
// Quand on clique
document.querySelector('#canvas').addEventListener('mousedown', function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
                // La variable paint décrit si on écrit ou pas
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});
 
// Quand on bouge la souris
document.querySelector('#canvas').addEventListener('mousemove', function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});
 
// Quand on relache
document.querySelector('#canvas').addEventListener('mouseup', function(e){
  paint = false;
});
 
// Quand on quitte le canevas
document.querySelector('#canvas').addEventListener('mouseleave', function(e){
  paint = false;
});
}
 
function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
 
  //Contôles pour détecter le changement de couleur et de taille
  //clickColor.push(curColor);
  //clickSize.push(curSize);
}
 
//La fonction redraw dessine context.stroke();
//Pourquoi n'y a t'il pas de context.beginPath (); ???
function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  //Choix de la couleur parmi colorPurple, colorGreen,colorYellow,colorBrawn
  context.strokeStyle = curColor;
  //Choix du type de pointeur parmi round,bevel et miter
  context.lineJoin = "round";
  //Choix de la grosseur du pointeur curSize = small, normal, large, huge
  context.lineWidth = 25;
  for(var i=0; i < clickX.length; i++) {                        
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
  }
}
