import Matter from 'matter-js';
import {
  BALL_SIZE,
  PLANK_HEIGHT,
  PLANK_WIDTH,
  GAME_WIDTH,
  GAME_HEIGHT,
  BALL_START_POINT_X,
  BALL_START_POINT_Y,
  BORDER,
  PUCK_BORDER_OFFSET
} from './constants';

/**
 * all the objects that are used by Matter.js for the game engine
 */

// isStatic sets the mass and inertia to infinity
const plankSettings = {
  isStatic: true
};

const ballSettings = {
  inertia: 0,
  friction: 0,
  frictionStatic: 0,
  frictionAir: 0,
  restitution: 1
};

export const ball = Matter.Bodies.circle(
  BALL_START_POINT_X,
  BALL_START_POINT_Y,
  BALL_SIZE / 2,
  {
    ...ballSettings,
    label: 'ball'
  }
);

export const plankOne = Matter.Bodies.rectangle(
  GAME_WIDTH / 2,
  GAME_HEIGHT - PUCK_BORDER_OFFSET,
  PLANK_WIDTH,
  PLANK_HEIGHT,
  { ...plankSettings, isSensor: true, label: 'plankOne' }
);

export const plankTwo = Matter.Bodies.rectangle(
  GAME_WIDTH / 2,
  PUCK_BORDER_OFFSET,
  PLANK_WIDTH,
  PLANK_HEIGHT,
  { ...plankSettings, isSensor: true, label: 'plankTwo' }
);

export const topWall = Matter.Bodies.rectangle(
  GAME_WIDTH / 2,
  BORDER / 2,
  GAME_WIDTH,
  BORDER,
  { isSensor: true, label: 'topWall' }
);

export const bottomWall = Matter.Bodies.rectangle(
  GAME_WIDTH / 2,
  GAME_HEIGHT - (BORDER / 2),
  GAME_WIDTH,
  BORDER,
  { isSensor: true, label: 'bottomWall' }
);

export const leftWall = Matter.Bodies.rectangle(
  BORDER / 2,
  GAME_HEIGHT / 2,
  BORDER,
  GAME_HEIGHT,
  { isStatic: true, label: 'leftWall' }
);

export const rightWall = Matter.Bodies.rectangle(
  GAME_WIDTH - (BORDER / 2),
  GAME_HEIGHT / 2,
  BORDER,
  GAME_HEIGHT,
  { isStatic: true, label: 'rightWall' }
);
