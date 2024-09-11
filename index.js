// Chatbox AI Module by Kenneth Panio

const axios = require("axios");
const randomUseragent = require("random-useragent");

const conversationHistories = {};
let webSearchMode = false;
let codeModelMode = false;

async function chatbox(userId = "default", question) {
    
    if (!question) {
        throw new Error("Please provide a question!");
    }

    conversationHistories[userId] = conversationHistories[userId] || [];
    conversationHistories[userId].push({
        role: "user",
        content: question
    });

    let attemptCount = 0;
    let responseReceived = false;
    let responseText = '';

    while (attemptCount < 3 && !responseReceived) {
        try {
            const response = await axios.post("https://www.blackbox.ai/api/chat", {
                messages: conversationHistories[userId],
                clickedContinue: false,
                previewToken: null,
                codeModelMode,
                agentMode: {},
                trendingAgentMode: {},
                isMicMode: false,
                isChromeExt: false,
                clickedAnswer2: false,
                clickedAnswer3: false,
                githubToken: null,
                webSearchMode,
                visitFromDelta: true,
                mobileClient: true,
                maxTokens: '999999999999'
            }, {
                headers: {
                    "User-Agent": randomUseragent.getRandom()
                }
            });

            responseText = response.data.replace(/\$@\$(.*?)\$@\$/g, '').trim();
            responseReceived = true;
        } catch (error) {
            attemptCount++;
            if (attemptCount < 3) {
                console.log(`No response from ChatBox AI. Retrying... (${attemptCount} of 3 attempts)`);
                await new Promise(resolve => setTimeout(resolve, 1000 * attemptCount));
            } else {
                throw new Error(`No response from Chatbox AI. Please try again later: ${error.message}`);
            }
        }
    }

    if (responseReceived) {
        conversationHistories[userId].push({
            role: "assistant",
            content: responseText
        });

        responseText = replaceTerms(responseText);

        if (webSearchMode) {
            try {
                const sources = extractSources(responseText);
                responseText = responseText.replace(/\$~~~\$[\s\S]*?\$~~~\$/g, '').trim();

                if (sources.length > 0) {
                    responseText += "\n\nTop Sources:\n\n" + sources.map((source, index) =>
                        `${index + 1}. ${source.title}\n${source.snippet}\n${source.link}`
                    ).join("\n\n");
                }
            } catch (error) {
                console.error("Error extracting sources:", error);
            }
        }

        return responseText;
    }
}

function toggle() {
    webSearchMode = !webSearchMode;
    return `Web search mode has been ${webSearchMode ? "enabled": "disabled"}.`;
}

function code() {
    codeModelMode = !codeModelMode;
    return `Code model mode has been ${codeModelMode ? "enabled": "disabled"}.`;
}

function clear(userId) {
    conversationHistories[userId] = [];
    return "Conversation history cleared.";
}

function extractSources(text) {
    const sources = [];
    let match;
    const sourceRegex = /\{.*?"title":\s*"(.*?)".*?"link":\s*"(.*?)".*?"snippet":\s*"(.*?)".*?\}/g;

    while ((match = sourceRegex.exec(text)) !== null) {
        const title = decodeUnicode(match[1]).trim();
        const link = match[2].trim();
        const snippet = decodeUnicode(match[3]).replace(/\\n/g, " ").trim();

        sources.push({
            title,
            link,
            snippet
        });
    }

    return sources;
}

function replaceTerms(text) {
    const replacements = {
        "LLaMA": "HAJI-CHATBOX",
        "Meta AI": "Kenneth Panio",
        "BLACKBOX AI": "HAJI-CHATBOX ATOMIC",
        "Coding Assistant": "HAJI-CHATBOX",
        "a team of developers": "Kenneth Panio",
        "a team of brilliant developers at": "Kenneth Panio",
        "a team of skilled software developers": "Kenneth Panio",
        "Codey": "HAJI-CHATBOX",
        "BERT": "HAJI-CHATBOX",
        "Developed by Google": "Developed by Kenneth Panio"
    };

    Object.keys(replacements).forEach(term => {
        text = text.replace(new RegExp(term, "g"), replacements[term]);
    });

    return text;
}

function decodeUnicode(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, unicode =>
        String.fromCharCode(parseInt(unicode.replace(/\\u/g, ''), 16))
    );
}

module.exports = {
    chatbox,
    toggle,
    clear,
    code
};