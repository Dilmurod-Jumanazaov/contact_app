const elForm = document.querySelector(".js-contact-form");
const elFormNameINput = document.querySelector(".js-name-input");
const elFormPhoneInput = document.querySelector(".js-phone-input");
const elFormSelect = document.querySelector(".js-form-select");
const elBtnGroup = document.querySelectorAll(".hero__btn");
const elAllBtnCount = document.querySelector(".js-all-btn-count");
const elFamilyBtnCount = document.querySelector(".js-family-btn-count");
const elWorkBtnCount = document.querySelector(".js-work-btn-count");
const elFriendsBtnCount = document.querySelector(".js-friends-btn-count");
const elSortBtn = document.querySelectorAll(".hero__sort-btn");
const elList = document.querySelector(".js-hero-list");
const userContactArr = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  
  const nameInputValue = elFormNameINput.value.trim();
  const phoneInputValue = elFormPhoneInput.value.trim();
  
  userContactArr.push({
    id: userContactArr.length ? userContactArr.at(-1).id + 1 : 1,
    name: nameInputValue,
    phone: phoneInputValue,
    user_choose: elFormSelect.value,
  });
  
  renderUserContact(userContactArr,elList);
});

function renderUserContact(array,dynamicNode) {
  dynamicNode.innerHTML = "";
  
  elAllBtnCount.textContent = userContactArr.length;
  elFamilyBtnCount.textContent = userContactArr.filter((item) => item.user_choose == "Family").length;
  elWorkBtnCount.textContent = userContactArr.filter((item) => item.user_choose == "Work").length;
  elFriendsBtnCount.textContent = userContactArr.filter((item) => item.user_choose == "Friends").length;
  
  array.forEach(element => {
    
    const newItem = document.createElement("li");
    const newItemInfoBox = document.createElement("div");
    const newUsername = document.createElement("p");
    const newPhoneBox = document.createElement("div");
    const newPhoneText = document.createElement("span");
    const newUserphone = document.createElement("a");
    const newUserchoose = document.createElement("p");
    const newDeleteBtn = document.createElement("button");
    
    newItem.classList.add("hero__list-item");
    newUsername.classList.add("hero__item-name");
    newPhoneBox.classList.add("d-flex","align-items-center","gap-2");
    newPhoneText.classList.add("hero__item-phone-text");
    newUserphone.classList.add("hero__item-phone-link");
    newUserchoose.classList.add("hero__item-choose");
    newDeleteBtn.classList.add("hero__item-delete-btn");
    
    newUsername.textContent = `Name: ${element.name}`;
    newPhoneText.textContent = "Phone:"
    newUserphone.textContent = element.phone;
    newUserphone.href = `tel:${element.phone}`;
    newUserchoose.textContent = `Choose: ${element.user_choose}`;
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.dataset.id = element.id;
    
    newPhoneBox.append(newPhoneText,newUserphone);
    newItemInfoBox.append(newUsername,newPhoneBox,newUserchoose);
    newItem.append(newItemInfoBox,newDeleteBtn);
    dynamicNode.appendChild(newItem);
  });
};

elList.addEventListener("click", (evt) => {
  const deletedItemId = evt.target.dataset.id;
  const deletedItem = userContactArr.findIndex((item) => item.id == deletedItemId);
  userContactArr.splice(deletedItem,1);
  renderUserContact(userContactArr,elList);
});

elBtnGroup[0].addEventListener("click", () => {
  elBtnGroup[0].classList.add("btn-active");
  elBtnGroup[1].classList.remove("btn-active");
  elBtnGroup[2].classList.remove("btn-active");
  elBtnGroup[3].classList.remove("btn-active");

  renderUserContact(userContactArr,elList);
});
elBtnGroup[1].addEventListener("click", (evt) => {
  elBtnGroup[1].classList.add("btn-active");
  elBtnGroup[0].classList.remove("btn-active");
  elBtnGroup[2].classList.remove("btn-active");
  elBtnGroup[3].classList.remove("btn-active");

  const filteredArr = userContactArr.filter((item) => item.user_choose == "Family");
  renderUserContact(filteredArr,elList);
});
elBtnGroup[2].addEventListener("click", () => {
  elBtnGroup[2].classList.add("btn-active");
  elBtnGroup[0].classList.remove("btn-active");
  elBtnGroup[1].classList.remove("btn-active");
  elBtnGroup[3].classList.remove("btn-active");
  const filteredArr = userContactArr.filter((item) => item.user_choose == "Work");
  renderUserContact(filteredArr,elList);
});
elBtnGroup[3].addEventListener("click", () => {
  elBtnGroup[3].classList.add("btn-active");
  elBtnGroup[0].classList.remove("btn-active");
  elBtnGroup[1].classList.remove("btn-active");
  elBtnGroup[2].classList.remove("btn-active");

  const filteredArr = userContactArr.filter((item) => item.user_choose == "Friends");
  renderUserContact(filteredArr,elList);
});

elSortBtn[0].addEventListener("click", (evt) => {
  const sortedArr = userContactArr;
  sortedArr.sort((a,b) => {
    return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0);
  })
  renderUserContact(sortedArr,elList);
});
elSortBtn[1].addEventListener("click", () => {
  const sortedArr = userContactArr.sort((a,b) => {
    return b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0);
  });
  renderUserContact(sortedArr,elList);
});


