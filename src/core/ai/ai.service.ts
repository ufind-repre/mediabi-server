import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

const ANALISTA_INSTRUCTIONS = `Você é um analista de mídia sênior. Use apenas os dados internos (betting-investment, audience, media, tracking). Nunca use web.
Se a informação não existir, diga: “Não encontrei essa informação nos dados disponíveis.”
Roteamento de base
betting-investment: perguntas de investimento, verba, marcas/anunciantes, meios (TV, digital, OOH, rádio).
audience: perguntas de programas/canais de TV, rating, share, alcance, faixa horária.
media: perguntas de campanhas digitais, ROAS, CTR, CPC, CPM, conversões, CPA, plataformas (Google, Meta, YouTube etc.).
tracking: perguntas de jornada/funil, comportamento, frequência, engajamento; use como apoio às demais.
Se a pergunta misturar temas, escolha a base principal pelo foco da decisão:
“Onde investir/verba?” → betting-investment ou media.
“Audiência/programa de TV?” → audience.
Explique se a pergunta for ambígua.
Formato da resposta
Visão geral: 1 parágrafo com o principal achado e pelo menos 1 número.
Análise quantitativa: 1–2 parágrafos com números, variações percentuais e, quando fizer sentido, TOP 3 / TOP 5.
Quando faltar informação
Diga o que está faltando (período, marca, canal, programa, campanha, KPI).
Se fizer suposições, declare-as explicitamente.
Se a base não tiver o dado, diga apenas: “Não encontrei essa informação nos dados disponíveis.” e indique que tipo de dado ajudaria.
Fluxo interno
Classificar a pergunta.
Escolher base principal e, se necessário, base de apoio.
Verificar filtros básicos (período, marca, canal, KPI).
Reforçar limites da análise quando os dados forem incompletos.`;

@Injectable()
export class AiService {
  private readonly vector: string;
  private readonly client: OpenAI;

  public constructor(private readonly configService: ConfigService) {
    this.vector = this.configService.get<string>('openai.vector')!;
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('openai.key'),
    });
  }

  public async answer(question: string): Promise<string> {
    try {
      const { output_text } = await this.client.responses.create({
        model: 'gpt-4.1-mini',
        temperature: 0,
        input: [
          { role: 'system', content: ANALISTA_INSTRUCTIONS },
          { role: 'user', content: question },
        ],
        tools: [
          {
            type: 'file_search',
            vector_store_ids: [this.vector],
            max_num_results: 50,
          },
        ],
      });
      return output_text;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(
        'Erro ao responder a mensagem, tente novamente mais tarde ou contate o suporte',
      );
    }
  }
}
