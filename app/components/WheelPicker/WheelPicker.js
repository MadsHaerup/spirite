import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { ThemeContext } from '../../context/context';
const WheelPicker = ({ selectedFormation, setSelectedFormation, formations }) => {
	const { colors } = useContext(ThemeContext);

	return (
		<ScrollView style={{ width: '100%' }}>
			<RadioButton.Group onValueChange={newValue => setSelectedFormation(newValue)} value={selectedFormation}>
				{formations.map(formation => (
					<RadioButton.Item
						key={formation.formation}
						labelStyle={{ color: colors?.secondary }}
						label={formation.formation}
						value={formation.formation}
					/>
				))}
			</RadioButton.Group>
		</ScrollView>
	);
};

export default WheelPicker;
