

const button = document.querySelector("button");
const locationdetail= document.querySelector("#location-details");

button.addEventListener("click" , ()=>{
    // console.log(navigator.geolocation);

    if(navigator.geolocation){
        locationdetail.innerText = "allow to detect location"
        navigator.geolocation.getCurrentPosition(onSuccess ,onError);

    }
    else{
        button.innerText = "Your Browser is Not Support"
    }
});

function onSuccess(position){
    locationdetail.innerText = "detecting your location"
    let {latitude , longitude} = position.coords;
    // console.log(latitude,longitude);
    let apikey = "f5b3cdd881364b028acfd04a7584f22f"
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
    .then(response => response.json()).then(result =>{
        let allDetails = result.results[0].components;
        let {county, postcode, country, state} = allDetails;
        // console.log(county, postcode, country);
        locationdetail.innerText = `${county} ${postcode},${state} , ${country} `
        console.table(allDetails);
    }).catch(() => {
        locationdetail.innerText = "Somthing went wrong"
    })
}

function  onError(error){
    if(error.code == 1){
        button.innerText = "You define the request"
    }
    else if(error.code == 2){
        button.innerText = "Location not available"
    }
    else{
        button.innerText = "somthings went wrong"
    }
    button.setAttribute("disabled" , "true")
}