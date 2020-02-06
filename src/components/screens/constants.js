import { Dimensions } from 'react-native';
import { Header } from 'react-navigation';

let { height, width } = Dimensions.get('screen');

// Constants used for the size of the game, components and ball movement

export const GAME_WIDTH = width;
export const GAME_HEIGHT = height - Header.HEIGHT;
export const BORDER = 5;

// Plank dimensions and position offset with the top and bottom of screen
export const PLANK_HEIGHT = 10;
export const PLANK_WIDTH = 70;
export const PUCK_BORDER_OFFSET = 60;

// Ball constants
export const BALL_SIZE = 20;
export const BALL_SPEED = 10;
export const MAX_BALL_ANGLE = 70 * (Math.PI / 180);
export const BALL_START_POINT_X = GAME_WIDTH / 2;
export const BALL_START_POINT_Y = GAME_HEIGHT / 2;
