import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Dialog, Portal, Provider } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
const PositionSelector = ({ onValueChange, position, style, isDialogOpen, setIsDialogOpen }) => {
	const hideDialog = () => setIsDialogOpen(false);
	const { colors } = useContext(ThemeContext);

	return (
		<Provider>
			<View style={{ ...style, alignSelf: 'center' }}>
				<Portal>
					<Dialog visible={isDialogOpen} onDismiss={hideDialog} style={{ backgroundColor: '#fff', top: 0 }}>
						<Dialog.Title style={{ color: '#000' }}>Positions</Dialog.Title>
						<Dialog.Content style={{ backgroundColor: '#fff' }}>
							<RadioButton.Group onValueChange={onValueChange} value={position}>
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Goalkeeper" value="Goalkeeper" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Defender" value="Defender" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Midfielder" value="Midfielder" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Striker" value="Striker" />
							</RadioButton.Group>
						</Dialog.Content>
						<Dialog.Actions style={{ backgroundColor: colors.primaryBackground }}>
							<Button color={`${colors.buttonContent}`} style={{ backgroundColor: colors.button }} onPress={hideDialog}>
								Select
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		</Provider>
	);
};

export default PositionSelector;
