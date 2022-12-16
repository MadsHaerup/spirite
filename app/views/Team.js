import React, { useContext, useState } from 'react';
import { Dimensions, View } from 'react-native';
import BottomModal from '../components/BottomModal/BottomModal';
import { ThemeContext } from '../context/context';
import TeamList from '../components/TeamList/TeamList';
import Edit from '../components/Modal/Edit';

const Team = () => {
	const { colors } = useContext(ThemeContext);
	const [visible, setVisible] = useState(false);
	const [playerId, setPlayerId] = useState(null);
	const SCREEN_HEIGHT = Dimensions.get('window').height;
	const SCREEN_WIDTH = Dimensions.get('window').width;

	return (
		<View style={{ flex: 1, paddingTop: 60, backgroundColor: colors.PrimaryBackground, position: 'relative' }}>
			<TeamList setVisible={setVisible} setPlayerId={setPlayerId} />
			<BottomModal />
			{visible && (
				<View
					style={{ position: 'absolute', width: SCREEN_WIDTH, height: SCREEN_HEIGHT, zIndex: 100, bottom: 0, top: 0 }}>
					<Edit visible={visible} setVisible={setVisible} id={playerId} />
				</View>
			)}
		</View>
	);
};

export default Team;
