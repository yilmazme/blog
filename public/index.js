
const right = document.querySelector("#right");
const left = document.querySelector("#left");
const space = document.querySelector("#space");
const mynav = document.querySelector("#mynav");
const closeBtn = document.querySelector("#close-btn");

const imageList=["norway","desert","night","steppe"];
window.addEventListener("load", ()=>{
    mynav.style.opacity="1";
    mynav.style.transform="scale(1,1)";
    mynav.style.transitionDuration = "2s";
    
    right.style.transform="translate(-30vw)";
    right.style.transitionDuration = "1s";
   
    setTimeout(()=>{
        space.style.transform="translate(0,100vh)";
        space.style.transitionDuration = "1s";
        space.style.transitionTimingFunction="ease-in";
       
       
    },2000)
})


var count=0;
setInterval(()=>{
    if(count==3){
        count=0;
        return
    }
    count++
},4000)

setInterval(()=>{
    left.style.backgroundImage="url(../images/"+imageList[count]+".jpg)";
},4000)



    closeBtn.addEventListener("click",()=>{
    space.style.display="none";
})

right.addEventListener("mouseover",()=>{
    right.style.borderRadius="0 0 0 0";
   
})
right.addEventListener("mouseleave",()=>{
    right.style.borderRadius="10% 0 0 0";
    
    
})