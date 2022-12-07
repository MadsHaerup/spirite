import React, { useCallback, useContext, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Fab from '../Fab/Fab';
import { ThemeContext } from '../../context/context';

const BottomModal = ({ children }) => {
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

	// renders
	return (
		<BottomSheetModalProvider>
			<View>
				<Fab handlePress={handlePresentModalPress} />
				<BottomSheetModal ref={bottomSheetModalRef} index={1} snapPoints={snapPoints} onChange={handleSheetChanges}>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								textAlign: 'center',
								paddingTop: 10,
								paddingBottom: 10,
								fontSize: 24,
								fontWeight: 'bold',
							}}>
							Add to team
						</Text>
						{children}
					</View>
				</BottomSheetModal>
			</View>
		</BottomSheetModalProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default BottomModal;
