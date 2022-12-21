import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { View, Text } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import WheelPicker from '../WheelPicker/WheelPicker';
import Fab from '../Fab/Fab';
import { ThemeContext } from '../../context/context';

const TeamSheet = ({ selectedFormation, setSelectedFormation, formations }) => {
	const { colors } = useContext(ThemeContext);

	// ref
	const bottomSheetModalRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback(index => {}, []);

	return (
		<BottomSheetModalProvider>
			<View>
				<Fab
					handlePress={handlePresentModalPress}
					style={{ backgroundColor: colors.button, bottom: 8, right: -8 }}
					icon="soccer-field"
				/>
				<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
					<View style={{ paddingBottom: 40 }}>
						<Text style={{ textAlign: 'center' }}>Team Formation </Text>
						<WheelPicker
							formations={formations}
							setSelectedFormation={setSelectedFormation}
							selectedFormation={selectedFormation}
						/>
					</View>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
	);
};

export default TeamSheet;
