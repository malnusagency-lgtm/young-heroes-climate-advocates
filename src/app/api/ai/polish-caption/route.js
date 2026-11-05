export async function POST(request) {
  try {
    const { caption, title, category } = await request.json();

    if (!caption && !title) {
      return new Response(
        JSON.stringify({ error: 'Please enter a title or draft caption to polish.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      process.env.OPENAI_API_KEY;

    // Helper fallback polishing function
    const generateSmartPolish = () => {
      const base = caption?.trim() || title?.trim();
      const cat = category || 'Climate Action';
      // Clean up common drafting artifacts and enhance with journalistic environmental voice
      let polished = base.charAt(0).toUpperCase() + base.slice(1);
      if (!polished.endsWith('.')) polished += '.';
      return `Frontline ${cat}: ${polished} Driving youth-led grassroots climate resilience in community restoration initiatives across Kenya.`;
    };

    // 1. If Gemini API Key is configured
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (geminiKey) {
      const prompt = `You are a professional environmental communications officer for Young Heroes Climate Advocates (YCHA), a youth-led climate NGO in Kenya.
Polish and enhance the following draft photograph caption into an inspiring, factual, concise 1-2 sentence caption suitable for a public environmental gallery.
Title: "${title || ''}"
Category: "${category || 'Climate Action'}"
Draft Caption: "${caption || title || ''}"

Guidelines:
- Maintain complete factual integrity.
- Focus on youth leadership, community impact, or ecological stewardship.
- Keep to 1-2 concise sentences.
- Do NOT use emojis.
- Return ONLY the final polished caption text with no quotes, commentary, or markdown formatting.`;

      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 150,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const polishedText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
          if (polishedText) {
            return new Response(
              JSON.stringify({
                success: true,
                polished: polishedText.replace(/^["']|["']$/g, ''),
                provider: 'Gemini AI',
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (geminiErr) {
        console.warn('[AI Caption] Gemini API call error:', geminiErr.message);
      }
    }

    // 2. If OpenAI API Key is configured
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'You are a communications editor for Young Heroes Climate Advocates (YCHA). Polish captions into 1-2 engaging, journalistic sentences without emojis or quotes.',
              },
              {
                role: 'user',
                content: `Title: ${title || ''}\nCategory: ${category || ''}\nDraft Caption: ${caption || title || ''}`,
              },
            ],
            temperature: 0.4,
            max_tokens: 150,
          }),
        });

        if (openaiRes.ok) {
          const openaiData = await openaiRes.json();
          const polishedText = openaiData?.choices?.[0]?.message?.content?.trim();
          if (polishedText) {
            return new Response(
              JSON.stringify({
                success: true,
                polished: polishedText.replace(/^["']|["']$/g, ''),
                provider: 'OpenAI',
              }),
              { status: 200, headers: { 'Content-Type': 'application/json' } }
            );
          }
        }
      } catch (openaiErr) {
        console.warn('[AI Caption] OpenAI API call error:', openaiErr.message);
      }
    }

    // 3. Fallback polish when API keys are pending
    const fallbackText = generateSmartPolish();
    return new Response(
      JSON.stringify({
        success: true,
        polished: fallbackText,
        notice: 'Configured with editorial polishing engine. Add GEMINI_API_KEY in env.local for live Gemini generation.',
        provider: 'Editorial Engine (Add GEMINI_API_KEY for live LLM)',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Failed to polish caption.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

