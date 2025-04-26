import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import OpenAI from 'openai';
import { join } from 'path';

@Injectable()
export class RecommendationServiceService {
  constructor(private configService: ConfigService) {}

  private readPromptFile(fileName: string): string {
    return readFileSync(
      join(__dirname, '..', '..', 'src', 'ai', 'prompts', fileName),
      'utf-8',
    );
  }

  async generate(data): Promise<any> {
    // Obteniendo el token de autenticación desde la configuración.
    const token = this.configService.get<string>('GITHUB_TOKEN');

    // Obteniendo el endpoint de GitHub Models desde la configuración.
    const endpoint = this.configService.get<string>('GITHUB_ENDPOINT');

    // Definiendo el nombre del modelo que vamos a usar.
    const modelName = 'gpt-4.1';

    // Creando una instancia del cliente OpenAI configurada con nuestro endpoint y token.
    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    // Leyendo los prompts que guiarán la conversación: uno para el sistema y otro para el usuario.
    const systemPrompt = this.readPromptFile('system-prompt.txt');
    const userPrompt = this.readPromptFile('user-prompt.txt');

    // Enviando la solicitud al modelo, configurando los mensajes y parámetros de la generación.
    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt }, // Mensaje de contexto para definir el comportamiento del modelo.
        { role: 'user', content: userPrompt }, // Mensaje que representa la consulta o petición del usuario.
      ],
      temperature: 0.3, // Controla la creatividad de la respuesta: valores bajos son más predecibles.
      top_p: 0.8, // Controla la diversidad de las palabras elegidas en la respuesta.
      model: modelName, // Indicamos el modelo específico que debe usarse.
      max_tokens: 1500, // Define el número máximo de tokens en la respuesta.
      n: 1, // Indicamos que solo queremos una respuesta.
      stop: null, // No configuramos un patrón de parada específico.
      presence_penalty: 0, // No penalizamos por introducir temas nuevos.
      frequency_penalty: 0, // No penalizamos la repetición de palabras o frases.
    });

    // Retornamos el contenido del primer mensaje generado por el modelo.
    return response.choices[0].message.content;
  }
}
