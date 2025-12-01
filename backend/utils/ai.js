// backend/utils/ai.js - Production-ready AI ticket analyzer

const analyzeTicket = async (ticket) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error(" GEMINI_API_KEY not configured in .env");
            return getFallbackAnalysis(ticket);
        }

        const prompt = `You are an expert technical support ticket analyzer. Analyze this ticket and provide structured data.

Ticket Details:
Title: ${ticket.title}
Description: ${ticket.description}

Provide your analysis in this EXACT JSON format (no markdown, no code fences):
{
  "summary": "brief 1-2 sentence summary",
  "priority": "low|medium|high",
  "helpfulNotes": "detailed analysis with troubleshooting steps and relevant documentation links",
  "relatedSkills": ["skill1", "skill2", "skill3"]
}

Priority Guidelines:
- high: System down, security issues, data loss, critical bugs
- medium: Feature not working, performance issues, user experience problems
- low: Minor bugs, feature requests, questions

Skills should include specific technologies mentioned (e.g., React, Node.js, MongoDB, Python, Docker, AWS, etc.)

Respond with ONLY the JSON object.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-preview-03-25:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.4,
                        topP: 0.95,
                        topK: 40,
                        maxOutputTokens: 2048,
                    },
                    safetySettings: [
                        {
                            category: "HARM_CATEGORY_HARASSMENT",
                            threshold: "BLOCK_NONE"
                        },
                        {
                            category: "HARM_CATEGORY_HATE_SPEECH",
                            threshold: "BLOCK_NONE"
                        }
                    ]
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(` Gemini API error (${response.status}):`, errorText);
            return getFallbackAnalysis(ticket);
        }

        const data = await response.json();

        // Check if the response contains candidates
        if (!data.candidates || data.candidates.length === 0) {
            console.error("No candidates in Gemini response:", data);
            return getFallbackAnalysis(ticket);
        }

        const aiText = data.candidates[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            console.error(" No text content in Gemini response");
            return getFallbackAnalysis(ticket);
        }

        // Clean and parse the response
        const cleaned = aiText
            .replace(/```json\n?/g, "")
            .replace(/```\n?/g, "")
            .trim();

        const match = cleaned.match(/\{[\s\S]*\}/);
        const jsonText = match ? match[0] : cleaned;

        let parsed = JSON.parse(jsonText);

        // Validate and sanitize the response
        parsed = {
            summary: parsed.summary || ticket.title,
            priority: ["low", "medium", "high"].includes(parsed.priority)
                ? parsed.priority
                : "medium",
            helpfulNotes: parsed.helpfulNotes || "Please review this ticket manually.",
            relatedSkills: Array.isArray(parsed.relatedSkills)
                ? parsed.relatedSkills.filter(s => typeof s === "string" && s.length > 0)
                : []
        };

        // Ensure we have at least some skills
        if (parsed.relatedSkills.length === 0) {
            parsed.relatedSkills = extractSkillsFromText(ticket.title + " " + ticket.description);
        }

        console.log(" AI Analysis successful:", {
            priority: parsed.priority,
            skillsFound: parsed.relatedSkills.length,
            skills: parsed.relatedSkills
        });

        return parsed;

    } catch (err) {
        console.error(" AI Analysis failed:", err.message);
        return getFallbackAnalysis(ticket);
    }
};

// Fallback analysis when AI fails
function getFallbackAnalysis(ticket) {
    const extractedSkills = extractSkillsFromText(ticket.title + " " + ticket.description);

    console.log(" Using fallback analysis with extracted skills:", extractedSkills);

    return {
        summary: ticket.title || "Support ticket",
        priority: determinePriorityFromText(ticket.title + " " + ticket.description),
        helpfulNotes: "AI analysis unavailable. This ticket requires manual review. " +
            "Please check the description for technical details and user impact.",
        relatedSkills: extractedSkills
    };
}

// Extract skills from text using keyword matching
function extractSkillsFromText(text) {
    const skillKeywords = {
        // Frontend
        "React": ["react", "reactjs", "jsx", "hooks"],
        "Vue": ["vue", "vuejs", "nuxt"],
        "Angular": ["angular", "ng"],
        "JavaScript": ["javascript", "js", "es6", "typescript", "ts"],
        "HTML": ["html", "html5"],
        "CSS": ["css", "scss", "sass", "tailwind", "bootstrap"],

        // Backend
        "Node.js": ["node", "nodejs", "express", "expressjs"],
        "Python": ["python", "django", "flask", "fastapi"],
        "Java": ["java", "spring", "springboot"],
        "PHP": ["php", "laravel", "symfony"],
        "Ruby": ["ruby", "rails"],
        "Go": ["golang", "go"],

        // Databases
        "MongoDB": ["mongodb", "mongo", "mongoose"],
        "PostgreSQL": ["postgres", "postgresql", "psql"],
        "MySQL": ["mysql", "mariadb"],
        "Redis": ["redis", "cache"],

        // DevOps & Cloud
        "Docker": ["docker", "container"],
        "Kubernetes": ["kubernetes", "k8s"],
        "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda"],
        "Azure": ["azure", "microsoft cloud"],
        "Git": ["git", "github", "gitlab"],
        "CI/CD": ["jenkins", "github actions", "gitlab ci"],

        // Mobile
        "React Native": ["react native", "react-native"],
        "Flutter": ["flutter", "dart"],
        "iOS": ["ios", "swift", "objective-c"],
        "Android": ["android", "kotlin"],

        // Other
        "GraphQL": ["graphql", "apollo"],
        "REST API": ["rest", "api", "restful"],
        "WebSocket": ["websocket", "socket.io"],
        "Authentication": ["auth", "jwt", "oauth", "login", "signin"],
        "Testing": ["testing", "jest", "mocha", "cypress", "selenium"]
    };

    const lowerText = text.toLowerCase();
    const foundSkills = [];

    for (const [skill, keywords] of Object.entries(skillKeywords)) {
        if (keywords.some(keyword => lowerText.includes(keyword))) {
            foundSkills.push(skill);
        }
    }

    // If no specific skills found, assign general category
    if (foundSkills.length === 0) {
        if (lowerText.includes("frontend") || lowerText.includes("ui") || lowerText.includes("design")) {
            foundSkills.push("Frontend");
        } else if (lowerText.includes("backend") || lowerText.includes("server") || lowerText.includes("api")) {
            foundSkills.push("Backend");
        } else if (lowerText.includes("database") || lowerText.includes("db")) {
            foundSkills.push("Database");
        } else {
            foundSkills.push("General");
        }
    }

    return foundSkills;
}

// Determine priority from text patterns
function determinePriorityFromText(text) {
    const lowerText = text.toLowerCase();

    // High priority keywords
    const highPriorityKeywords = [
        "critical", "urgent", "down", "crash", "error", "broken",
        "not working", "production", "security", "data loss", "cannot access"
    ];

    // Low priority keywords
    const lowPriorityKeywords = [
        "question", "how to", "feature request", "enhancement",
        "suggestion", "minor", "cosmetic"
    ];

    if (highPriorityKeywords.some(keyword => lowerText.includes(keyword))) {
        return "high";
    }

    if (lowPriorityKeywords.some(keyword => lowerText.includes(keyword))) {
        return "low";
    }

    return "medium";
}

export default analyzeTicket;