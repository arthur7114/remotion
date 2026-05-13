import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Easing} from 'remotion';
import {COLORS, FONT} from '../theme';

/**
 * StairsIncorretaScene — 270 frames
 * Mostra as 2 imagens de uso incorreto em sequência com cross-fade no meio.
 * Frames 0–150:   incorreto 1 (celular na mão, sem segurar corrimão)
 * Frames 130–270: incorreto 2 (segunda situação de risco)
 */
export const StairsIncorretaScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});
	const fadeOut = interpolate(frame, [248, 270], [1, 0], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});

	// Frame da cena entra deslizando da direita
	const frameEnter = spring({frame, fps, config: {damping: 22, stiffness: 60}});

	// Cross-fade entre as duas imagens incorretas: 130→160
	const img2Opacity = interpolate(frame, [130, 160], [0, 1], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
		easing: Easing.inOut(Easing.ease),
	});

	// Pulso vermelho
	const pulse = Math.sin((frame / fps) * Math.PI * 1.8) * 0.5 + 0.5;

	// Label topo
	const labelEnter = interpolate(frame, [20, 45], [0, 1], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	// Ícone alerta
	const alertEnter = interpolate(frame, [35, 60], [0, 1], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
		easing: Easing.out(Easing.back(1.5)),
	});

	// Indicador "2 de 2" aparece junto com a segunda imagem
	const counterOpacity = interpolate(frame, [145, 165], [0, 1], {
		extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
	});

	const FRAME_X = 740;
	const FRAME_Y = 70;
	const FRAME_W = 1120;
	const FRAME_H = 900;

	return (
		<AbsoluteFill style={{opacity: fadeIn * fadeOut, fontFamily: FONT}}>

			{/* Fundo */}
			<AbsoluteFill style={{
				background: 'linear-gradient(145deg, #F0F4F7 0%, #DDE6EC 100%)',
			}} />

			{/* Frame da ilustração */}
			<div style={{
				position: 'absolute',
				left: FRAME_X + (1 - frameEnter) * 120,
				top: FRAME_Y,
				width: FRAME_W,
				height: FRAME_H,
				borderRadius: 24,
				overflow: 'hidden',
				boxShadow: '0 28px 72px rgba(38,50,56,0.22)',
				border: '3px solid rgba(255,255,255,0.9)',
				opacity: frameEnter,
			}}>
				{/* Imagem incorreta 1 */}
				<Img
					src={staticFile('pilula escadas - uso incorreto 1.png')}
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center center',
					}}
				/>
				{/* Imagem incorreta 2 — cross-fade */}
				<Img
					src={staticFile('pilula escadas - uso incorreto 2.png')}
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center center',
						opacity: img2Opacity,
					}}
				/>
			</div>

			{/* Borda vermelha pulsante */}
			<svg width="1920" height="1080" viewBox="0 0 1920 1080"
				style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
				<defs>
					<filter id="siAlertShadow" x="-40%" y="-40%" width="180%" height="180%">
						<feGaussianBlur stdDeviation="6" />
					</filter>
				</defs>

				<rect
					x={FRAME_X + 2} y={FRAME_Y + 2}
					width={FRAME_W - 4} height={FRAME_H - 4}
					rx="22" fill="none"
					stroke={COLORS.red}
					strokeWidth={3 + pulse * 4}
					strokeDasharray="20 12"
					opacity={(0.4 + pulse * 0.5) * frameEnter}
				/>

				{/* Ícone de alerta */}
				{alertEnter > 0.05 && (
					<g transform={`translate(${FRAME_X + FRAME_W - 80}, ${FRAME_Y - 28})`}
						opacity={alertEnter}>
						<circle cx="40" cy="40" r="38" fill={COLORS.red} filter="url(#siAlertShadow)" />
						<circle cx="40" cy="40" r="38" fill={COLORS.red} />
						<text x="40" y="55" textAnchor="middle"
							fontSize="44" fill="white" fontFamily={FONT} fontWeight="800">!</text>
					</g>
				)}
			</svg>

			{/* Label "USO INCORRETO" topo esquerdo do frame */}
			<div style={{
				position: 'absolute',
				left: FRAME_X + 24,
				top: FRAME_Y + 20,
				opacity: labelEnter,
				transform: `translateY(${(1 - labelEnter) * -16}px)`,
				zIndex: 10,
				display: 'flex',
				alignItems: 'center',
				gap: 14,
			}}>
				<div style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: 12,
					background: COLORS.red,
					color: '#fff',
					padding: '10px 22px',
					borderRadius: 999,
					fontSize: 22,
					fontWeight: 800,
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					boxShadow: `0 6px 20px ${COLORS.red}66`,
				}}>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
						<path d="M12 2L2 20h20L12 2z" fill="none"
							stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
						<line x1="12" y1="10" x2="12" y2="15"
							stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
						<circle cx="12" cy="18" r="1.2" fill="white"/>
					</svg>
					Uso incorreto
				</div>

				{/* Contador "2/2" aparece na segunda imagem */}
				<div style={{
					opacity: counterOpacity,
					background: 'rgba(0,0,0,0.55)',
					color: '#fff',
					padding: '8px 16px',
					borderRadius: 999,
					fontSize: 18,
					fontWeight: 700,
					letterSpacing: '0.08em',
					fontFamily: FONT,
				}}>
					exemplo 2 de 2
				</div>
			</div>

		</AbsoluteFill>
	);
};
