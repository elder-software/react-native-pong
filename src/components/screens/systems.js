import Matter from 'matter-js';
import {
  GAME_HEIGHT,
  PUCK_BORDER_OFFSET
} from './constants';

// Handles touches and movements from finger
const MoveFinger = (entities, { touches }) => {
  // Sets the plank position depending on the touch start location
  touches.filter(t => t.type === 'start').forEach(t => {
    if ((t.event.pageY) > (GAME_HEIGHT / 2)) {
      // If the touch location is in the bottom half of the screen, 
      // player 1's plank is moved to the x position of the touch
      Matter.Body.setPosition(entities['playerOnePlank'].body, {
        x: t.event.pageX,
        y: GAME_HEIGHT - PUCK_BORDER_OFFSET
      });
    } else {
      // Else, player 2's plank is moved to the x position of the touch
      Matter.Body.setPosition(entities['playerTwoPlank'].body, {
        x: t.event.pageX,
        y: PUCK_BORDER_OFFSET
      });
    }
  });

  // Sets the plank position depending on the touch move location
  touches.filter(t => t.type === 'move').forEach(t => {
    if ((t.event.pageY) > (GAME_HEIGHT / 2)) {
      // If the move location is in the bottom half of the screen, 
      // player 1's plank is moved to the x position of the touch
      Matter.Body.setPosition(entities['playerOnePlank'].body, {
        x: entities['playerOnePlank'].body.position.x + t.delta.pageX,
        y: GAME_HEIGHT - PUCK_BORDER_OFFSET
      });
    } else {
      // Else, player 2's plank is moved to the x position of the move
      Matter.Body.setPosition(entities['playerTwoPlank'].body, {
        x: entities['playerTwoPlank'].body.position.x + t.delta.pageX,
        y: PUCK_BORDER_OFFSET
      });
    }
  });

  return entities;

};


// Handles the movement of the ball
const BallMove = (entities, { time }) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = 0;
  Matter.Engine.update(engine, time.delta);

  return { ...entities, engine: engine };
};


export { MoveFinger, BallMove };
