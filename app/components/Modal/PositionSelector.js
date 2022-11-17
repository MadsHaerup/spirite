import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Dialog, Portal, Provider } from 'react-native-paper';
const PositionSelector = ({ onValueChange, value }) => {
	const [visible, setVisible] = useState(false);
	const showDialog = () => setVisible(true);
	const hideDialog = () => setVisible(false);

	return (
		<Provider>
			<View>
				<Button onPress={showDialog}>Select Position</Button>
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog}>
						<Dialog.Title>Positions</Dialog.Title>
						<Dialog.Content style={{ backgroundColor: '#fff' }}>
							<RadioButton.Group onValueChange={onValueChange} value={value}>
								<RadioButton.Item label="Goalkeeper" value="Goalkeeper" />
								<RadioButton.Item label="Defender" value="Defender" />
								<RadioButton.Item label="Midfielder" value="Midfielder" />
								<RadioButton.Item label="Striker" value="Striker" />
							</RadioButton.Group>
						</Dialog.Content>
						<Dialog.Actions style={{ backgroundColor: '#fff' }}>
							<Button onPress={hideDialog}>Done</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		</Provider>
	);
};

export default PositionSelector;
