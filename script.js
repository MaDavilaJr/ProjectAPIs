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




        // add code to make this display on screen so user has visual representation of active class job for playlist

        // add array of tanks, dps, and healers > if array = x, then play playlist y 

    });

getToken()


var characterClass = data.Character.ActiveClassJob.Name
var tanks = ["Paladin", "Warrior", "Dark Knight", "Gunbreaker"];
var meleeDps = ["Monk", "Dragoon", "Ninja", "Samurai"];
var rangedDps = ["Bard", "Machinist", "Dancer", "Black Mage", "Summoner", "Red Mage", "Blue Mage"];
var healers = ["White Mage", "Scholar", "Astrologian"];





// dropdown for servers list