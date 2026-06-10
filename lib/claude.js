// Claude (Anthropic) client wrapper.
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function ask({ system, messages, maxTokens = 1024 }) {
  const res = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    system,
    messages,
  });
  const text = res.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('\n');
  return text;
}
