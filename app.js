import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { analyzeInputWithAI, generateAI } from './agent/agent.js';
import { searchArticles } from './services/doaj.js';

const rl = readline.createInterface({ input, output });

async function startCli() {

    console.log('Dobby AJ - Sentient AI Agent for DOAJ articles');
    console.log('='.repeat(50));
    console.log('I want to analyze the articles you need based on your commands or explanation.');
    console.log('Example: "I want to search for articles about the impact of AI on human life in the future"');
    console.log('='.repeat(50));

    try {

        const userInput = await rl.question('\n➡️  Input your question / search query: ');
        console.log('\n🤖 Analyzing your request ...');

        // Process user input with AI
        const result = await analyzeInputWithAI(userInput);
        if (!result && Array.isArray(result)) {
            console.log(`❌ Agent: Failed to analyze your request!`);
            return false;
        }
        console.log(`✅ AI Generated: ${result}`);

        console.log('⏳ [DOAJ] Starting to get articles ...');

        let articles = [];

        for (let i = 0; i < result.length; i++) {
            const e = result[i];
            console.log(`⏳ [DOAJ] Searching articles with keyword => ${e}`);

            const data = await searchArticles(e);
            if (data && data.results.length > 0) {
                console.log(`✅ [DOAJ] ${data.results.length} Articles found`);
                for (let m = 0; m < data.results.length; m++) {
                    const n = data.results[m];
                    articles.push(n)
                }
            } else {
                console.log(`❌ [DOAJ] No articles found`);
            }
        }

        console.log(`⏳ [DOAJ] Searching and removing duplicate articles.. `);
        const newArticles = [
            ...new Map(articles.map(item => [item.id, item])).values()
        ];

        console.log(`🤖 [AGENT] Generating prompt data... `);
        let promtData = '';
        for (let h = 0; h < newArticles.length; h++) {
            const b = newArticles[h];
            promtData += `
---------------
Title:
${b.bibjson.title}

Abstract:
${b.bibjson.abstract}

Link:
${b.bibjson.link[0]?.url}
\n
`
        }

        console.log('🤖 [AGENT] Thinking ...');
        const aiResult = await generateAI(`
            User Input: ${userInput}

            DOAJ result Data: 
            ${promtData}
            `)

        console.log(`\n======================= RESULT =======================\n`);

        console.log(aiResult);

        console.log(`\n====================== END RESULT ======================\n`);

    } catch (err) {
        console.error('Failed to process your input:', err);
    } finally {
        rl.close();
    }
}

startCli();
