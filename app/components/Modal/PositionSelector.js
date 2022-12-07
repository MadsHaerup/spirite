import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
const PositionSelector = ({ onValueChange, position, style }) => {
	const [visible, setVisible] = useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);
	const { colors } = useContext(ThemeContext);

	return (
		<Provider>
			<View style={{ ...style, alignSelf: 'center' }}>
				<Button color={`${colors.primary}`} style={{ backgroundColor: colors.icons }} onPress={showDialog}>
					Position
				</Button>
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: colors.primary, bottom: 0 }}>
						<Dialog.Title>Positions</Dialog.Title>
						<Dialog.Content style={{ backgroundColor: colors.primary }}>
							<RadioButton.Group onValueChange={onValueChange} value={position}>
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Goalkeeper" value="Goalkeeper" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Defender" value="Defender" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Midfielder" value="Midfielder" />
								<RadioButton.Item labelStyle={{ color: colors.secondary }} label="Striker" value="Striker" />
							</RadioButton.Group>
						</Dialog.Content>
						<Dialog.Actions style={{ backgroundColor: '#fff' }}>
							<Button
								color={`${colors.primary}`}
								style={{ backgroundColor: colors.button, color: colors.primary }}
								onPress={hideDialog}>
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
