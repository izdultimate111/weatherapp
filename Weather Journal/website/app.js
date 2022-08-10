/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="; 
const apiKey = "&appid=3b2fcdf062a49cb106890cdceadf4e47&units=imperial";

//DOM Manipulation to select each IDs
const zipcode = document.querySelector("#zip");
const button = document.querySelector("#generate");
const feeling = document.querySelector("#feeling");
const temp = document.querySelector("#temp");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const dateN = document.querySelector("#date");
const d = new Date();
const date = d.toDateString();
const example = "api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";

/* Function called by event listener */
button.addEventListener("click", (event)=>{
    event.preventDefault();
    const madeURI = `${baseURL}${zipcode.value}${apiKey}`
    getData(madeURI) 
    .then((data)=>{
        cureData(data)
        .then((infomation)=>{
            postData("/add", infomation)
            .then((data)=>{
                retrieveData("/all")
                .then((data) =>{
                    undateUI(data);
                })
            })
        });
    }); 
});

/* Function to GET Web API Data*/
const getData = async (url) => {
    try{
        const result = await fetch(url);
        const data = await result.json(); 
        if(data.cod === 200){
            // console.log(data);
            return data;
        }else {
            console.log(data.message);
           return data;
        }
    }catch(e) {
        console.log(e);
    }
}
/* Function to CURE Web API Data*/
//Here we filter out the info that is needed according to the Rubic
const cureData = async (data) => {
    try{
        if(data.message){
            return data;
        }else{
        const nInfo = {
            date,
            feeling: feelings.value,
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country
        };
        
        return nInfo;
    }
    }catch(err){
        console.error(err);
    }
};
/* Function to POST data */
const postData= async(url="", data={})=>{
    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    try{
            const res = await result.json();
            return res;
    }catch(err){
        console.error(err);
    }
};
/* Function to GET Project Data */
const retrieveData = async(url) =>{
    const data = await fetch(url); 
    try{
        const res = await data.json();
            // console.log(res);
        return res;
    }catch(err){
        console.error(err);
    }
}
//Here we are writing the updated data back to our Website with some DOM manipulation
const undateUI = async (data)=>{
    const res = await data;
    if(res.date){
        document.querySelector(".entryHolder").style.display = "block";
      
     
        dateN.innerHTML = res.date;
        city.innerHTML = res.city + ",";
        country.innerHTML = res.country + "A.";
        temp.innerHTML = res.temp + "°F";
        feeling.innerHTML = res.feeling? res.feeling:"How are you feeling??";
    
        document.querySelector("#error").style.display = "none";
    }else{
        // document.querySelector("#entryHolder").style.display = "none";
        // entryHolder.classList.remove('hidden');
        document.querySelector(".hidden").style.display = "block";
        document.querySelector("#error").style.display = "block";

            document.querySelector("#error").innerHTML = res.message;
            
    }
}









