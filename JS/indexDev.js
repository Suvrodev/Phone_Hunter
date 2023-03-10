const ShowALL= document.getElementById('showallbtn');

const LoadPhone=async(SearchText,DataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${SearchText}`
    const res=await fetch(url)
    const data= await res.json();
    DisplayPhone(data.data,DataLimit)
}

const DisplayPhone=(phones,DataLimit)=>{
    // console.log(phone)
    const PhonesContainer=document.getElementById('Phone_Container');
    PhonesContainer.innerText='';
     //Display 10 Phones only
     if(DataLimit && phones.length>10){
        phones=phones.slice(0,10);
        ShowALL.classList.remove('d-none');
     }else{
        ShowALL.classList.add('d-none');
     }
  

    ////Display No Phones found
    const NoPhone=document.getElementById('no_phone');
    if(phones.length===0){
        NoPhone.classList.remove('d-none');
        togglerSpinner(false);
    }else{
        NoPhone.classList.add('d-none');
    }

    ///Display All Phones
    phones.forEach(phone=>{

       
        const PhoneDiv= document.createElement('div');
        PhoneDiv.classList.add('col');
        PhoneDiv.innerHTML=`
        <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <button onclick="LoadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>

                    </div>
        </div>
        `

        PhonesContainer.appendChild(PhoneDiv)
        togglerSpinner(false);
    })
    
}
//LoadPhone();

const LoadPhoneDetails= async id=>{
    const url=` https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    console.log(data.data);
    DisplayPhoneDetails(data.data)
}

const DisplayPhoneDetails=data=>{
    console.log(data)
    const modalTitle=document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText=data.name;
    const Modal_Detail=document.getElementById('modal_body');
    Modal_Detail.innerHTML=`
     <p>Release Date: ${data.releaseDate? data.releaseDate: "Out of Market"}</p>
     <p>ChipSet: ${data.chipSet? data.chipSet: "Not found Chipset"} </p>
     <p>Memory: ${data.mainFeatures.memory? data.mainFeatures.memory: "No Memory Found"} </p>
     <img src="${data.image}">
    `
}


const ProcessSearch=(DataLimit)=>{
    togglerSpinner(true);
    const SearchField=document.getElementById('searchfieldid');
    const SearchText=SearchField.value;
    LoadPhone(SearchText,DataLimit);
    console.log(SearchText);
}

////Search input field enter key handler
document.getElementById('searchfieldid').addEventListener('keypress',(e)=>{
    if(e.key == 'Enter'){
        ProcessSearch(10);
    }
})

// Search Button Work Start
document.getElementById('btn_search').addEventListener('click',()=>{
   
   // console.log("Search Button worked")
   ProcessSearch(10);

})
//Search Button Work end

const togglerSpinner=isLoading=>{
    const Spinner=document.getElementById('spinnerid');
    if(isLoading){
        Spinner.classList.remove('d-none');
    }else{
        Spinner.classList.add('d-none');
    }
}


///Not the best way tto load show all
const ShowAllButton=document.getElementById('btn_see_all');
ShowAllButton.addEventListener('click',()=>{
    ProcessSearch();
})