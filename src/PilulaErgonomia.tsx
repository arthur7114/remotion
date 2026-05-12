import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {IntroScene} from './components/IntroScene';
import {PostureScene} from './components/PostureScene';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';
import {MascotSpeech} from './components/MascotSpeech';
import {defaultPilulaErgonomiaProps, type PilulaErgonomiaProps} from './pilulaProps';

export const PilulaErgonomia: React.FC<PilulaErgonomiaProps> = ({
	intro,
	speech,
	checklist,
	closing,
} = defaultPilulaErgonomiaProps) => {
	const frame = useCurrentFrame();

	const footerLogoOpacity = interpolate(frame, [134, 135, 485, 500], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg, fontFamily: FONT}}>
			<BackgroundGrid />

			<Sequence from={0} durationInFrames={135} layout="none">
				<IntroScene {...intro} />
			</Sequence>

			<Sequence from={135} durationInFrames={425} layout="none">
				<PostureScene />
			</Sequence>

			<Sequence from={195} durationInFrames={120} layout="none">
				<MascotSpeech text={speech.question} tone="question" layout="mini" />
			</Sequence>

			<Sequence from={300} durationInFrames={120} layout="none">
				<MascotSpeech text={speech.warning} tone="warning" layout="mini" />
			</Sequence>

			<Sequence from={420} durationInFrames={140} layout="none">
				<MascotSpeech text={speech.success} tone="success" layout="hero" exitStart={118} exitDuration={18} />
			</Sequence>

			<Sequence from={560} durationInFrames={190} layout="none">
				<ChecklistScene
					eyebrow={checklist.eyebrow}
					title={checklist.title}
					subtitle={checklist.subtitle}
					note={checklist.note}
					items={[checklist.item1, checklist.item2, checklist.item3, checklist.item4]}
				/>
			</Sequence>

			<Sequence from={730} durationInFrames={140} layout="none">
				<ClosingFrame titleLine1={closing.titleLine1} titleLine2={closing.titleLine2} subtitle={closing.subtitle} />
			</Sequence>

			<div style={{opacity: footerLogoOpacity}}>
				<div style={{
					position: 'absolute', bottom: 48, right: 64,
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					width: 430, height: 82, padding: '13px 26px',
					background: 'rgba(255,255,255,0.85)', borderRadius: 14,
					boxShadow: '0 6px 24px rgba(47,127,153,0.10)', backdropFilter: 'blur(6px)',
				}}>
					<Img src={staticFile('logo-dr-cliente-mrv.png')} style={{width: 378, height: 56, objectFit: 'contain'}} />
				</div>
			</div>
		</AbsoluteFill>
	);
};
