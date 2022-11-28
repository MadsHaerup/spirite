import React, { useContext } from 'react';
import { Text, View, Dimensions, Image, Animated, PanResponder, StyleSheet } from 'react-native';
import CardText from './CardText';
// import { players } from '../../data/players.js';
import { useAttendanceStore } from '../../store/store';
import { UserContext } from '../../context/context';
import { useQuery } from '../../models/Player';
import placerholderImage from '../../../assets/images/person.jpg';
const Card = ({ setCurrentIndex, currentIndex }) => {
	const increaseAbsence = useAttendanceStore(state => state.increaseAbsence);
	const increaseAttendance = useAttendanceStore(state => state.increaseAttendance);
	const SCREEN_WIDTH = Dimensions.get('window').width;
	const nextCard = () => setCurrentIndex(currentValue => currentValue + 1);
	const position = new Animated.ValueXY();

	const { userId } = useContext(UserContext);
	const team = useQuery('Teams').filtered(`user_id == '${userId}'`)[0];
	const players = team.players;

	const panResponder = PanResponder.create({
		// for Element's Attr
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (evt, { dx, dy }) => {
			// Move Event
			position.setValue({ x: dx, y: dy });
		},
		onPanResponderRelease: (evt, { dx, dy }) => {
			// Release Event
			if (dx >= 150) {
				// Swpied right side
				Animated.spring(position, {
					toValue: { x: SCREEN_WIDTH + 100, y: dy },
					useNativeDriver: true, // this option make performance better
				}).start(nextCard);
				increaseAttendance();
			} else if (dx <= -150) {
				// Swiped left side
				Animated.spring(position, {
					toValue: { x: -SCREEN_WIDTH - 100, y: dy },
					useNativeDriver: true,
				}).start(nextCard);
				increaseAbsence();
			} else {
				// Place the card to original position
				Animated.spring(position, {
					toValue: { x: 0, y: 0 },
					useNativeDriver: true,
					bounciness: 10,
				}).start();
			}
		},
	});

	const inputRange = [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2];

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
	const rotationValues = position.x.interpolate({
		inputRange: inputRange,
		outputRange: ['-8deg', '0deg', '8deg'],
		extrapolate: 'clamp',
	});
	const secondCardOpacity = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [1, 0.2, 1],
		extrapolate: 'clamp',
	});
	const secondCardScale = position.x.interpolate({
		inputRange: inputRange,
		outputRange: [1, 0.8, 1],
		extrapolate: 'clamp',
	});
	return (
		<View style={{ flex: 1 }}>
			{players
				.map((player, index) => {
					return index < currentIndex ? null : (
						<Animated.View
							key={index}
							style={[
								styles.card,
								index === currentIndex
									? {
											zIndex: 1,
											transform: [{ rotate: rotationValues }, ...position.getTranslateTransform()],
									  }
									: index === currentIndex + 1
									? {
											opacity: secondCardOpacity,
											transform: [{ scale: secondCardScale }],
											zIndex: -index,
									  }
									: {
											opacity: 0,
											zIndex: -index,
									  },
							]}
							{...panResponder.panHandlers}>
							<Animated.View
								style={{
									opacity: index === currentIndex ? yupOpacity : 0,
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
									opacity: index === currentIndex ? nopeOpacity : 0,
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
									height: '100%',
									width: '100%',
									resizeMode: 'cover',
									borderRadius: 20,
								}}
								source={player.uri ? { uri: 'data:image/jpeg;base64,' + player.uri } : placerholderImage}
							/>
							<CardText>{player.name}</CardText>
						</Animated.View>
					);
				})
				.reverse()}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		height: '100%',
		width: '100%',
		padding: 10,
		position: 'absolute',
		top: 0,
	},
});

export default Card;
