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
});

// load the categories
const loadCategories = async ()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayCategories(data.categories);
}
//  display the categories menu
const displayCategories = (categories) =>{
    const categoryMenuContainer = document.getElementById('category-menu-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList = "flex justify-center items-center text-lg md:text-xl lg:text-2xl font-bold text-secondary gap-4 p-4 md:p-6 border border-gray-300 rounded-xl md:max-w-[312px] w-full";

        const {category: category_name,category_icon} = category;

        div.innerHTML = `
            <img
              class="max-w-14"
              src=${category_icon}
              alt="${category_name} image"
            />
            <span>${category_name}</span>
        `;
        categoryMenuContainer.appendChild(div);
        
    });
}
loadCategories();