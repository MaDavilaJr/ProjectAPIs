var gamertag = "Darkstar+Dazed"
var server = "Midgardsormr"






// replace name with search function

fetch("https://xivapi.com/character/search?name=" + gamertag + "&server=" + server)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.Results[0].ID);

        var id = data.Results[0].ID


        // grab class using lodestone ID 

        fetch("https://xivapi.com/character/" + id)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data.Character.ActiveClassJob.Name);
            });
    });





// dropdown for servers list