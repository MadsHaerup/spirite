import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import BottomModal from '../components/BottomModal/BottomModal';
import { ThemeContext } from '../context/context';
import TeamList from '../components/TeamList/TeamList';
import Edit from '../components/Modal/Edit';

const Team = () => {
	const { colors } = useContext(ThemeContext);
	const [visible, setVisible] = useState(false);
	const [playerId, setPlayerId] = useState(null);

	return (
		<View style={{ flex: 1, backgroundColor: colors.PrimaryBackground, position: 'relative' }}>
			<TeamList setVisible={setVisible} setPlayerId={setPlayerId} />

			<BottomModal />

			{visible && (
				<View style={{ position: 'absolute', width: '100%', height: '100%' }}>
					<Edit visible={visible} setVisible={setVisible} id={playerId} />
				</View>
			)}
		</View>
	);
};

export default Team;
