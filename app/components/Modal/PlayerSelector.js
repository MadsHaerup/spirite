import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
import ListOfPlayers from '../ListOfPlayers/ListOfPlayers';

const PlayerSelector = ({ isEditing, setIsEditing, player, onChange, fetchData }) => {
	const showModal = () => setIsEditing(true);
	const hideModal = () => setIsEditing(false);
	const { colors } = useContext(ThemeContext);

	const containerStyle = {
		backgroundColor: colors.PrimaryBackground,
		borderRadius: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor: colors.icons,
		borderWidth: 1,
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'flex-start',
	};
	return (
		<Provider>
			<Portal>
				<Modal visible={isEditing} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<View style={{ padding: 20, paddingBottom: 0 }}>
						<Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '600', padding: 20, color: colors.icons }}>
							Select a player
						</Text>
						<ListOfPlayers onChange={onChange} player={player} fetchData={fetchData} />
					</View>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
							marginBottom: 20,
							width: '100%',
						}}>
						<Button
							style={{
								width: 120,
								borderColor: colors.error,
								color: colors.secondary,
							}}
							color={`${colors.error}`}
							mode="outlined"
							onPress={() => hideModal()}>
							Cancel
						</Button>
						<Button
							style={{
								width: 120,
								borderColor: colors.button,
								color: colors.secondary,
							}}
							color={`${colors.primary}`}
							mode="outlined"
							onPress={() => {
								hideModal();
							}}>
							Submit
						</Button>
					</View>
				</Modal>
			</Portal>
		</Provider>
	);
};

export default PlayerSelector;
