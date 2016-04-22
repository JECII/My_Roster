
function PlayerService(url, callBack) {

    var playerData = []

    this.getAllPlayers = function () { // this is used so that this can be retrieved
        return playerData;
    }

    this.getPlayersBySomeValue = function (value) {   //BySome makes any identifier useable

        var team = [];
        for (var i = 0; i < playerData.lenght; i++) {
            var currentPlayer = playerData[i];
            var hasValue = false;
            for (var prop in currentPlayer) {
                if (typeof currentPlayer[prop] === 'string' && currentPlayer[prop].toLowerCase() === value) { //string&& toLowerCase is strictly for the ability to pull out var cases
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
        var BCWServer = "http://bcw-getter.herokuapp.com/?url=";
        var modifiedUrl = BCWServer + encodeURIComponent(url);

        $.get(modifiedUrl, function (response) {
            var data = JSON.parse(response)
            playerData = data.body.players.filter(function (player) {
                if (player.pro_status === 'A') {
                    return player;
                }
            })
            callBack(this)
        })

    }

    goGetData()

}










