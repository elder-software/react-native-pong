import { Dimensions } from 'react-native';
import { Header } from 'react-navigation';

let { height, width } = Dimensions.get('screen');


export const GAME_WIDTH = width;
export const GAME_HEIGHT = height - Header.HEIGHT;
export const BORDER = 5;

export const PLANK_HEIGHT = 10;
export const PLANK_WIDTH = 70;
export const PUCK_BORDER_OFFSET = 60;

export const BALL_SIZE = 20;
export const BALL_SPEED = 3;
export const MAX_BALL_ANGLE = 70 * (Math.PI / 180);
export const BALL_START_POINT_X = GAME_WIDTH / 2;
export const BALL_START_POINT_Y = GAME_HEIGHT / 2;
