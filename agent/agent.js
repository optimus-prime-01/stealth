// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import csv from 'csv-parser';
// import { GoogleGenerativeAI } from "generative-ai";

// class AdAnalyzer {
//     constructor(apiKey) {
//         this.genai = new GoogleGenerativeAI(apiKey);
//         this.model = this.genai.getGenerativeModel({ model: "gemini-pro" });
//     }

//     async analyzeAds(adData) {
//         try {
//             const adSummary = this.formatAdData(adData);
//             await new Promise(resolve => setTimeout(resolve, 1000));

//             const prompt = `
//             Analyze this advertising data and provide:
//             1. A brief 3-4 sentence summary of overall performance
//             2. List of best and worst performing keywords based on ROAS and CTR
//             Data:
//             ${adSummary}
//             `;

//             const result = await this.model.generateContent(prompt);
//             const aiAnalysis = result.response.text();

//             const badKeywords = adData
//                 .filter(entry => entry.acos > 50 || entry.ctr < 0.02)
//                 .map(entry => entry.matchedProduct);

//             const goodKeywords = adData
//                 .filter(entry => !badKeywords.includes(entry.matchedProduct))
//                 .map(entry => entry.matchedProduct);

//             return {
//                 analysis: aiAnalysis,
//                 keywordsToRemove: badKeywords,
//                 keywordsToKeep: goodKeywords
//             };
//         } catch (error) {
//             throw new Error(`Analysis failed: ${error.message}`);
//         }
//     }

//     formatAdData(adData) {
//         return adData.map(entry => 
//             `Matched product: ${entry.matchedProduct}\n` +
//             `- Product targets: ${entry.productTargets}\n` +
//             `- Added as: ${entry.addedAs}\n` +
//             `- Impressions: ${entry.impressions}\n` +
//             `- Clicks: ${entry.clicks}\n` +
//             `- CTR: ${(entry.ctr * 100).toFixed(2)}%\n` +
//             `- Spend (USD): ${entry.spendUSD}\n` +
//             `- CPC (USD): ${entry.cpcUSD}\n` +
//             `- Orders: ${entry.orders}\n` +
//             `- Sales (USD): ${entry.salesUSD}\n` +
//             `- ACOS: ${entry.acos}%\n` +
//             `- ROAS: ${entry.roas}\n` +
//             `- Conversion rate: ${(entry.conversionRate * 100).toFixed(2)}%\n`
//         ).join('\n');
//     }
// }

