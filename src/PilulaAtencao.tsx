import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {COLORS, FONT} from './theme';
import {BackgroundGrid} from './components/BackgroundGrid';
import {IntroScene} from './components/IntroScene';
import {AtencaoIncorretaScene} from './components/AtencaoIncorretaScene';
import {AtencaoCorretaScene} from './components/AtencaoCorretaScene';
import {ChecklistScene} from './components/ChecklistScene';
import {ClosingFrame} from './components/ClosingFrame';
import {MascotSpeech} from './components/MascotSpeech';
import {defaultPilulaAtencaoProps, type PilulaAtencaoProps} from './pilulaProps';

/**
 * PilulaAtencao — 1920×1080 | 30fps | 30s (900 frames)
 *
 * Timeline:
 *   0–135   (4.5s)  IntroScene
 * 135–435   (10.0s) AtencaoIncorretaScene — improviso de risco, borda vermelha
 *   ↳ 195–315       MascotSpeech hero/question
 *   ↳ 315–435       MascotSpeech hero/warning (+30f loop)
 * 435–590   (5.2s)  AtencaoCorretaScene — procedimento correto, borda verde
 *   ↳ 450–590       MascotSpeech hero/success
 * 590–760   (5.7s)  ChecklistScene
 * 760–900   (4.7s)  ClosingFrame
 */
export const PilulaAtencao: React.FC<PilulaAtencaoProps> = ({
	intro,
	speech,
	checklist,
	closing,
} = defaultPilulaAtencaoProps) => {
	const frame = useCurrentFrame();

	const footerLogoOpacity = interpolate(frame, [134, 150, 885, 895], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{backgroundColor: COLORS.bg, fontFamily: FONT}}>
			<BackgroundGrid />

			{/* ══ BLOCO 1 | 0-135 | Intro ══════════════════════════════════════ */}
			<Sequence from={0} durationInFrames={135} layout="none">
				<IntroScene {...intro} />
			</Sequence>

			{/* ══ BLOCO 2 | 135-435 | Improviso INCORRETO ════════════════════ */}
			<Sequence from={135} durationInFrames={300} layout="none">
				<AtencaoIncorretaScene />
			</Sequence>

			{/* Fala 1 — pergunta */}
			<Sequence from={195} durationInFrames={120} layout="none">
				<MascotSpeech text={speech.question} tone="question" layout="hero" exitStart={100} exitDuration={16} />
			</Sequence>

			{/* Fala 2 — alerta (+30f para bater 30s) */}
			<Sequence from={315} durationInFrames={120} layout="none">
				<MascotSpeech text={speech.warning} tone="warning" layout="hero" exitStart={102} exitDuration={16} />
			</Sequence>

			{/* ══ BLOCO 3 | 435-590 | Procedimento CORRETO ════════════════════ */}
			<Sequence from={435} durationInFrames={155} layout="none">
				<AtencaoCorretaScene totalDuration={155} />
			</Sequence>

			{/* Fala 3 — sucesso */}
			<Sequence from={450} durationInFrames={140} layout="none">
				<MascotSpeech text={speech.success} tone="success" layout="hero" exitStart={118} exitDuration={18} />
			</Sequence>

			{/* ══ BLOCO 4 | 590-760 | Checklist ═══════════════════════════════ */}
			<Sequence from={590} durationInFrames={170} layout="none">
				<ChecklistScene
					eyebrow={checklist.eyebrow}
					title={checklist.title}
					subtitle={checklist.subtitle}
					note={checklist.note}
					items={[checklist.item1, checklist.item2, checklist.item3, checklist.item4]}
				/>
			</Sequence>

			{/* ══ BLOCO 5 | 760-900 | Closing ══════════════════════════════════ */}
			<Sequence from={760} durationInFrames={140} layout="none">
				<ClosingFrame
					titleLine1={closing.titleLine1}
					titleLine2={closing.titleLine2}
					subtitle={closing.subtitle}
				/>
			</Sequence>

			{/* ── Logo parceria — sempre em primeiro plano ─────────────────────── */}
			<div style={{
				opacity: footerLogoOpacity,
				position: 'absolute',
				inset: 0,
				zIndex: 200,
				pointerEvents: 'none',
			}}>
				<div style={{
					position: 'absolute',
					bottom: 48,
					left: 64,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '13px 26px',
					background: 'rgba(255,255,255,0.88)',
					borderRadius: 14,
					boxShadow: '0 6px 24px rgba(47,127,153,0.10)',
					backdropFilter: 'blur(6px)',
				}}>
					<Img
						src={staticFile('logo-parceria-aon.png')}
						style={{width: 378, height: 56, objectFit: 'contain'}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};
