import { GAME_HEIGHT } from "./constants"

export const homeScreenTitleText = {
  fontFamily: 'DigitalDisco',
  color: 'white',
  justifyContent: 'center',
  textAlign: 'center',
  fontSize: 100,
  padding: 20
}

export const scoreTextStyle = {
  color: 'white', 
  fontSize: 20, 
  fontFamily: 'DigitalDisco'
}

export const scorePlayer1ViewStyle = {
  position: 'absolute', 
  left: 30,
  top: GAME_HEIGHT / 2 + 50
}

export const scorePlayer2ViewStyle = {
  position: 'absolute',
  left: 30,
  top: GAME_HEIGHT / 2 - 50,
  transform: [{ rotate: '180deg' }]
}