// function readCSV(filePath) {
//     return new Promise((resolve, reject) => {
//         const results = [];
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data) => results.push({
//                 matchedProduct: data['Matched_product'],
//                 productTargets: data['Product_targets'],
//                 addedAs: data['Added_as'],
//                 impressions: parseInt(data['Impressions']),
//                 clicks: parseInt(data['Clicks']),
//                 ctr: parseFloat(data['CTR']),
//                 spendUSD: parseFloat(data['Spend_USD']),
//                 cpcUSD: parseFloat(data['CPC_USD']),
//                 orders: parseInt(data['Orders']),
//                 salesUSD: parseFloat(data['Sales_USD']),
//                 acos: parseFloat(data['ACOS']),
//                 roas: parseFloat(data['ROAS']),
//                 conversionRate: parseFloat(data['Conversion_rate'])
//             }))
//             .on('end', () => resolve(results))
//             .on('error', (error) => reject(error));
//     });
// }

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// // API Key - REPLACE with your actual key
// const GEMINI_API_KEY = 'AIzaSyDd4F6VGSmIXmigfdxn-xZSE3zxrk1k5G0';

// app.post('/analyze', upload.single('file'), async (req, res) => {
//     try {
//         // Validate file upload
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         // Read and parse CSV
//         const adData = await readCSV(req.file.path);

//         // Analyze ads
//         const analyzer = new AdAnalyzer(GEMINI_API_KEY);
//         const result = await analyzer.analyzeAds(adData);

//         // Remove temporary file
//         fs.unlinkSync(req.file.path);

//         // Send response
//         res.json({
//             analysis: result.analysis,
//             keywordsToRemove: result.keywordsToRemove,
//             keywordsToKeep: result.keywordsToKeep
//         });
//     } catch (error) {
//         console.error('Analysis error:', error);
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import csv from 'csv-parser';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// class AdAnalyzer {
//     constructor(apiKey) {
//         this.genai = new GoogleGenerativeAI(apiKey);
//         this.model = this.genai.getGenerativeModel({ model: "gemini-pro" });
//     }

//     async analyzeAds(adData) {
//         const MAX_RETRIES = 3;
//         let retryCount = 0;
//         let initialDelay = 1000;

//         const adSummary = this.formatAdData(adData);
//         const prompt = `
//         Analyze this advertising data and provide:
//         1. A brief 3-4 sentence summary of overall performance
//         2. List of best and worst performing keywords based on ROAS and CTR
//         Data:
//         ${adSummary}
//         `;

//         while (retryCount < MAX_RETRIES) {
//             try {
//                 const result = await this.model.generateContent(prompt);
//                 const aiAnalysis = result.response.text();

//                 const cleanAnalysis = aiAnalysis
//                     .replace(/\*\*/g, '')
//                     .replace(/\*/g, '')
//                     .replace(/\n/g, ' ')
//                     .replace(/\s+/g, ' ')
//                     .trim();

//                 const badKeywords = adData
//                     .filter(entry => entry.acos > 50 || entry.ctr < 0.02)
//                     .map(entry => entry.matchedProduct)
//                     .filter(Boolean);

//                 const goodKeywords = adData
//                     .filter(entry => !badKeywords.includes(entry.matchedProduct))
//                     .map(entry => entry.matchedProduct)
//                     .filter(Boolean);

//                 return {
//                     analysis: cleanAnalysis,
//                     keywordsToRemove: badKeywords,
//                     keywordsToKeep: goodKeywords
//                 };

//             } catch (error) {
//                 if (error.message.includes('500') && retryCount < MAX_RETRIES) {
//                     const delay = initialDelay * Math.pow(2, retryCount);
//                     console.log(`Retry ${retryCount + 1} after ${delay}ms`);
//                     await new Promise(resolve => setTimeout(resolve, delay));
//                     retryCount++;
//                 } else {
//                     throw new Error(`Analysis failed after ${retryCount} retries: ${error.message}`);
//                 }
//             }
//         }
//         throw new Error('API request failed after maximum retries');
//     }

//     formatAdData(adData) {
//         return adData.map(entry => 
//             `Matched product: ${entry.matchedProduct}\n` +
//             `- Product targets: ${entry.productTargets}\n` +
//             `- Added as: ${entry.addedAs}\n` +
//             `- Impressions: ${entry.impressions}\n` +
//             `- Clicks: ${entry.clicks}\n` +
//             `- CTR: ${(entry.ctr * 100).toFixed(2)}%\n` +
//             `- Spend (USD): ${entry.spendUSD}\n` +
//             `- CPC (USD): ${entry.cpcUSD}\n` +
//             `- Orders: ${entry.orders}\n` +
//             `- Sales (USD): ${entry.salesUSD}\n` +
//             `- ACOS: ${entry.acos}%\n` +
//             `- ROAS: ${entry.roas}\n` +
//             `- Conversion rate: ${(entry.conversionRate * 100).toFixed(2)}%\n`
//         ).join('\n');
//     }
// }

// function readCSV(filePath) {
//     return new Promise((resolve, reject) => {
//         const results = [];
//         fs.createReadStream(filePath)
//             .pipe(csv())
//             .on('data', (data) => results.push({
//                 matchedProduct: data['Matched_product'],
//                 productTargets: data['Product_targets'],
//                 addedAs: data['Added_as'],
//                 impressions: parseInt(data['Impressions']),
//                 clicks: parseInt(data['Clicks']),
//                 ctr: parseFloat(data['CTR']),
//                 spendUSD: parseFloat(data['Spend_USD']),
//                 cpcUSD: parseFloat(data['CPC_USD']),
//                 orders: parseInt(data['Orders']),
//                 salesUSD: parseFloat(data['Sales_USD']),
//                 acos: parseFloat(data['ACOS']),
//                 roas: parseFloat(data['ROAS']),
//                 conversionRate: parseFloat(data['Conversion_rate'])
//             }))
//             .on('end', () => resolve(results))
//             .on('error', (error) => reject(error));
//     });
// }

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// const GEMINI_API_KEY = 'AIzaSyDd4F6VGSmIXmigfdxn-xZSE3zxrk1k5G0';

// app.post('/analyze', upload.single('file'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }

//         const adData = await readCSV(req.file.path);
//         const analyzer = new AdAnalyzer(GEMINI_API_KEY);
//         const result = await analyzer.analyzeAds(adData);

//         fs.unlinkSync(req.file.path);

//         res.json({
//             analysis: result.analysis,
//             keywordsToRemove: result.keywordsToRemove,
//             keywordsToKeep: result.keywordsToKeep
//         });

//     } catch (error) {
//         console.error('Final error:', error.message);
//         const statusCode = error.message.includes('500') ? 502 : 500;
//         res.status(statusCode).json({ 
//             error: error.message.includes('retries') 
//                 ? 'Service temporarily unavailable. Please try again later.'
//                 : error.message 
//         });
//     }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


/////////////



import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';

const app = express();

// Allow requests from frontend running on http://localhost:5173
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || origin === 'http://localhost:5173' || origin === 'http://localhost:5173/') {
            callback(null, true);
        } else {
            callback(new Error('CORS policy violation'), false);
        }
    },
}));


