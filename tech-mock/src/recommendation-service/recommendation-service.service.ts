import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import OpenAI from 'openai';
import { join } from 'path';

@Injectable()
export class RecommendationServiceService {
  constructor(private configService: ConfigService) {}

  async generate(data): Promise<any> {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    const endpoint = this.configService.get<string>('GITHUB_ENDPOINT');
    const modelName = 'gpt-4.1';
    const client = new OpenAI({ baseURL: endpoint, apiKey: token });
    const systemPrompt = readFileSync(
      join(__dirname, '..', '..', 'src', 'ai', 'prompts', 'system-prompt.txt'),
      'utf-8',
    );

    const userPrompt = readFileSync(
      join(__dirname, '..', '..', 'src', 'ai', 'prompts', 'user-prompt.txt'),
      'utf-8',
    );

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      top_p: 0.8,
      model: modelName,
      max_tokens: 1500,
      n: 1,
      stop: null,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    return response.choices[0].message.content;
  }
}
