function Cards() {

    this.shuffleCards = function (nbSets) {
        var cards = [], i, j, temp;
        for (i = 0; i < 4 * 13; ++i) {
            cards.push(i);
        }
        // Fisher-Yates shuffle algorithm
        for (i = cards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = cards[i];
            cards[i] = cards[j];
            cards[j] = temp;
        }
        var sets = [];
        var nbPerSet = Math.floor(cards.length / nbSets);
        //Remaining cards are appended too
        for (i = 0; i <= nbSets; ++i) {
            sets.push(cards.slice(i * nbPerSet, (i + 1) * nbPerSet).sort());
        }
        return sets;
    };

    function suitAndRank(cardId) {
        var suit = ['hearts', 'diams', 'clubs', 'spades'][Math.floor(cardId / 13)];
        var rank = cardId % 13 + 1;
        if(rank == 1) {
            rank = 'a';
        } else if(rank > 10) {
            rank = ['j', 'q', 'k'][rank - 11];
        }

        return {suit: suit, rank: rank};
    }

    this.drawCard = function(cardId) {
        var card = suitAndRank(cardId);
        var line =
            '<a class="card rank-' + card.rank + ' ' + card.suit + ' ">' +
                '<span class="rank">' + card.rank + '</span>' +
                '<span class="suit">&' + card.suit + ';</span>' +
            '</a>';
        return line;
    };

};