class AdAnalyzer {
    constructor(apiKey) {
        this.genai = new GoogleGenerativeAI(apiKey);
        this.model = this.genai.getGenerativeModel({ model: "gemini-pro" });
    }

    async analyzeAds(adData) {
        const MAX_RETRIES = 3;
        let retryCount = 0;
        let initialDelay = 1000;

        const adSummary = this.formatAdData(adData);
        const prompt = `
        Analyze this advertising data and provide:
        1. A brief 3-4 sentence summary of overall performance
        2. List of best and worst performing keywords based on ROAS and CTR
        Data:
        ${adSummary}
        `;

        while (retryCount < MAX_RETRIES) {
            try {
                const result = await this.model.generateContent(prompt);
                const aiAnalysis = result.response.text();

                const cleanAnalysis = aiAnalysis
                    .replace(/\*\*/g, '')
                    .replace(/\*/g, '')
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();

                const badKeywords = adData
                    .filter(entry => entry.acos > 50 || entry.ctr < 0.02)
                    .map(entry => entry.matchedProduct)
                    .filter(Boolean);

                const goodKeywords = adData
                    .filter(entry => !badKeywords.includes(entry.matchedProduct))
                    .map(entry => entry.matchedProduct)
                    .filter(Boolean);

                return {
                    analysis: cleanAnalysis,
                    keywordsToRemove: badKeywords,
                    keywordsToKeep: goodKeywords
                };

            } catch (error) {
                if (error.message.includes('500') && retryCount < MAX_RETRIES) {
                    const delay = initialDelay * Math.pow(2, retryCount);
                    console.log(`Retry ${retryCount + 1} after ${delay}ms`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    retryCount++;
                } else {
                    throw new Error(`Analysis failed after ${retryCount} retries: ${error.message}`);
                }
            }
        }
        throw new Error('API request failed after maximum retries');
    }

    formatAdData(adData) {
        return adData.map(entry => 
            `Matched product: ${entry.matchedProduct}\n` +
            `- Product targets: ${entry.productTargets}\n` +
            `- Added as: ${entry.addedAs}\n` +
            `- Impressions: ${entry.impressions}\n` +
            `- Clicks: ${entry.clicks}\n` +
            `- CTR: ${(entry.ctr * 100).toFixed(2)}%\n` +
            `- Spend (USD): ${entry.spendUSD}\n` +
            `- CPC (USD): ${entry.cpcUSD}\n` +
            `- Orders: ${entry.orders}\n` +
            `- Sales (USD): ${entry.salesUSD}\n` +
            `- ACOS: ${entry.acos}%\n` +
            `- ROAS: ${entry.roas}\n` +
            `- Conversion rate: ${(entry.conversionRate * 100).toFixed(2)}%\n`
        ).join('\n');
    }
}

function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push({
                matchedProduct: data['Matched_product'],
                productTargets: data['Product_targets'],
                addedAs: data['Added_as'],
                impressions: parseInt(data['Impressions']),
                clicks: parseInt(data['Clicks']),
                ctr: parseFloat(data['CTR']),
                spendUSD: parseFloat(data['Spend_USD']),
                cpcUSD: parseFloat(data['CPC_USD']),
                orders: parseInt(data['Orders']),
                salesUSD: parseFloat(data['Sales_USD']),
                acos: parseFloat(data['ACOS']),
                roas: parseFloat(data['ROAS']),
                conversionRate: parseFloat(data['Conversion_rate'])
            }))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

// const app = express();
const upload = multer({ dest: 'uploads/' });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBYQ4UGgteySBp25vJ4PuOsr6NMYi4ZDQM';

app.post('/analyze', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const adData = await readCSV(req.file.path);
        const analyzer = new AdAnalyzer(GEMINI_API_KEY);
        const result = await analyzer.analyzeAds(adData);

        fs.unlinkSync(req.file.path);

        res.json({
            analysis: result.analysis,
            keywordsToRemove: result.keywordsToRemove,
            keywordsToKeep: result.keywordsToKeep
        });

    } catch (error) {
        console.error('Error in /analyze route:', error);
        const statusCode = error.message.includes('500') ? 502 : 500;
        res.status(statusCode).json({ 
            error: error.message.includes('retries') 
                ? 'Service temporarily unavailable. Please try again later.'
                : `Error analyzing file: ${error.message}`
        });
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



///////////
