import React, { PureComponent } from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Box from '../common/Box';
import Circle from '../common/Circle';
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


const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;

Matter.World.add(world, [
  ball,
  plankOne,
  plankTwo,
  topWall,
  bottomWall,
  leftWall,
  rightWall
]);

const planks = {
  plankOne: plankOne,
  plankTwo: plankTwo
};


class GameScreen extends PureComponent {
  constructor() {
    super();

    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0,
      ballStartToPlayerOne: true
    }
  }

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
    console.log('aqui');
    Matter.Body.setVelocity(ball, { x: 0, y: 3 });

    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;

      var objA = pairs[0].bodyA.label;
      var objB = pairs[0].bodyB.label;

      if (objA == 'ball' && objB == 'topWall') {
        const yah = (this.state.playerOneScore +
          this.state.playerTwoScore + 1) % 3;
        const changeBallStart = yah === 0;

        this.setState(
          {
            playerOneScore: this.state.playerOneScore + 1,

          },
          () => {
            Matter.Body.setPosition(ball, {
              x: BALL_START_POINT_X,
              y: BALL_START_POINT_Y
            });


            console.log('hahaha: ', yah);
            Matter.Body.setVelocity(ball, { x: 0, y: 3 });
          }
        );
      } else if (objA == 'ball' && objB == 'bottomWall') {
        this.setState(
          {
            playerTwoScore: this.state.playerTwoScore + 1
          },
          () => {
            Matter.Body.setPosition(ball, {
              x: BALL_START_POINT_X,
              y: BALL_START_POINT_Y
            });
            const yah = (this.state.playerOneScore + this.state.playerTwoScore) % 3;

            Matter.Body.setVelocity(ball, { x: 0, y: 3 });
          }
        );
      } else if (objA == 'ball' && objB == 'plankOne') {
        const contactPointNormalised = (pairs[0].bodyA.position.x - pairs[0].bodyB.position.x) / (PLANK_WIDTH / 2 + BALL_SIZE / 2);
        const ballAngle = contactPointNormalised * MAX_BALL_ANGLE;

        let x = BALL_SPEED * Math.sin(Math.abs(ballAngle));
        let y = BALL_SPEED * Math.cos(Math.abs(ballAngle));

        if (ballAngle < 0) x = -x;

        Matter.Body.setVelocity(ball, { x: x, y: -Math.abs(y) });
      } else if (objA == 'ball' && objB == 'plankTwo') {
        const contactPointNormalised = (pairs[0].bodyA.position.x - pairs[0].bodyB.position.x) / (PLANK_WIDTH / 2 + BALL_SIZE / 2);
        const ballAngle = contactPointNormalised * MAX_BALL_ANGLE;

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
        style={styles.container}
        systems={[MoveFinger, BallMove]}
        entities={{
          physics: {
            engine: engine,
            world: world
          },
          pongBall: {
            body: ball,
            size: [BALL_SIZE, BALL_SIZE],
            color: 'white',
            renderer: Circle
          },
          playerOnePlank: {
            body: plankOne,
            size: [PLANK_WIDTH, PLANK_HEIGHT],
            color: 'white',
            renderer: Box,
          },
          playerTwoPlank: {
            body: plankTwo,
            size: [PLANK_WIDTH, PLANK_HEIGHT],
            color: 'white',
            renderer: Box,
          },
          theCeiling: {
            body: topWall,
            size: [GAME_WIDTH, BORDER],
            color: 'white',
            renderer: Box,
          },
          theFloor: {
            body: bottomWall,
            size: [GAME_WIDTH, BORDER],
            color: 'white',
            renderer: Box,
            yAdjustment: 0
          },
          theLeftWall: {
            body: leftWall,
            size: [BORDER, GAME_HEIGHT],
            color: 'white',
            renderer: Box,
            xAdjustment: 0
          },
          theRightWall: {
            body: rightWall,
            size: [BORDER, GAME_HEIGHT],
            color: 'white',
            renderer: Box,
            xAdjustment: 0
          }
        }}>

        <View style={{ position: 'absolute', left: GAME_WIDTH / 2 - 30, top: GAME_HEIGHT / 2 }}>
          <Text style={{ textAlign: 'center', color: 'white' }}>{`Player 1: ${this.state.playerOneScore}\nPlayer 2: ${this.state.playerTwoScore}`}</Text>
        </View>

        <StatusBar hidden={true} />

      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});


export default GameScreen;
