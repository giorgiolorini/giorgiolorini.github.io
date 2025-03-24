var isDark = false;
var sideMenuColorChangable = true;

window.addEventListener('load', function(f) {
    setBright();
    isDark = false;
    sideMenuColorChangable = true;
    correctColor();
})

document.getElementById("switch").addEventListener("change", () => {

    if (isDark){
        setBright();
        isDark = false;
        sideMenuColorChangable = true;
        correctColor();
    } else {
        setDark();
        isDark = true;
        sideMenuColorChangable = false;
        correctColor();
    }

})

// Get the root element
var r = document.querySelector(':root');

// Get the styles (properties and values) for the root
var rs = getComputedStyle(r);

function setBright(){
    r.style.setProperty('--underlining-box-color', rs.getPropertyValue('--bright-underlining-box-color') );
    r.style.setProperty('--sidebar-background-color', rs.getPropertyValue('--bright-sidebar-background-color') );
    r.style.setProperty('--sidebar-font-color', rs.getPropertyValue('--bright-sidebar-font-color') );
    r.style.setProperty('--main-first-color', rs.getPropertyValue('--bright-main-first-color') );
    r.style.setProperty('--main-second-color', rs.getPropertyValue('--bright-main-second-color') );
    r.style.setProperty('--main-third-color', rs.getPropertyValue('--bright-main-third-color') );
    r.style.setProperty('--active-text-color', rs.getPropertyValue('--bright-text-color') );
    r.style.setProperty('--active-footer-color', rs.getPropertyValue('--bright-footer-color') );
    r.style.setProperty('--active-black', rs.getPropertyValue('--bright-black') );
}

function setDark(){
    r.style.setProperty('--underlining-box-color', rs.getPropertyValue('--dark-underlining-box-color') );
    r.style.setProperty('--sidebar-background-color', rs.getPropertyValue('--dark-sidebar-background-color') );
    r.style.setProperty('--sidebar-font-color', rs.getPropertyValue('--dark-sidebar-font-color') );
    r.style.setProperty('--main-first-color', rs.getPropertyValue('--dark-main-first-color') );
    r.style.setProperty('--main-second-color', rs.getPropertyValue('--dark-main-second-color') );
    r.style.setProperty('--main-third-color', rs.getPropertyValue('--dark-main-third-color') );
    r.style.setProperty('--active-text-color', rs.getPropertyValue('--dark-text-color') );
    r.style.setProperty('--active-footer-color', rs.getPropertyValue('--dark-footer-color') );
    r.style.setProperty('--active-black', rs.getPropertyValue('--dark-black') );
}