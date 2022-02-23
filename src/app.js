const PLAYERS = [
    "Spiderman",
    "Captain America",
    "Wonderwoman",
    "Popcorn",
    "Gemwoman",
    "Bolt",
    "Antwoman",
    "Mask",
    "Tiger",
    "Captain",
    "Catwoman",
    "Fish",
    "Hulk",
    "Ninja",
    "Black Cat",
    "Volverine",
    "Thor",
    "Slayer",
    "Vader",
    "Slingo"
];

// Player Class
class Player {
    constructor(id, name, type) {
@@ -32,12 +31,10 @@ class Player {
        this.selected = false;
        this.wins = 0;
    }

    // Get random strength
    getRandomStrength = () => {
        return Math.ceil(Math.random() * 100);
    }

    // Create a player for displaying
    view = () => {
        let player = document.createElement('div');
@@ -56,7 +53,6 @@ class Player {
        return player;
    }
}

// Superwar Class
class Superwar {
    constructor(players) {
@@ -71,58 +67,52 @@ class Superwar {
                    this.handleSelection(e.target);
                }));
    }

    // Display players in HTML
    viewPlayers = () => {
        let team = document.getElementById('heroes');
        team.innerHTML = '';
        let fragment =
            this.buildPlayers('hero');
        team.append(fragment);

        team = document.getElementById('villains');
        team.innerHTML = '';
        fragment =
            this.buildPlayers('villain');
        team.append(fragment);
    }

    // Build players fragment 
    buildPlayers = (type) => {
        let fragment = document.createDocumentFragment();
        this.filterPlayers(type)
            .forEach(player => fragment.append(player.view()));
        return fragment;
    }

    // Filter Players based on type
    filterPlayers = (type) => {
        return this.players.filter(player => player.type == type);
    }

    // Handle player clicks
    handleSelection = (target) => {
        if (!target.classList.contains('player'))
            target = target.parentNode;
        if (!target.hasAttribute('data-id'))
            return;

        let selectedId = target.getAttribute('data-id');
        let selectedPlayer = this.players[selectedId];
        this.players.filter(player => player.type == selectedPlayer.type)
            .forEach(player => player.selected = false);
        selectedPlayer.selected = true;

        if (this.isFight() === 'clash')
            this.fight();
        else
            this.viewPlayers();
    }

    // Check for fight
    isFight = () => {
        // Type your code here

        return (this.players.filter(player => player.selected &&
            player.strength > 0).length == 2) ? 'clash' : 'peace';
        // return  'clash' or 'peace';
    }

@@ -132,15 +122,35 @@ class Superwar {
        // Should return HTML element with score
        // Type your code here

        let fighters = this.players.filter(player => player.selected);
        let resultStrength = Math.min(...fighters.map(p => p.strength));
        fighters
            .forEach(player => {
                player.selected = false;
                player.strength -= resultStrength;
                if (player.strength > 0)
                    player.wins += 1;
            });
        let score = this.calculateScore();
        document.getElementById('score').innerHTML =
            score['hero'] + ' - ' + score['villain'];
        this.viewPlayers();
        if (this.checkWin() !== 'endure')
            setTimeout(() => this.announceWinner(score), 100);
    }

    // Calculate score
    calculateScore = () => {
        // Calculate and return the total score of teams
        // Type your code here

        let score = this.players
            .reduce((score, player) => {
                score[player.type] += player.wins;
                return score;
            }, {
                'hero': 0,
                'villain': 0
            });
        return score;
    }

@@ -150,7 +160,12 @@ class Superwar {
        // If winner dosen't exists then return endure
        // Type your code here

      return result;
        return result;
        let heroStrength = this.totalStrength('hero');
        let villainStrength = this.totalStrength('villain')
        return heroStrength == 0 ? 'villain' : villainStrength == 0 ?
            'hero' : 'villain';
        //return result;
    }

    // Find total strength of a team
@@ -159,6 +174,11 @@ class Superwar {
        // Type your code here

        return strength;
        return this.players
            .filter(player => player.type == type)
            .reduce((totalStrength, player) =>
                totalStrength + player.strength, 0)
        // return strength;
    }

    // Announce the winner
@@ -172,8 +192,6 @@ class Superwar {
        location.reload();
    }
}


window.onload = () => {
    const superwar = new Superwar(PLAYERS);
    superwar.viewPlayers();
}
