new PlayerService('http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json', ready)


function ready(dataStore) {

  var roster = $('#roster');

  var players = dataStore.getAllPlayers();

  var homeTeam = [];

  //   $('#addPlayerBtn').on('click', function(event){   //populate function/ searching by whatever value

  //   })

  $('.clear-filter-button').on('click', function () {  //reset
    $('#query').val('')
    players = dataStore.getAllPlayers()
    update();


  })

  $('form').on('submit', function (e) {
    e.preventDefault()
    var query = $('#query').val()
    players = dataStore.getPlayersBySomeValue(query)
    update();
  })



  function update() {
    roster.empty()
    roster.append('<h3>Showing ' + players.length + ' Active Players</h3>')// append glue to back of roster

    players.forEach(function (player) {
      var template = '<div class="player-card"><img src="' + player.photo + '" width="80"/>' + player.fullname + '<button id="' + player.fullname + '" class="btn">Draft Player</button></div>'    //populating the player card
      
      roster.append(template);
    })

  }

  $("#roster").on("click", ".btn", function () {
    var name = this.id
    players.forEach(function (player){

      if (player.fullname === name){
        homeTeam.push(player);
      }
    })

    players.splice(this.id, 1);


  })


  update();

}























