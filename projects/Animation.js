//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

//goback
function goback(){
    window.history.back();
}
function goSource(){
    window.location.href = "https://github.com/abyss01701/main";
}
var sidemenu = document.getElementById("sideMenu");

function openMenu(){
    sidemenu.style.right = "0";
}
function closeMenu(){
    sidemenu.style.right = "-200px";
}

//admin btn
async function checkAdminStatus() {
    try {
        const response = await fetch('http://localhost:5000/check-admin', {
            method: 'GET',
            credentials: 'include' // Include cookies for session
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.isAdmin) {
                document.getElementById('add-project').style.display = 'block';
            }
        } else {
            console.error('Failed to check admin status');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call this function after the DOM content is loaded
window.addEventListener('DOMContentLoaded', () => {
    loadProjects(); // Load existing projects
    checkAdminStatus(); // Check if the user is an admin
});