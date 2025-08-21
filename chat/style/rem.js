function setHtmlSize(){
  var pageWidth = window.innerWidth;
  if(typeof pageWidth != "number"){ 
    if(document.compatMode == "number"){ 
      pageWidth = document.documentElement.clientWidth;
    }else{
      pageWidth = document.body.clientWidth; 
    } 
  } 
  var fontSize = (window.innerWidth * 100) / 750;
  if(fontSize<40){
    fontSize = 40;
  }
  //根据屏幕大小确定根节点字号
  document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px';
}
function resize(){
  setHtmlSize();
}
if (window.attachEvent) { 
  window.attachEvent("resize", resize); 
} else if (window.addEventListener) { 
  window.addEventListener("resize", resize, false);   
}
setHtmlSize();
