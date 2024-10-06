const menuBar = document.getElementById('menu-bar');
const menuSection = document.getElementById('menu-sec')
menuBar.addEventListener('click',()=>{
    if(menuSection.classList.contains('hidden')){
        menuSection.classList.remove('hidden');
    }else{
        menuSection.classList.add('hidden');
    }
})