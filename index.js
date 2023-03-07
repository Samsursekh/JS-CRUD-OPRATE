const container = document.getElementById("container");
let allData = [];
const getDataFunction = (allData) => {
    fetch(`https://cars-mock-api-wjnb.onrender.com/cars`).then((res) => {
        const data = res.json();
        data.then((result) => {
            allData = result;
            displayFunction(allData);
        })
    }).catch((err) => {
        console.log(err);
    })
}





//Whishlist Item data fetching

const displayFunction = (allData) => {
    console.log(allData ,"Pristha 16");
    container.innerHTML = "";
console.log(allData);
  allData && allData.forEach(element => {
     const cards = document.createElement("div");
     cards.setAttribute("class", "cards");

     const image = document.createElement("img");
     image.setAttribute("class", "image");
     image.src = element.image;

     const brand = document.createElement("h3");
     brand.setAttribute("class", "brand");
     brand.innerText ="Brand : "+ element.brand;

     const price = document.createElement("h3");
     price.setAttribute("class", "price");
     price.innerText ="Price : "+ element.Price;

     const description = document.createElement("p");
     description.setAttribute("class", "description");
     description.innerText ="Description : "+ element.Description;

     const kms = document.createElement("p");
     kms.setAttribute("class", "kms");
     kms.innerText ="KMS : "+ element.kms;

     const type = document.createElement("h3");
     type.setAttribute("class", "type");
     type.innerText ="Type : "+ element.type;

     const year = document.createElement("h3");
     year.setAttribute("class", "year");
     year.innerText ="Year : "+ element.year;

     const deleteBtn = document.createElement("button");
     deleteBtn.innerText = "DELETE";
     deleteBtn.classList.add("deleteBtn");
     deleteBtn.addEventListener("click", () => {
        deleteCarFunction(element.id)
     })

     const editBtn = document.createElement("button");
     editBtn.innerText = "EDIT";
     editBtn.classList.add("editBtn");
     editBtn.addEventListener("click", () => {
       editCarFunction(element, element.id);
     })

     const heartIcon = document.createElement("span");
     heartIcon.innerHTML = "&#10084";
     heartIcon.classList.add("heartIcon");
     heartIcon.style.cursor = "pointer"
     heartIcon.addEventListener("click", ()=>{
        heartIconFunction(element.id, element);
     })

     cards.append(image,brand,price,description, kms, type,year,deleteBtn,editBtn,heartIcon) 
     container.append(cards);
  });
}


const deleteCarFunction = async(deleteItem) => {
    console.log(deleteItem);
   const data =await fetch(`https://cars-mock-api-wjnb.onrender.com/cars/${deleteItem}`, {
        method : "DELETE",
        headers : {"Content-Type" : "application/json" },
    })
  const response = await data.json();
  console.log(response, "response");
  alert("Car Deleted Successfully !")
  getDataFunction(allData);
  displayFunction(allData);
}

const editCarFunction = (editITem, editID) => {
//   console.log(editITem, editID);
 const modal = document.createElement("div");
 modal.classList.add("modal");
 modal.style.display = "block";

 const modalContent = document.createElement("div");
 modalContent.classList.add("modal-content");

 const EditForm = document.createElement("form");
 EditForm.addEventListener("submit", async(event) => {
     event.preventDefault();

    const response = await fetch(`https://cars-mock-api-wjnb.onrender.com/cars/${editID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({brand: inputTagOFBrand.value, Price: inputTagOFPrice.value})
    })
    const data = await response.json();
    console.log(inputTagOFBrand.value, "Edit Item is getting or not");
    console.log(inputTagOFPrice.value, "Edit Item is getting or not");
    alert("Car Updated Successfully !")
    getDataFunction(allData);
    displayFunction(allData);
 })
 const inputTagOFBrand = document.createElement("input");
 inputTagOFBrand.classList.add("inputTagOFBrand");
 inputTagOFBrand.setAttribute("placeholder", "Update Car Brand");
 inputTagOFBrand.setAttribute("type", "text");
 inputTagOFBrand.setAttribute("value", editITem.brand); 

 const inputTagOFPrice = document.createElement("input");
 inputTagOFPrice.classList.add("inputTagOFPrice");
 inputTagOFPrice.setAttribute("placeholder", "Update Car Price");
 inputTagOFPrice.setAttribute("type", "number");
 inputTagOFPrice.setAttribute("value", editITem.Price); 
 
 const EditCarSubmitBtn = document.createElement("input");
 EditCarSubmitBtn.classList.add("EditCarSubmitBtn");
 EditCarSubmitBtn.setAttribute("type", "submit"); 
 EditCarSubmitBtn.setAttribute("value", "EDIT SUBMIT"); 

EditForm.append(inputTagOFBrand, inputTagOFPrice, EditCarSubmitBtn)
 modalContent.append(EditForm);
 modal.append(modalContent);
 container.append(modal);



 window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

const heartIconFunction = async(heartITemID, heartITem) => {
    alert(heartITemID);

    //Whishlist Item data fetching

//   console.log(allData, "All Data i getting of not ");
//  console.log(heartITem, "HEART ITEM.....");
    // if(heartITemID === )
    if(!true){
    alert("Item Already Exist");
    }
   else{
    const response = await fetch(`https://cars-mock-api-wjnb.onrender.com/wishlisted_cars`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(heartITem)
    })
    const data = await response.json();
   console.log(data, "HEART ITEM");
   alert("Item Added to Wishlist")
   }
}


getDataFunction(allData);