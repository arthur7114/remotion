import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';

export const HelloWorld: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30, 270, 300], [0, 1, 1, 0]);
	const scale = interpolate(frame, [0, 30], [0.5, 1]);

	return (
		<AbsoluteFill className="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					transition: 'all 0.3s',
				}}
				className="text-center"
			>
				<h1 className="text-6xl font-bold text-white mb-4">
					Remotion
				</h1>
				<p className="text-2xl text-white/80">
					Create animations with React
				</p>
			</div>
		</AbsoluteFill>
	);
};
