import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'
import { Pressable, View, Text } from "react-native";

// unselect dices after points have been selected, käänteinen true -false?

let board = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 3
const MAX_SPOT = 6
const BONUS_POINTS_LIMIT = 63

export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices.')
    const [gameEndStatus, setGameEndStatus] = useState('')
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(6).fill(false))
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(6).fill(0))
    const [bonusPoints, setBonusPoints] = useState(BONUS_POINTS_LIMIT)

    const getDiceColor = (i) => {
        if (board.every((val, i, arr) => val === arr[0])) {
            return '#db9833'
        } else {
            return selectedDices[i] ? 'black' : '#db9833'
        }
    }

    const getSelectedPoints = (j) => {
        if (selectedDicePoints.every((val, j, arr) => val === arr[0])) {
            //console.log('hello')
            return '#db9833'
        } else {
            //console.log('hello2')
            return selectedDicePoints[j] ? 'black' : '#db9833'
        }
    }

    const row = []
    for (let i = 0; i < NBR_OF_DICES; i++)
        row.push(
            <Pressable
                key={'row' + i}
                onPress={() => selectDice(i)}
            >
                <MaterialCommunityIcons
                    name={board[i]}
                    key={'row' + i}
                    size={60}
                    color={getDiceColor(i)}
                />
            </Pressable>
        )

    const numbers = []
    for (let i = 1; i <= MAX_SPOT; i++)
        numbers.push(
            <View>
                <Text style={[styles.row, { marginLeft: 8 }]}>{dicePointsTotal[i]}</Text>
                <Pressable
                    key={'number' + i}
                    onPress={() => selectPoints(i)}
                >
                    <MaterialCommunityIcons
                        name={'numeric-' + i + '-circle-outline'}
                        //key={'number' + i}
                        size={50}
                        color={getSelectedPoints(i)}
                    />
                </Pressable>
            </View>
        )

    useEffect(() => {
        checkStatus()
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices.')
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1)
        }
    }, [nbrOfThrowsLeft, dicePointsTotal, bonusPoints])

    const checkStatus = () => {
        setGameEndStatus('You are ' + bonusPoints + ' points away from bonus')

        if (nbrOfThrowsLeft < 3 && nbrOfThrowsLeft > 0) {
            setStatus('Select and throw again.')
            setGameEndStatus('You are ' + bonusPoints + ' points away from bonus')
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.')
            setGameEndStatus('You are ' + bonusPoints + ' points away from bonus')
        }
        // TÄÄ EI TOIMI VIELÄ
        else if (selectedDicePoints.every(x => x)) {
            setStatus('Game over. All points selected.')
        }
        else {
            setStatus('Throw dices.')
        }
    }

    const selectDice = (i) => {
        let dices = [...selectedDices]
        dices[i] = selectedDices[i] ? false : true
        setSelectedDices(dices)
    }

    const throwDices = () => {
        // check if points have been selected before next round
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next round.')
        }
        else {
            let diceSpots = 0
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1)
                    board[i] = 'dice-' + randomNumber
                    diceSpots = board
                    setDiceSpots(diceSpots)
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
        }
    }

    const getGameEndStatus = () => {

        //TÄÄ EI KÄYTÖSSÄ MISSÄÄN VIELÄ

        if (bonusPoints < BONUS_POINTS_LIMIT) {
            setGameEndStatus('You are ' + bonusPoints + 'points away from bonus')
        }
        else if (bonusPoints >= BONUS_POINTS_LIMIT && selectedDicePoints.every() === true) {
            setGameEndStatus('You got the bonus!')
        }
    }

    const selectPoints = (i) => {
        //check if dice have been thrown 3 times before selecting points
        if (nbrOfThrowsLeft != 0) {
            setStatus('Throw 3 times before setting points.')
            return
        }
        else if (nbrOfThrowsLeft === 0) {

            if (!selectedDicePoints[i]) {
                let points = [...selectedDicePoints]
                points[i] = selectedDicePoints[i] ? false : true

                setSelectedDicePoints(points)
                setNbrOfThrowsLeft(NBR_OF_THROWS)

                let sum = [...dicePointsTotal]

                let nbrOfDices = 0
                for (let spot = 0; spot < diceSpots.length; spot++) {
                    if (diceSpots[spot] === 'dice-' + i) {
                        nbrOfDices++

                    }
                }
                sum[i] = nbrOfDices * i
                setDicePointsTotal(sum)

                // HOX ONE STEP BEHIND-ONGELMA!
                let total = [...dicePointsTotal].reduce((a, b) => a + b, 0)
                let pointsToBonus = BONUS_POINTS_LIMIT - total
                setBonusPoints(pointsToBonus)
            }
            else {
                // cannot choose same points again
                setStatus('You already selected points for ' + i)
                return
            }
        }
    }

    // count total points
    const getDicePointsTotal = () => {
        return dicePointsTotal.reduce((a, b) => a + b, 0)
    }

    return (
        <View style={styles.gameboard}>
            <View style={[styles.flex, styles.row]}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>Throw dices</Text>
            </Pressable>
            <Text style={styles.total}>Total: {getDicePointsTotal()}</Text>
            <Text style={styles.gameinfo}>{gameEndStatus}</Text>
            <View style={[styles.flex, styles.row]}>{numbers}</View>
        </View>
    )
}