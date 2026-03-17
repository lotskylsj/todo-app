import axios from 'axios'

const API_KEY = 'c55d8dfe7e1c4eb09eb95eebb024263e.x5g0skNfBQVE1L3Q'

export type Priority = 'high' | 'medium' | 'low'

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
            content: Priority
        }
    }[]
}

export async function getPriority(content: string): Promise<Priority | null> {
    try {
        const response = await axios.post<ChatCompletionResponse>(
            'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            {
                model: 'glm-4-flash',
                messages: [
                    {
                        role: 'system', content: `你是一个优先级判断助手。根据用户输入的待办内容，只返回“high”“medium”“low”其中一个字:
                    - 高：涉及截止日期、老板、客户、紧急事故、重要会议、项目关键节点
                    - 中：日常工作、常规会议、非紧急但重要的事务
                    - 低：个人琐事、可推迟事项、休闲活动
                    输入“明天上午十点向CEO汇报工作” → 输出“high”
                    输入“下午三点和同事讨论需求” → 输出“medium”
                    输入“晚上买牛奶” → 输出“low”
                    不要输出任何解释。
                    不要多余解释。` },
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
        return response.data.choices[0].message.content
    } catch (error) {
        console.error('获取优先级失败:', error)
        return null
    }
}