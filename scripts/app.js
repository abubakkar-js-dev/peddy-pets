const menuBar = document.getElementById('menu-bar');
const menuSection = document.getElementById('menu-sec');
const viewMoreBtn = document.getElementById('btn-view-more');
menuBar.addEventListener('click',()=>{
    if(menuSection.classList.contains('hidden')){
        menuSection.classList.remove('hidden');
    }else{
        menuSection.classList.add('hidden');
    }
});

// scroll to adopt best friend sec when view more btn clicked 
viewMoreBtn.addEventListener('click',()=>{
    document.getElementById('adopt-best-friend').scrollIntoView({behavior: 'smooth'});
})