const LoadPhone=async(SearchText)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${SearchText}`
    const res=await fetch(url)
    const data= await res.json();
    DisplayPhone(data.data)
}

const DisplayPhone=phones=>{
    // console.log(phone)
    const PhonesContainer=document.getElementById('Phone_Container');
    PhonesContainer.innerText='';
     //Display 20 Phones only
    phones=phones.slice(0,20);

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
                    </div>
        </div>
        `

        PhonesContainer.appendChild(PhoneDiv)
        togglerSpinner(false);
    })
    
}
//LoadPhone();



// Search Button Work Start
document.getElementById('btn_search').addEventListener('click',()=>{
    togglerSpinner(true);
   // console.log("Search Button worked")
   const SearchField=document.getElementById('searchfieldid');
   const SearchText=SearchField.value;
   LoadPhone(SearchText);
   console.log(SearchText);
   //Spinner.classList.remove('d-none')
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