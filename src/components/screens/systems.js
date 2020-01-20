import Matter from 'matter-js';
import {
  GAME_HEIGHT,
  PUCK_BORDER_OFFSET
} from './constants';


const MoveFinger = (entities, { touches }) => {
  //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
  //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
  //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
  //-- That said, it's probably worth considering performance implications in either case.

  touches.filter(t => t.type === 'start').forEach(t => {
    if ((t.event.pageY) > (GAME_HEIGHT / 2)) {
      Matter.Body.setPosition(entities['playerOnePlank'].body, {
        x: t.event.pageX,
        y: GAME_HEIGHT - PUCK_BORDER_OFFSET
      });
    } else {
      Matter.Body.setPosition(entities['playerTwoPlank'].body, {
        x: t.event.pageX,
        y: PUCK_BORDER_OFFSET
      });
    }
  });

  touches.filter(t => t.type === 'move').forEach(t => {
    if ((t.event.pageY) > (GAME_HEIGHT / 2)) {
      Matter.Body.setPosition(entities['playerOnePlank'].body, {
        x: entities['playerOnePlank'].body.position.x + t.delta.pageX,
        y: GAME_HEIGHT - PUCK_BORDER_OFFSET
      });
    } else {
      Matter.Body.setPosition(entities['playerTwoPlank'].body, {
        x: entities['playerTwoPlank'].body.position.x + t.delta.pageX,
        y: PUCK_BORDER_OFFSET
      });
    }
  });

  return entities;

};


const BallMove = (entities, { time }) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = 0;
  Matter.Engine.update(engine, time.delta);

  return { ...entities, engine: engine };
};


export { MoveFinger, BallMove };
