const menuBar = document.getElementById('menu-bar');
const menuSection = document.getElementById('menu-sec');
const viewMoreBtn = document.getElementById('btn-view-more');
const petsContainer = document.getElementById('pets-container');
const sortBtn = document.getElementById('btn-sort');
const likedPets = document.getElementById('liked-pets-container');

// menubar collapse
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
const loadPets = async()=>{
  handleSpinner();
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const data = await response.json();
    displayPets(data.pets);
}
// spinner functionality
const handleSpinner = () =>{
  const spinner = document.getElementById('spinner');
  const petContainerCols = document.getElementById('pets-col-wrap');
  try {
    spinner.classList.remove('hidden');
    petContainerCols.classList.add('hidden');
    setTimeout(() => {
      spinner.classList.add('hidden');
      petContainerCols.classList.remove('hidden');
    }, 2000);
  } catch (error) {
    // if error hide the spinner
    spinner.classList.add('hidden');
  }
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
                      onclick="handleLikeBtn('${image}')"
                      class="h-8 md:h-10 px-4 md:px-5 border-2 border-gray-200 hover:border-primary/20 hover:bg-primary/20 rounded-lg text-gray-500 font-bold text-base lg:text-lg"
                    >
                      <i class="fa-regular fa-thumbs-up"></i>
                    </button>
                    <button
                      id="adopt-${pet.petId}"
                      onclick="adoptPet('${pet.petId}')"
                      class="h-8 md:h-10 px-4 md:px-5 border-2 border-gray-200 hover:border-primary/20 hover:bg-primary/20 rounded-lg text-primary font-bold text-base lg:text-lg"
                    >
                      Adopt
                    </button>
                    <button
                      onclick="showPetDetails('${pet.petId}')"
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

//  like pets

likedPets.classList.remove('grid');
const handleLikeBtn = (imgLink) =>{
  // const likedPets = document.getElementById('liked-pets-container');
  const noPetsLikedMgs = document.getElementById('no-pets-mgs');
  noPetsLikedMgs.classList.add('hidden');
  likedPets.classList.add('grid');
  const div = document.createElement('div');
  div.innerHTML = `
        <img
      class="w-full h-32 object-cover rounded-lg"
      src="${imgLink}"
      alt="pet images"
    />
  `;
  likedPets.appendChild(div);

};

// short by pet price
const sortPetsByPrice = async (category)=>{
  handleSpinner();
  

  // fetch the data
  const res = await fetch(`https://openapi.programming-hero.com/api/peddy/${category ? 'category/' + category : 'pets'}`);
  const data = await res.json();
  const pets =  category ? data.data : data.pets;
  console.log(pets);

  // sorted pet
  let sortedPets = [...pets].sort((a,b)=> b.price - a.price);

  displayPets(sortedPets);
  console.log(category);
  


}

// sort button features
sortBtn.onclick = () => sortPetsByPrice();

//  pet adoption 
const adoptPet = (id)=>{
    const petBtn = document.getElementById(`adopt-${id}`);
    const myAdoptModal = document.getElementById('my_modal_2');
    const adoptTimeEl = document.getElementById('adopt-time');
    let countTime = 3;
    adoptTimeEl.innerHTML = countTime;
    const inerval = setInterval(() => {
        countTime--;
        adoptTimeEl.innerText = countTime;

        if(countTime === 1){
          setTimeout(() => {
            clearInterval(inerval);
            myAdoptModal.close();
            petBtn.innerText = "Adopted";
            petBtn.setAttribute('disabled',true);
            petBtn.classList.add('!bg-gray-300','!text-gray-500','!hover:bg-tranparent' ,'!border-0')
          }, 500);
        }
    }, 1000);

    // show modal 
    myAdoptModal.showModal();

    setTimeout(() => {
      if(countTime > 1){
        clearInterval(inerval);
        myAdoptModal.close();
        petBtn.innerText = 'Adopted';
        petBtn.setAttribute('disabled',true);
      }
    }, 3000);

}

// load the pets info by id
const showPetDetails = async (id) =>{
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
  const data = await response.json();
  displayPetDetails(data.petData);
};

// display the pet information

const displayPetDetails = (pet)=>{
  const detailsContainer = document.getElementById('details-container');
  const {breed,category,date_of_birth,price,image,gender,pet_name,pet_details,vaccinated_status} = pet;
  detailsContainer.innerHTML = `
          <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box max-w-[700px] p-6 md:p-8 rounded-xl">
            <img
              class="w-full object-cover h-[320px] rounded-lg mb-5 md:mb-6"
              src="${image}"
              alt="${pet_name} picture"
            />
            <div>
              <!-- pet information -->
              <div>
                <h3
                  class="mb-3 md:mb-4 text-xl md:text-2xl font-bold text-secondary"
                >
                  ${pet_name}
                </h3>
                <div class="space-y-2 pb-4 mb-4 border-b">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 justify-between w-3/4">
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/breed.png" alt="breed icon" />
                      <p>Breed: ${breed ? breed : 'Unknown'}</p>
                    </span>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/birth.png" alt="birth icon" />
                      <p>Birth: ${date_of_birth ? date_of_birth : "Unknown"}</p>
                    </span>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 justify-between w-3/4">
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/gender.png" alt="breed icon" />
                      <p>Gender: ${gender ? gender : "Uknown"}</p>
                    </span>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/price.png" alt="breed icon" />
                      <p>Price: ${price ? price+'$' : 'Unknown'}</p>
                    </span> 
                  </div>
                  <div>
                    <span class="flex gap-2 text-base text-secondary/70">
                      <img src="./asstets/icons/gender.png" alt="breed icon" />
                      <p>Vaccinated status: ${vaccinated_status ? vaccinated_status : "Unknown"}</p>
                    </span>
                  </div>
                </div>
              </div>
              <!-- details informaion -->
              <div>
                <h2 class="text-base font-semibold mb-3 text-secondary">Details Information</h2>
                <p class="text-base text-secondary/70 mb-2">Learn more about each pet's unique characteristics, including their activities and information.</p>
                <ul class="list-disc list-inside text-base text-secondary/70">
                  <li class="pl-3">${pet_details}</li>
                </ul>
              </div>
            </div>
            <div class="modal-action w-ful block">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="h-10 md:h-12 w-full text-lg md:text-xl text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
  `;
  my_modal_5.showModal();
}



const resetActiveBtn = () =>{
  const buttons = document.querySelectorAll('#category-menu-container button');
  buttons.forEach((btn)=>{
    btn.classList.remove('border-primary','bg-primary/10','!rounded-full');
  })
}

// loadCategories pets
const loadCategoriesPets = async (category_name)=>{
  handleSpinner();
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
  activeBtn.classList.add('!rounded-full','border-primary','bg-primary/10');
  


  displayPets(data.data);
  
  // short when clicking categories
  sortBtn.onclick = ()=>  sortPetsByPrice(category_name.toLowerCase());

}





loadCategories();
loadPets();