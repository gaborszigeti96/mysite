const game = {
    //jelzi, hogy a kör vagy az x jön
    xTurn: true,
    //a lerakott jeleket tárolják
    xState: [],
    oState: [],
    //nyerő kombók
    winningStates: [
        // Sorok
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Oszlopok
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // átló
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

document.addEventListener('click', event => {
    //megnézi hova kattint
    const target = event.target
    //ha a pályára kattint
    const isCell = target.classList.contains('grid-cell')
    //ha nem foglalt még a hely
    const isDisabled = target.classList.contains('disabled')
    //ha a pályán van és nem foglalt
    if (isCell && !isDisabled) {
        //kiszedi a kattintott cella értékét
        const cellValue = target.dataset.value
        // az x turnnek megfelelő tömbbe pusholja az értéket
        game.xTurn === true
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)
        //foglaltá teszi a mezőt és beleteszi a jelet
        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')
        //átadja a kört a másiknak 
        game.xTurn = !game.xTurn
    }
    //megvizsgálja, hogy minden cella foglalt-e, ha igen akkor az döntetlen
    if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
        document.querySelector('.game-over').classList.add('visible')
        document.querySelector('.game-over-text').textContent = 'Draw!'
    }
    //megvizsgálj az összes lehetséges nyerő kombinációt 
    game.winningStates.forEach(winningState => {
        //ha valamelyik tömb tartalmazza a nyerő kombókat az nyer
        const xWins = winningState.every(state => game.xState.includes(state))
        const oWins = winningState.every(state => game.oState.includes(state))
        //ha valaki nyer
        if (xWins || oWins) {
            //minden cellát letilt és láthatóvá teszi a game over szöveget, azzal hogy ki nyert.
            document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
            document.querySelector('.game-over').classList.add('visible')
            document.querySelector('.game-over-text').textContent = xWins
                ? 'X wins!'
                : 'O wins!'
        }
    })
    // a restartra kattintva újra elrejti a gameover szöveget és kitörli a lerakott jeleket.
    document.querySelector('.restart').addEventListener('click', () => {
        document.querySelector('.game-over').classList.remove('visible')
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.classList.remove('disabled', 'x', 'o')
        })
        //alaphelyzetbe állítja a turn-t és törli a tömbök elemeit
        game.xTurn = true
        game.xState = []
        game.oState = []
    })
})

