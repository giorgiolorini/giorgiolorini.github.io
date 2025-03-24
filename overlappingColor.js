document.addEventListener('scroll', function(e) {
    correctColor();
}, false)


function correctColor(){
    var homeBackground = document.getElementById("home");
    const sidebarElems = document.getElementsByClassName("sidebarElem");
    var arr = Array.prototype.slice.call( sidebarElems );
    arr.forEach(elem => {
        console.log(elem);
        elemRect = elem.getBoundingClientRect(),
        homeRect = homeBackground.getBoundingClientRect(),
        offset   = homeRect.top + homeBackground.offsetHeight - (elemRect.top + elem.offsetHeight/2);
        if(offset < 0 && sideMenuColorChangable){
            elem.style.color = 'black';
        } else {
            elem.style.color = 'white';
        }
    });
}