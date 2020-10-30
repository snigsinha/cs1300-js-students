var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=l8u75fRtJJbxGkshnWWXsmqO_V283NJKDD5do3JtoD0";
var plant_dict = null;

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      console.log(request);
      const data = JSON.parse(request['responseText']);
      const obj_arr = data['data'];
      // console.log(data);

      plant_dict = obj_arr.map(plant => ({name: plant['common_name'], image_url: plant['image_url']}) );


      getFilteredPlants(plant_dict);


    })
);




const getFilteredPlants = () => {
    const main_div = document.getElementById("main");
      // Remove the current gallery div
      let prev_div = document.getElementById("gallery");
      if (typeof(prev_div) != 'undefined' && prev_div != null) {
          prev_div.remove();
      }

      // Add the new gallery div
      let gallery_div = document.createElement("div");
      
      gallery_div.id = "gallery";
      gallery_div.className = "column";
      


      main_div.appendChild(gallery_div);


      //getting currently selected letter
      let select_object = document.getElementById( "form" );
      let curr_letter = select_object.options[select_object.selectedIndex].value;


  

      let curr_plants = plant_dict.filter(plant => plant['name'].charAt(0) === curr_letter);


  
  // Add the filtered images to the HTML page
  for (var i = 0, l = curr_plants.length; i < l; i++) {
    curr_plant = curr_plants[i];
    name = curr_plant['name'];
    image_url = curr_plant['image_url'];


    image = document.createElement("img");
    image.src = image_url;

    caption = document.createElement("label");
    caption.innerHTML = name;
    
    curr_figure = document.createElement("figure");

    curr_figure.appendChild(caption);
    curr_figure.appendChild(image);

    gallery_div.appendChild(curr_figure);

    
}

  
}



