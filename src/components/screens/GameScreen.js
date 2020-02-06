import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import { Box, Circle } from '../common';
import { MoveFinger, BallMove } from './systems'
import {
  ball,
  plankOne,
  plankTwo,
  topWall,
  bottomWall,
  leftWall,
  rightWall
} from './MatterObjects';
import {
  BALL_SPEED,
  MAX_BALL_ANGLE,
  BALL_SIZE,
  PLANK_HEIGHT,
  PLANK_WIDTH,
  GAME_WIDTH,
  GAME_HEIGHT,
  BALL_START_POINT_X,
  BALL_START_POINT_Y,
  BORDER
} from './constants';
import { BackArrow } from '../common';
import {
  scoreTextStyle,
  scorePlayer1ViewStyle,
  scorePlayer2ViewStyle
} from './styles';


// Creates the engine and world using Matter.js
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

// Adds all the objects to the world
Matter.World.add(world, [
  ball,
  plankOne,
  plankTwo,
  topWall,
  bottomWall,
  leftWall,
  rightWall
]);

/**
 * GameScreen, where the game of pong starts. Contains the game engine determining
 * the ball and puck movement and the components
 */
class GameScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0,
    }
  }

  // Header used to enable navigation back the HomeScreen
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: 'black'
    },
    headerLeft: (
      <BackArrow
        onPress={() => {
          navigation.pop();
        }}
      />
    )
  });


  componentDidMount() {
    Matter.Body.setVelocity(ball, { x: 0, y: 3 });

    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      if (objA == 'ball' && objB == 'topWall') {
        // Detects collision between the top wall and ball, player 1 scores
        // Increments player 1 score and restarts the ball with start position/velocity
        this.setState(
          {
            playerOneScore: this.state.playerOneScore + 1,

          },
          () => {
            Matter.Body.setPosition(ball, {
              x: BALL_START_POINT_X,
              y: BALL_START_POINT_Y
            });

            // Player 1 scored, gets the serve
            Matter.Body.setVelocity(ball, { x: 0, y: 3 });
          }
        );
      } else if (objA == 'ball' && objB == 'bottomWall') {
        // Detects collision between the bottom wall and ball, player 2 scores
        // Increments player 2 score and restarts the ball with start position/velocity
        this.setState(
          {
            playerTwoScore: this.state.playerTwoScore + 1
          },
          () => {
            Matter.Body.setPosition(ball, {
              x: BALL_START_POINT_X,
              y: BALL_START_POINT_Y
            });

            // Player 2 scored, gets the serve
            Matter.Body.setVelocity(ball, { x: 0, y: -3 });
          }
        );
      } else if (objA == 'ball' && objB == 'plankOne') {
        // Normalised contact point is the distance between the center of the plank
        // and the balls contact point, value between -1 and 1
        const contactPointNormalised = (pairs[0].bodyA.position.x -
          pairs[0].bodyB.position.x) / (PLANK_WIDTH / 2 + BALL_SIZE / 2);

        // Ball angle is the direction the ball will head in
        const ballAngle = contactPointNormalised * MAX_BALL_ANGLE;

        // Calculates X and Y vectors for the ball angle and speed
        let x = BALL_SPEED * Math.sin(Math.abs(ballAngle));
        let y = BALL_SPEED * Math.cos(Math.abs(ballAngle));

        if (ballAngle < 0) x = -x;

        Matter.Body.setVelocity(ball, { x: x, y: -Math.abs(y) });
      } else if (objA == 'ball' && objB == 'plankTwo') {
        // Normalised contact point is the distance between the center of the plank
        // and the balls contact point, value between -1 and 1
        const contactPointNormalised = (pairs[0].bodyA.position.x -
          pairs[0].bodyB.position.x) / (PLANK_WIDTH / 2 + BALL_SIZE / 2);

        // Ball angle is the direction the ball will head in
        const ballAngle = contactPointNormalised * MAX_BALL_ANGLE;

        // Calculates X and Y vectors for the ball angle and speed
        let x = BALL_SPEED * Math.sin(Math.abs(ballAngle));
        let y = BALL_SPEED * Math.cos(Math.abs(ballAngle));

        if (ballAngle < 0) x = -x;

        Matter.Body.setVelocity(ball, { x: x, y: Math.abs(y) });
      }
    });
  }


  render() {
    return (
      <GameEngine
        ref={this.gameEngine}
        style={{ flex: 1, backgroundColor: 'black' }}
        systems={[MoveFinger, BallMove]}
        entities={{
          physics: {
            engine: engine,
            world: world
          },
          pongBall: {
            body: ball,
            size: [BALL_SIZE, BALL_SIZE],
            color: '#ffffff',
            renderer: Circle
          },
          playerOnePlank: {
            body: plankOne,
            size: [PLANK_WIDTH, PLANK_HEIGHT],
            color: '#ffffff',
            renderer: Box,
          },
          playerTwoPlank: {
            body: plankTwo,
            size: [PLANK_WIDTH, PLANK_HEIGHT],
            color: '#ffffff',
            renderer: Box,
          },
          theCeiling: {
            body: topWall,
            size: [GAME_WIDTH, BORDER],
            color: '#ffffff',
            renderer: Box,
          },
          theFloor: {
            body: bottomWall,
            size: [GAME_WIDTH, BORDER],
            color: '#ffffff',
            renderer: Box,
            yAdjustment: 0
          },
          theLeftWall: {
            body: leftWall,
            size: [BORDER, GAME_HEIGHT],
            color: '#ffffff',
            renderer: Box,
            xAdjustment: 0
          },
          theRightWall: {
            body: rightWall,
            size: [BORDER, GAME_HEIGHT],
            color: '#ffffff',
            renderer: Box,
            xAdjustment: 0
          },
        }}>

        <View style={scorePlayer1ViewStyle}>
          <Text style={scoreTextStyle}>
            {`${this.state.playerOneScore}`}
          </Text>
        </View>
        <View style={scorePlayer2ViewStyle}>
          <Text style={scoreTextStyle}>
            {`${this.state.playerTwoScore}`}
          </Text>
        </View>
      </GameEngine>
    );
  }
}

export default GameScreen;
