import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'
import { Pressable, View, Text } from "react-native";

// heitä noppaa -> valitse numerot
// heitä uudestaan -> valitse lisää tai muuta valinta
// heitä kolmannen kerran -> valitse mihin sijoitat pisteet -> ei anna jatkaa ennen kuin valinta tehty
// jatka kunnes kaikki numerot valittu
// laske pisteet yhteen
// kerää kokonaispistemäärää, vähennä 63:sta

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

    let bonusPoints = BONUS_POINTS_LIMIT - dicePointsTotal

    const getDiceColor = (i) => {
        if (board.every((val, i, arr) => val === arr[0])) {
            return '#db9833'
        } else {
            return selectedDices[i] ? 'black' : '#db9833'
        }
    }

    const getGameEnd = (j) => {
        if (selectedDicePoints.every((val, j, arr) => val === arr[0])) {
            console.log('hello')
            return '#db9833'
        } else {
            console.log('hello2')
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
                <Text style={[styles.row, { marginLeft: 8 }]}>{selectedDicePoints}0</Text>
                <Pressable
                    key={'number' + i}
                    onPress={() => selectPoints(i)}
                >
                    <MaterialCommunityIcons
                        name={'numeric-' + i + '-circle-outline'}
                        key={'number' + i}
                        size={50}
                        color={getGameEnd(i)}
                    />
                </Pressable>
            </View>
        )

    useEffect(() => {
        checkBonusPoints()
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices.')
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1)
        }
    }, [nbrOfThrowsLeft, selectedDices])


    const checkBonusPoints = () => {
        if (nbrOfThrowsLeft < 3 && nbrOfThrowsLeft > 0) {
            setStatus('Select and throw again.')
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.')
            //getDicePointsTotal()
        }

        else if (selectedDicePoints.every(x => x)) {
            setStatus('All points selected.')
        }
        else if (nbrOfThrowsLeft === 0) {
            if (selectedDices === 0) {
                setStatus('Select your points before next round.')
            }
            else {
                selectDice()
            }
        }
        else {
            setStatus('Throw dices.')
        }
    }

    //setGameEndStatus('Game over. All points selected.')

    /* const checkStatus = () => {
        if (nbrOfThrowsLeft < 3 && nbrOfThrowsLeft > 0) {
            setStatus('Select and throw again.')
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.')
            getDicePointsTotal()
           
        }
        else {
            setStatus('Throw dices.')
        }
    } */


    const selectDice = (i) => {
        let dices = [...selectedDices]
        dices[i] = selectedDices[i] ? false : true
        setSelectedDices(dices)
        //setDicePointsTotal(dices)
        //setDiceSpots(dices)
        //console.log(dices)
        //console.log(diceSpots)

        /* let selectedSum = dices.reduce((a,b) => a + b, 0)
        console.log(selectedSum)
        setDicePointsTotal(selectedSum) */

    }

    const throwDices = () => {
        // tähän if, jos et ole asettanut pisteitä kolmen heiton jälkeen, älä anna heittaa uudestaan
        let diceSpots = 0
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1)
                board[i] = 'dice-' + randomNumber
                diceSpots = randomNumber
                console.log(diceSpots)
                setDiceSpots(diceSpots)
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)


    }

    const getDicePointsTotal = () => {
        if (nbrOfThrowsLeft != 0) {
            setStatus('Throw 3 times before setting points.')
        }
        else {
            //console.log('hello')
            return dicePointsTotal.reduce((a, b) => a + b, 0)
        }
    }
    //console.log(dicePointsTotal)

    const selectPoints = (i) => {
        if (nbrOfThrowsLeft != 0) {
            setStatus('Throw 3 times before setting points.')
            return
        }
        if (!selectedDicePoints[i]) {
            let points = [...selectedDicePoints]
            points[i] = selectedDicePoints[i] ? false : true

            let timesShown = 0
            for (let i = 0; i < board.length; i++) {
                if (board[i] == value) {
                    timesShown++
                    console.log(timesShown)
                }
            }
            setDicePointsTotal(sum)
            setSelectedDicePoints(points)
            //console.log(points)
            //console.log(board.values())
            // JÄIT TÄHÄN
            //let filtered = board.filter(numbers[i])
            //let total = filtered.reduce((a, b) => a + b, 0)
            //console.log(total)
        }
        else {
            setStatus('You already selected points for ' + i)
        }
        /*  else {
             //console.log('hello')
             return dicePointsTotal.reduce((a, b) => a + b, 0)
         } */
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
            <Text style={styles.total}>Total: {dicePointsTotal}</Text>
            <Text style={styles.gameinfo}>You are {bonusPoints} points away from bonus</Text>
            <View style={[styles.flex, styles.row]}>{numbers}</View>
        </View>
    )


}