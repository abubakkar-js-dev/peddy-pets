const menuBar = document.getElementById('menu-bar');
const menuSection = document.getElementById('menu-sec');
const viewMoreBtn = document.getElementById('btn-view-more');
const petsContainer = document.getElementById('pets-container');
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
      const btn = document.createElement('button');
      btn.classList = "flex justify-center items-center text-lg md:text-xl lg:text-2xl font-bold text-secondary gap-4 p-4 md:p-6 border border-gray-300 rounded-xl md:max-w-[312px] w-full";

        const {category: category_name,category_icon} = category;

        btn.innerHTML = `
            <img
              class="max-w-14"
              src=${category_icon}
              alt="${category_name} image"
            />
            <span>${category_name}</span>
        `;
        btn.setAttribute('onclick',`loadCategoriesPets('${category_name}')`);
        btn.setAttribute('id',`btn-categ-${category_name.toLowerCase()}`)
        btn.classList.add('category-btn');
        categoryMenuContainer.appendChild(btn);
    
    });
}



// load all pets
const loadPets = async(petCategory)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/${petCategory ? petCategory.toLowerCase() : 'pets'}`);
    const data = await response.json();
    displayPets(data.pets);
}

// display pet
const displayPets = (pets) =>{
    const petsContainer = document.getElementById('pets-container');
    petsContainer.innerHTML = "";
    pets.forEach(pet => {
        const div = document.createElement('div');
        div.classList = "p-5 border border-gray-200 rounded-xl space-y-6";
        const {breed,category,date_of_birth,price,image,gender,pet_name} = pet;
        div.innerHTML = `
                        <img
                  class="w-full rounded-lg"
                  src=${image}
                  alt="${category} image"
                />
                <!-- card content -->
                <div class="">
                  <div class="border-b pb-3 mb-3 space-y-1">
                    <h3 class="text-lg md:text-xl font-bold text-black">
                      ${pet_name}
                    </h3>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/breed.png" alt="breed icon" />
                      <p>Breed: ${breed ? breed : "Unknown"}</p>
                    </span>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/birth.png" alt="birth icon" />
                      <p>Birth: ${date_of_birth ? date_of_birth : "Unknown"}</p>
                    </span>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/gender.png" alt="breed icon" />
                      <p>Gender: ${gender ? gender : "Unknown"}</p>
                    </span>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/price.png" alt="breed icon" />
                      <p>Price: ${price ? price + '$' : "Unknown"}</p>
                    </span>
                  </div>
                  <!-- card button start -->
                  <div class="flex justify-between">
                    <button
                      class="h-8 md:h-10 px-4 md:px-5 border-2 border-gray-200 hover:border-primary/20 hover:bg-primary/20 rounded-lg text-gray-500 font-bold text-base lg:text-lg"
                    >
                      <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button
                      class="h-8 md:h-10 px-4 md:px-5 border-2 border-gray-200 hover:border-primary/20 hover:bg-primary/20 rounded-lg text-primary font-bold text-base lg:text-lg"
                    >
                      Adopt
                    </button>
                    <button
                      
                      class="h-8 md:h-10 px-4 md:px-5 border-2 border-gray-200 hover:border-primary/20 hover:bg-primary/20 rounded-lg text-primary font-bold text-base lg:text-lg"
                    >
                      Details
                    </button>
                  </div>
                  <!-- card button end -->
                </div>
                <!-- card content end -->
        `;
        petsContainer.appendChild(div);
    });
}

const resetActiveBtn = () =>{
  const buttons = document.querySelectorAll('#category-menu-container button');
  buttons.forEach((btn)=>{
    btn.classList.remove('border-primary','bg-primary/10','!rounded-full');
  })
}

// loadCategories post
const loadCategoriesPets = async (category_name)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category_name.toLowerCase()}`);
  const data =  await response.json();
  if(data.data.length === 0){
      document.getElementById('no-category-container').classList.remove('hidden');
  }else{
    document.getElementById('no-category-container').classList.add('hidden');
  }
  // change the activity
  resetActiveBtn();
  const activeBtn = document.getElementById(`btn-categ-${category_name.toLowerCase()}`);

  // if(activeBtn.classList.contains('rounded-xl')){
  //   activeBtn.classList.remove('rounded-xl');
  //   activeBtn.classList.add('rounded-full');
  // }else{
  //   activeBtn.classList.add('rounded-xl');
  // }
  activeBtn.classList.add('!rounded-full','border-primary','bg-primary/10');
  


  displayPets(data.data);
}





loadCategories();
loadPets(false);