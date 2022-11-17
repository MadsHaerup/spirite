import React, { useState } from 'react';
import { Text, View, Dimensions, Image, Animated, PanResponder, Button } from 'react-native';
import CardText from './CardText';
import { players } from '../../data/players.js';
import { useAttendanceStore } from '../../store/store';

const Card = ({ setCurrentIndex, currentIndex }) => {
	const [position, setPosition] = useState(new Animated.ValueXY());
	const increaseAbsence = useAttendanceStore(state => state.increaseAbsence);
	const increaseAttendance = useAttendanceStore(state => state.increaseAttendance);

	const SCREEN_HEIGHT = Dimensions.get('window').height;
	const SCREEN_WIDTH = Dimensions.get('window').width;

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (evt, gestureState) => {
			position.setValue({ x: gestureState.dx, y: gestureState.dy });
		},
		onPanResponderRelease: (evt, gestureState) => {
			if (gestureState.dx > 120) {
				Animated.spring(position, {
					toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
					useNativeDriver: true,
				}).start(() => {
					setCurrentIndex(currentIndex + 1);
					position.setValue({ x: 0, y: 0 });
				});
				increaseAttendance();
			} else if (gestureState.dx < -120) {
				Animated.spring(position, {
					toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
					useNativeDriver: true,
				}).start(() => {
					increaseAbsence;
					setCurrentIndex(currentIndex + 1);
					position.setValue({ x: 0, y: 0 });
				});
				increaseAbsence();
			} else {
				Animated.spring(position, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: true,
					friction: 4,
				}).start();
			}
		},
	});

	const inputRange = [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2];
	const rotate = position.x.interpolate({
		inputRange: inputRange,
		outputRange: ['-10deg', '0deg', '10deg'],
		extrapolate: 'clamp',
	});
	const yupOpacity = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [0, 0, 1],
		extrapolate: 'clamp',
	});
	const nopeOpacity = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [1, 0, 0],
		extrapolate: 'clamp',
	});
	const nextCardOpacity = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [1, 0, 1],
		extrapolate: 'clamp',
	});
	const nextCardScale = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [1, 0.8, 1],
		extrapolate: 'clamp',
	});
	return (
		<View style={{ flex: 1 }}>
			{players
				.map((player, i) =>
					i < currentIndex ? null : i == currentIndex ? (
						<Animated.View
							key={i}
							style={[
								{
									height: SCREEN_HEIGHT - 120,
									width: SCREEN_WIDTH,
									padding: 10,
									position: 'absolute',
									transform: [{ translateX: position.x }, { translateY: 0 }, { rotate: rotate }],
								},
							]}
							{...panResponder.panHandlers}>
							<Animated.View
								style={{
									opacity: yupOpacity,
									transform: [{ rotate: '-30deg' }],
									position: 'absolute',
									top: 50,
									left: 40,
									zIndex: 1000,
								}}>
								<Text
									style={{
										borderWidth: 1,
										borderColor: 'green',
										color: 'green',
										fontSize: 32,
										fontWeight: '800',
										padding: 10,
									}}>
									YUP
								</Text>
							</Animated.View>
							<Animated.View
								style={{
									opacity: nopeOpacity,
									transform: [{ rotate: '30deg' }],
									position: 'absolute',
									top: 50,
									right: 40,
									zIndex: 1000,
								}}>
								<Text
									style={{
										borderWidth: 1,
										borderColor: 'red',
										color: 'red',
										fontSize: 32,
										fontWeight: '800',
										padding: 10,
									}}>
									NOPE
								</Text>
							</Animated.View>
							<Image
								style={{
									flex: 1,
									height: null,
									width: null,
									resizeMode: 'cover',
									borderRadius: 20,
								}}
								source={player.uri}
							/>
							<CardText>{player.name}</CardText>
						</Animated.View>
					) : (
						<Animated.View
							key={i}
							style={{
								opacity: nextCardOpacity,
								transform: [{ scale: nextCardScale }],
								height: SCREEN_HEIGHT - 120,
								width: SCREEN_WIDTH,
								padding: 10,
								position: 'absolute',
							}}>
							<Image
								style={{
									flex: 1,
									height: null,
									width: null,
									resizeMode: 'cover',
									borderRadius: 20,
								}}
								source={player.uri}
							/>
							<CardText>{player.name}</CardText>
						</Animated.View>
					)
				)
				.reverse()}
		</View>
	);
};

export default Card;
