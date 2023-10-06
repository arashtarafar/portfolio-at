let darkmode = false;
const topBar = document.querySelector(".topbar");
const mobileMenuToggle = document.querySelector(".menu-mobile");
const mobileMenuLinks = document.getElementsByClassName("menu-link");
const navigationMenu = document.querySelector(".menu");
const darkModeToggle = document.querySelector(".toggle-icon");
const backToTopButton = document.querySelector(".backtotop");

if(localStorage.darkmode){
    darkmode = localStorage.darkmode === "true" ? true : false;
    if(darkmode){
        document.querySelector(":root").classList.add("dark"); // Single line to change theme to darkmode
        darkModeToggle.classList.remove("bi-brightness-high-fill");
        darkModeToggle.classList.add("bi-brightness-high");
    }
}

// Code to detect scrolling past a certain point taken from Stackoverflow

window.addEventListener('scroll', function(e) {
    console.log(window.scrollY);
    if(window.scrollY > 0){
        topBar.classList.add("sticky");

        if (window.scrollY > 600) {
            backToTopButton.style.display = "block";
        }
        else{
            backToTopButton.style.display = "none";
        }
    }else{
        topBar.classList.remove("sticky");
        backToTopButton.style.display = "none";
    }
});

darkModeToggle.addEventListener("click", ()=>{
    if(!darkmode){
        darkmode = true;
        document.querySelector(":root").classList.add("dark"); // Single line to change theme to darkmode
        darkModeToggle.classList.remove("bi-brightness-high-fill");
        darkModeToggle.classList.add("bi-brightness-high");
        localStorage.darkmode = true;
    }else{
        darkmode = false;
        document.querySelector(":root").classList.remove("dark"); // Single line to change theme to lightmode
        darkModeToggle.classList.remove("bi-brightness-high");
        darkModeToggle.classList.add("bi-brightness-high-fill");
        localStorage.darkmode = false;
    }
});

mobileMenuToggle.addEventListener("click", ()=>{
    navigationMenu.classList.toggle("collapsed");
});

for(link of mobileMenuLinks){
    link.addEventListener("click", ()=>{
        navigationMenu.classList.remove("collapsed");
    });
}