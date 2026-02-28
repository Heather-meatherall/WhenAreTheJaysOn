function popup()
{
  var popup = document.getElementById("popupText");
  popup.classList.toggle("show");
}


function editDate(timedate)
{
    let date = new Date(timedate);
    return date.toDateString()
}

function editTime(timedate)
{
    let date = new Date(timedate);
    return `${date.toLocaleTimeString()} EST`;
}

async function playingToday(event)
{
    event.preventDefault();
    console.log("press");
    let url = "http://127.0.0.1:5000/playingToday"
    let game = '';

    try
    {
        await fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            $('#answer').html(data.result);
            if(data.schedule){game = data.schedule[0];}
        })
        .then(() => {
            console.log(game);
            if($('#answer').html() == "Yes! The Jays are playing today!")
            {
                $('#cheer').html("Go Jays Go!");
                $('button').css('background-image','url("./style/img/happyBaseball.png")');
                $('button').css('background-size','75px');
                $('button').css('font-size','0');

                if(game['away_name'] == 'Toronto Blue Jays')
                {
                    $('#game').html(`Blue Jays @ ${game['home_name']}`);
                }
                else
                {
                    $('#game').html(`Blue Jays vs ${game['away_name']}`);
                }
                $('#day').html(editDate(game['game_datetime']));
                $('#time').html(editTime(game['game_datetime']));
                
            }
            else
            {
                $('button').css('background-image','url("./style/img/sadBaseball.png")');
                $('button').css('background-size','75px');
                $('button').css('font-size','0');
            }
           
        })}
        catch(error)
        {
            $('#answer').html("The dome, sorry the server, is closed!");
            $('#error1').html("In the meantime, please vist <a href='https://www.mlb.com/bluejays/schedule/2026-02'>https://www.mlb.com/bluejays/schedule/2026-02</a>")
            $('#cheer').html("Go Jays Go!");
            $('button').css('background-image','url("./style/img/baseball.png")');
        }
}

async function loadGames()
{
    let url = "http://127.0.0.1:5000/loadGames";
    let games = document.getElementById("games")

    try
    {
        await fetch(url)
        .then(response => {return response.json()})
        .then(data => {
            $('#range').html(`${data.start} - ${data.end}`);

            data.schedule.forEach((item) => {
            let game = document.createElement("tr");
            let team = document.createElement("td");
            let day = document.createElement("td");
            let time = document.createElement("td");

            if(item['away_name'] == 'Toronto Blue Jays')
            {
                team.innerText = `Blue Jays @ ${item['home_name']}`
            }
            else
            {
                team.innerText = `Blue Jays vs ${item['away_name']}`
                game.style.backgroundColor = "#80b0d8"
            }

            day.innerText = editDate(item['game_datetime']);
            time.innerText = editTime(item['game_datetime']);

            game.appendChild(team);
            game.appendChild(day);
            game.appendChild(time);
            games.appendChild(game);
        });
        })}
        catch(error)
        {
            $('#range').html("The dome, sorry the server, is closed!");
            $('#error2').html("In the meantime, please vist <a href='https://www.mlb.com/bluejays/schedule/2026-02'>https://www.mlb.com/bluejays/schedule/2026-02</a>")
        }
}




