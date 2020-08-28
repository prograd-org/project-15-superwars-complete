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
        this.id = id;
        this.name = name;
        this.image = "images/super-" + (id + 1) + ".png";
        this.strength = this.getRandomStrength();
        this.type = type;
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
        player.classList.add('player');
        player.setAttribute('data-id', this.id);
        if (this.selected == true)
            player.classList.add('selected');
        let image = document.createElement('img');
        image.setAttribute('src', this.image);
        let name = document.createElement('div');
        name.textContent = this.name;
        let strength = document.createElement('div');
        strength.textContent = this.strength;
        strength.className = 'strength';
        player.append(image, name, strength);
        return player;
    }
}

// Superwar Class
class Superwar {
    constructor(players) {
        this.players = players.map((player, i) => {
            let type = (i % 2 == 0) ? 'hero' : 'villain';
            return new Player(i, player, type);
        });
        this.score = [0, 0];
        Array.from(document.getElementsByClassName('team'))
            .forEach(elem => elem
                .addEventListener('click', (e) => {
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
        let heroStrength = false
        let villainStrength = false

        // checke if the hero and villain are available of strength more than 0
        this.players.forEach(player => {
            if (player.type == "hero" && player.strength > 0) heroStrength = true;
            else if (player.type == "villain" && player.strength > 0) villainStrength = true;
        })
        // if hero and villain of strengh greater than 0 are present then retuns clash 
        if (heroStrength && villainStrength) return "clash"
        return "peace"
        // return  'clash' or 'peace';
    }

    // Fight
    fight = () => {
        // Filtered the selected players and calculate score
        // Should return HTML element with score
        // Type your code here

        // filtering the players whose selected property is true
        let playersFiltered = this.players.filter(player => {
            if (player.selected) return true
            return false
        });

        // getting the scores of filtered players
        let score = this.calculateScore(playersFiltered)

        // displaying the scores in the html div tag
        let divElement = document.getElementById("score")
        divElement.innerHTML = `${score.hero} - ${score.villian}`

        if (this.checkWin() !== 'endure')
            setTimeout(() => this.announceWinner(score), 100);

        return divElement
    }

    // Calculate score
    calculateScore = () => {
        // Calculate and return the total score of teams
        // Type your code here

        let score = {
            "hero": 0,
            "villian": 0
        }
        // calculating score for heros and villians
        let types = ["hero", "villain"]
        types.forEach(playerType => {
            score[playerType] = this.players.filter(player => {
                if (player.type == playerType) return true
            }).reduce((acc, player) => {
                return acc += player.wins
            }, 0)
        })

        return score;
    }

    // Check whether there is a win
    checkWin = () => {
        // Find the winner if exists return type hero or villain
        // If winner dosen't exists then return endure
        // Type your code here

        const score = this.calculateScore()

        // returning hero if score of hero is greater han villan or if villians score is zero.
        // returns villian if score of villian is greater than hero and returns endure if scoreas are equal
        return score.hero > score.villian ? "hero" :
            score.hero < score.villian ? "villian" :
            score.villian == 0 ? "hero" :
            "endure";
    }

    // Find total strength of a team
    totalStrength = (type) => {
        // Calculate and return the total strength of the team
        // Type your code 

        // adds the strength of all players
        let strength = this.players.reduce((acc, player) => {
            if (player.type == type) {
                return acc += player.strength
            }
            return acc += 0
        }, 0)

        return strength;
    }

    // Announce the winner
    announceWinner = (score) => {
        if (score['hero'] == score['villain'])
            alert('Its a draw!');
        else if (score['hero'] > score['villain'])
            alert('Heroes Win!');
        else
            alert('Villains Win!');
        location.reload();
    }
}


window.onload = () => {
    const superwar = new Superwar(PLAYERS);
    superwar.viewPlayers();
}