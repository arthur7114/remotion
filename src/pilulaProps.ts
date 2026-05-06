import {zTextarea} from '@remotion/zod-types';
import {z} from 'zod';

export const pilulaSaidasEmergenciaSchema = z.object({
	intro: z.object({
		eyebrow: z.string(),
		titlePrefix: z.string(),
		titleHighlight: z.string(),
		sticker: z.string(),
	}),
	speech: z.object({
		question: zTextarea(),
		warning: zTextarea(),
		success: zTextarea(),
	}),
	checklist: z.object({
		eyebrow: z.string(),
		title: z.string(),
		subtitle: zTextarea(),
		note: zTextarea(),
		item1: z.string(),
		item2: z.string(),
		item3: z.string(),
		item4: z.string(),
	}),
	closing: z.object({
		titleLine1: z.string(),
		titleLine2: z.string(),
		subtitle: zTextarea(),
	}),
});

export type PilulaSaidasEmergenciaProps = z.infer<
	typeof pilulaSaidasEmergenciaSchema
>;

export const defaultPilulaSaidasEmergenciaProps: PilulaSaidasEmergenciaProps = {
	intro: {
		eyebrow: 'Mapa de risco',
		titlePrefix: 'Saídas de',
		titleHighlight: 'emergência',
		sticker: 'SEGURANÇA',
	},
	speech: {
		question: 'Você percebe o que está errado?',
		warning: 'Saída obstruída atrasa a evacuação.',
		success: 'Agora sim: rota livre.',
	},
	checklist: {
		eyebrow: 'Checagem de 30 segundos',
		title: 'Saída livre não é detalhe.',
		subtitle:
			'Antes de encerrar a atividade, olhe para o acesso como quem vai precisar passar por ele.',
		note: 'Se bloqueou, corrija antes de seguir.',
		item1: 'Retire caixas, pallets e cabos do caminho',
		item2: 'Teste se a porta abre sem esforço',
		item3: 'Confira placas e luzes visíveis',
		item4: 'Avise a equipe se algo voltar a bloquear',
	},
	closing: {
		titleLine1: 'Mantenha os',
		titleLine2: 'acessos livres.',
		subtitle: 'Pequenas atitudes evitam acidentes.',
	},
};
