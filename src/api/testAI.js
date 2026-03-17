import axios from 'axios'

async function testAI() {
  const response = await axios.post(
    'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    {
      model: 'glm-4-flash',
      messages: [
        { role: 'system', content: '你是一个优先级判断助手。根据用户输入的待办内容，只返回“高”“中”“低”其中一个字，不要多余解释。' },
        { role: 'user', content: '明天上午十点开会' }
      ]
    },
    {
      headers: {
        'Authorization': 'c55d8dfe7e1c4eb09eb95eebb024263e.x5g0skNfBQVE1L3Q',
        'Content-Type': 'application/json'
      }
    }
  )
  console.log(response.data.choices[0].message.content)
}

testAI()