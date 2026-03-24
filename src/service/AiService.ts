import axios from 'axios'

const API_KEY = 'c55d8dfe7e1c4eb09eb95eebb024263e.x5g0skNfBQVE1L3Q'

export type AiAnalysis = {
    priority: 'high' | 'medium' | 'low'
    date: number | null
    category: string
}

interface ChatCompletionRequest {
    model: string
    messages: {
        role: 'system' | 'user' | 'assistant'
        content: string
    }[]
}

interface ChatCompletionResponse {
    choices: {
        message: {
            content: AiAnalysis
        }
    }[]
}

export async function getAiAnalysis(content: string): Promise<AiAnalysis | null> {
    try {
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        const nowTimestamp = Date.now();
        const systemPrompt = `你是一个待办分析助手。当前日期是 ${todayStr}。
        根据用户输入，返回一个 JSON 对象，包含三个字段：
        - priority: "high" 或 "medium" 或 "low"（根据重要性判断）
        - date: 如果用户提到具体日期/时间，返回 "YYYY-MM-DD HH:MM:SS" 格式的字符串；如果没有提到任何时间，返回 todayStr + " 00:00:00"
        - category: 根据用户输入判断待办事项的分类，返回 "work"、"life"、"study" 或 "other"

        时间解析规则：
        - “今天” → 返回 "${todayStr} 00:00:00"
        - “明天” → 返回明天日期的 00:00:00
        - “明天上午十点” → 返回明天日期的 10:00:00
        - “下午三点” → 返回今天日期的 15:00:00
        - 如果用户输入直接是日期格式，如 “2026-3-24 12:00:00”，原样返回
        - 如果用户输入信息没有分析出时间，如 “去喝点奶茶”，返回今天日期的 00:000:00

        分类判断规则：
        - 工作：涉及项目、会议、报告、客户、同事、代码、设计等 → "工作"
        - 生活：涉及购物、家务、聚会、运动、健康、家人、朋友等 → "生活"
        - 学习：涉及读书、课程、考试、技能、培训、笔记等 → "学习"
        - 其他 → "其他"

        只返回 JSON，不要输出任何额外解释。`;
        const response = await axios.post<ChatCompletionResponse>(
            'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            {
                model: 'glm-4-flash',
                messages: [
                    {
                        role: 'system', content: systemPrompt
                    },
                    { role: 'user', content: content }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        let resultContent: any = response.data.choices[0].message.content;
        // 去掉可能的 ```json 和 ``` 包裹
        resultContent = resultContent.replace(/```json\s*|\s*```/g, '').trim();
        let result;
        try {
            result = typeof resultContent === 'string'
                ? JSON.parse(resultContent)
                : resultContent;
        } catch (e) {
            console.error('解析AI返回结果失败:', e);
            return null;
        }
        return {
            priority: result.priority || 'medium',
            date: result.date || null,
            category: result.category || 'other'
        };
    } catch (error) {
        console.error('获取优先级失败:', error)
        return null
    }
}

