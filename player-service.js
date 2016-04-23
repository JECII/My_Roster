
function PlayerService(url, callBack) {
    var dataStore = this;
    var playerData = []
   

    this.getAllPlayers = function () { // this is used so that this can be retrieved
        return playerData;
    }

    this.getPlayersBySomeValue = function (value) {   //BySome makes any identifier useable

        var team = [];
        for (var i = 0; i < playerData.length; i++) {

            var currentPlayer = playerData[i];
            var hasValue = false;
            for (var prop in currentPlayer) {
                if (typeof currentPlayer[prop] === 'string' && currentPlayer[prop].toLowerCase() === value.toLowerCase()) { //string&& toLowerCase is strictly for the ability to pull out var cases
                    hasValue = true;
                }
            }
            if (hasValue) {
                team.push(currentPlayer)// gives use the info for team array above-builds team array
            }
        }
        return team;

    }

    function goGetData() {

        playerData = localStorage.getItem('playerData');
        if (playerData) {
            playerData = JSON.parse(playerData)
            return callBack(dataStore);
        }

        var BCWServer = "http://bcw-getter.herokuapp.com/?url=";
        var modifiedUrl = BCWServer + encodeURIComponent(url);

        $.get(modifiedUrl, function (response) {
            var data = JSON.parse(response)
            playerData = data.body.players.filter(function (player) {
                if (player.pro_status === 'A') {
                    return player;
                }
            })
            localStorage.setItem('playerData', JSON.stringify(playerData))
            callBack(dataStore)
        })

    }

    goGetData()

}










