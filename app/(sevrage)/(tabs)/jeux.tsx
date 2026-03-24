import { UnisColors } from '@/constants/unis-theme';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = {
	blocks: require('@/assets/images/Blocks.png'),
	memo: require('@/assets/images/Memo_Flip.png'),
	grid2048: require('@/assets/images/2048.png'),
	puzzle: require('@/assets/images/Puzzle.png'),
	colorPop: require('@/assets/images/Color_Pop.png'),
};

function GameCard({ style, image, onPress }: any) {
	return (
		<Pressable
			style={[styles.card, style]}
			onPress={onPress}
			accessibilityRole="button"
			hitSlop={8}
		>
			{image ? <Image source={image} style={styles.cardImage} resizeMode="contain" /> : null}
		</Pressable>
	);
}

export default function JeuxScreen() {
	return (
		<View style={styles.background}>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
					<Text style={styles.title}>Jeux</Text>

					{/* Full width Blocks card */}
					<GameCard style={styles.blocksCard} image={images.blocks} onPress={() => {}} />

					{/* Two-column grid */}
					<View style={styles.gridRow}>
						<View style={styles.column}>
							<GameCard style={[styles.tallCard, styles.purpleCard]} image={images.memo} onPress={() => {}} />
						</View>

						<View style={styles.column}>
							<GameCard style={[styles.smallCard, styles.purpleCard]} image={images.grid2048} onPress={() => {}} />
						</View>
					</View>

					<View style={styles.gridRow}>
						<View style={styles.column}>
							<GameCard style={[styles.smallCard, styles.purpleCard]} image={images.puzzle} onPress={() => {}} />
						</View>
						<View style={styles.column}>
							<GameCard style={[styles.tallCard, styles.colorPopBig, styles.yellowCard, styles.raiseUp]} image={images.colorPop} onPress={() => {}} />
						</View>
					</View>

					<View style={{ height: 32 }} />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	background: { flex: 1, backgroundColor: UnisColors.offWhite },
	safeArea: { flex: 1 },
	scroll: { padding: 8, alignItems: 'center' },
	title: {
		fontSize: 26,
		fontFamily: 'TitleWrap',
		fontWeight: '800',
		color: UnisColors.purple.dark,
		marginBottom: 0,
	},
	card: {
		width: '100%',
		borderRadius: 0,
		padding: 0,
		marginBottom: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
		overflow: 'hidden',
	},
	cardImage: { width: '100%', height: '100%', alignSelf: 'center' },

	blocksCard: {
		backgroundColor: 'transparent',
		borderRadius: 18,
		paddingVertical: 6,
		paddingHorizontal: 6,
		alignItems: 'center',
		justifyContent: 'center',
		height: 190,
	},

	gridRow: { flexDirection: 'row', width: '100%', gap: 6, marginBottom: 6 },
	column: { flex: 1 },

	tallCard: { height: 300, justifyContent: 'center', paddingHorizontal: 6 },
	smallCard: { height: 140, justifyContent: 'center', paddingHorizontal: 6 },

	purpleCard: { backgroundColor: 'transparent' },
	yellowCard: { backgroundColor: 'transparent' },

	colorPopBig: { height: 300 },
	raiseUp: { marginTop: -160 },
});


