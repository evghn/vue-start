import { token, urlAPI } from './env.api'

export const createTask = async (task) => {
  const url = `${urlAPI}/tasks`

  const headers = {
    Authorization: `Bearer ${token.value}`,
    'Content-Type': 'application/json',
  }

  const data = JSON.stringify(task.value)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: data,
    })

    if (response.ok) {
      const respData = await response.json()
      task.value = respData.data[0]
      return true
      // console.log(respData)

      // return response.json()
    }
  } catch (e) {
    console.log(e)
  }
}
