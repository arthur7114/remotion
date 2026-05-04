import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {LogoDrOcupacional} from './components/LogoDrOcupacional';
import {IntroScene} from './components/IntroScene';
import {EmergencyExitScene} from './components/EmergencyExitScene';
import {RiskHighlight} from './components/RiskHighlight';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';
import {MascotSpeech} from './components/MascotSpeech';
import {
	defaultPilulaSaidasEmergenciaProps,
	type PilulaSaidasEmergenciaProps,
} from './pilulaProps';

/**
 * PilulaSaidasEmergencia
 * 1920x1080, 30fps, 25s (750 frames)
 *
 * Timeline:
 *   0-75    Intro
 *   75-500  Emergency exit scene
 *   135-255 Risk question with mascot
 *   240-360 Risk evidence with mascot
 *   360-500 Correction confirmation with mascot
 *   500-630 Centered checklist
 *   610-750 Closing without mascot
 */
export const PilulaSaidasEmergencia: React.FC<PilulaSaidasEmergenciaProps> = ({
	intro,
	speech,
	checklist,
	closing,
} = defaultPilulaSaidasEmergenciaProps) => {
	const frame = useCurrentFrame();

	// Show the persistent corner logo only after intro
	const cornerLogoOpacity = interpolate(frame, [70, 95, 595, 620], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: COLORS.bg,
				fontFamily: FONT,
			}}
		>
			<BackgroundGrid />

			<Sequence from={0} durationInFrames={75} layout="none">
				<IntroScene {...intro} />
			</Sequence>

			<Sequence from={75} durationInFrames={425} layout="none">
				<EmergencyExitScene />
			</Sequence>

			<Sequence from={135} durationInFrames={120} layout="none">
				<RiskHighlight variant="question" text={speech.question} />
			</Sequence>

			<Sequence from={240} durationInFrames={120} layout="none">
				<RiskHighlight variant="evidence" text={speech.warning} />
			</Sequence>

			<Sequence from={360} durationInFrames={140} layout="none">
				<MascotSpeech
					text={speech.success}
					tone="success"
					layout="hero"
					exitStart={118}
					exitDuration={18}
				/>
			</Sequence>

			<Sequence from={500} durationInFrames={130} layout="none">
				<ChecklistScene
					eyebrow={checklist.eyebrow}
					title={checklist.title}
					subtitle={checklist.subtitle}
					note={checklist.note}
					items={[
						checklist.item1,
						checklist.item2,
						checklist.item3,
						checklist.item4,
					]}
				/>
			</Sequence>

			<Sequence from={610} durationInFrames={140} layout="none">
				<ClosingFrame
					eyebrow={closing.eyebrow}
					titleLine1={closing.titleLine1}
					titleLine2={closing.titleLine2}
					subtitle={closing.subtitle}
					actions={[closing.action1, closing.action2, closing.action3]}
				/>
			</Sequence>

			{/* Persistent corner logo (hidden during intro and closing) */}
			<div style={{opacity: cornerLogoOpacity}}>
				<LogoDrOcupacional variant="corner" />
			</div>
		</AbsoluteFill>
	);
};
