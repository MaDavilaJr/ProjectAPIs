// add event listener to enter own gamertag and server info 
var characterInput = document.getElementById("cname");
var serverInput = document.getElementById("server");
var button = document.querySelector("#myBtn")





// split() join() to replace spaces with '+' and trim()
function formatString(str) {
    var replaced = str.split(' ').join('+').trim();
    return replaced
}

// dropdown for servers list


var characterClass;

function runAPIs(event) {

    event.preventDefault();
    var gamertag = formatString(characterInput.value);
    var server = formatString(serverInput.value);
    console.log(gamertag, server)



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
                    characterClass = data.Character.ActiveClassJob.UnlockedState.Name;
                    console.log(data)
                    getToken();
                });




            // add code to make this display on screen so user has visual representation of active class job for playlist


        });

    // getToken()

    function getToken() {
        var queryURL = "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token";
        var clientID = "4059ca1ddef943c8a22d75be1a606ec0";
        var clientSecret = "8948c8a301794e40b6745b96d45e495e";

        $.ajax({
            crossDomain: true,
            headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": "Basic " + btoa(clientID + ":" + clientSecret) },
            url: queryURL,
            method: "POST",
            data: { "grant_type": "client_credentials" }
        }).then(function(response) {
            console.log(response)
            localStorage.setItem("token", response.access_token)
                // localStorage.setItem("token-time", moment().format("HH:mm"))

            // add array of tanks, dps, and healers => if array , then play playlist 

            var playlistId;
            var characters = [

                {
                    id: "6eKyKActXCC461qnxgmzPD",
                    chars: ["Paladin", "Gladiator", "Warrior", "Marauder", "Dark Knight", "Gunbreaker"]
                },

                {
                    id: "1yE6nAgAtmm3W7mciZ8dZW",
                    chars: ["Pugilist", "Monk", "Lancer", "Dragoon", "Rogue", "Ninja", "Samurai"]
                },

                {
                    id: "5vHLUsARW8qbh3uNQfJPTn",
                    chars: ["Archer", "Bard", "Machinist", "Dancer", "Thaumaturge", "Black Mage", "Arcanist", "Summoner", "Red Mage", "Blue Mage"]
                },

                {
                    id: "56kF0kPVkIXb8T7LIf3kbg",
                    chars: ["Conjurer", "White Mage", "Scholar", "Astrologian"]
                }

            ]

            // var charindex;
            console.log(characterClass)
            for (var i = 0; i < characters.length; i++) {
                if (characters[i].chars.indexOf(characterClass) !== -1) {
                    playlistId = characters[i].id;
                }
            }

            console.log(playlistId)

            // playlistId = characters[charindex].id

            $.ajax({
                crossDomain: true,
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + response.access_token },
                url: 'https://api.spotify.com/v1/playlists/' + playlistId,
                method: "GET",

            }).then(function(response2) {
                console.log("Uwu")
                console.log(response2)
                var playlistEl = document.querySelector("#playlist")
                var url = "https://open.spotify.com/embed/playlist/" + playlistId
                console.log(url)
                playlistEl.setAttribute("src", url)
                    // localStorage.setItem("token", response.access_token)
                    // localStorage.setItem("token-time", moment().format("HH:mm"))
            });
        });
    };

    //access_token
    var token = localStorage.getItem("token")

}

button.addEventListener("click", runAPIs);