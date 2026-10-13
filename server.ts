import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '15mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_PROMPT = `You are extracting a tax-reconciliation disclosure from an Indian listed company annual report.

Return JSON only. Do not calculate, infer, or fill missing values.
Use only values explicitly stated in the supplied pages.

Fields:
- company_name
- financial_year
- annual_report_page
- reporting_currency
- reporting_unit
- profit_before_tax
- current_tax_expense
- deferred_tax_expense
- total_tax_expense
- reported_effective_tax_rate
- statutory_tax_rate
- reconciliation_items: [
  {
    "label_as_reported": "",
    "category": "permanent_difference | timing_difference | incentive | prior_year_adjustment | other",
    "amount": null,
    "rate_effect": null,
    "page_reference": ""
  }
]
- extraction_notes
- missing_or_ambiguous_items

If a value is absent, use null. Preserve negative signs exactly.`;

// Extraction endpoint
app.post('/api/extract', async (req, res) => {
  try {
    const { page_content, page_number } = req.body;

    if (!page_content || typeof page_content !== 'string' || !page_content.trim()) {
      return res.status(400).json({ error: 'Please provide page content or text from the annual report.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'GEMINI_API_KEY is not configured on the server. Please verify your environment settings.' 
      });
    }

    const promptText = `Supplied Annual Report Page Content:
${page_number ? `Report Page Reference / Number: ${page_number}\n` : ''}
--- BEGIN SUPPLIED PAGES ---
${page_content}
--- END SUPPLIED PAGES ---

Extract the tax-reconciliation disclosure strictly adhering to the schema and instructions. Return JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.0, // Zero temperature to ensure deterministic adherence to explicit text
      },
    });

    const rawText = response.text || '';
    
    // Clean any markdown formatting if present
    const cleanedJsonStr = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    try {
      const parsedJson = JSON.parse(cleanedJsonStr);
      return res.json({
        success: true,
        data: parsedJson,
        raw: rawText,
      });
    } catch (parseErr) {
      return res.status(500).json({
        error: 'Model response was not valid JSON.',
        raw: rawText,
      });
    }
  } catch (error: any) {
    console.error('Extraction error:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to extract tax reconciliation disclosure.',
    });
  }
});

// Vite Middleware for development / Static files for production
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
