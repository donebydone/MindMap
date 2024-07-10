import { PaletteElement } from '@/utils/types';
import fontColorContrast from 'font-color-contrast';

export const palettes: PaletteElement[] = [
	{
		id: 'palette-0',
		name: 'Palette 0',
		colors: ['#0b132b', '#0b132b', '#0b132b', '#0b132b', '#0b132b'],
		root: {
			buildStyles: () => {
				return {
					backgroundColor: '#fff',
					color: '#1E293B',
					borderStyle: 'solid',
					borderWidth: 1,
					borderColor: '#0b132b',
					borderRadius: '10px',
				};
			},
		},
		node: {
			buildStyles: (color: string) => {
				return {
					backgroundColor: 'white',
					borderStyle: 'solid',
					borderWidth: 1,
					borderColor: color,
					color: fontColorContrast('white'),
					borderRadius: '10px',
				};
			},
		},
		edge: {
			buildStyles: (color: string) => {
				return {
					stroke: color,
				};
			},
			type: 'default',
		},
	},
];
