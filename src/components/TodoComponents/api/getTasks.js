import { http, token, urlAPI } from './env.api'

export const getTasksOld = async () => {
  const url = `${urlAPI}/tasks`

  const headers = {
    Authorization: `Bearer ${token.value}`,
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    })

    if (response.ok) {
      const data = await response.json()
      const result = []
      data.data.forEach((item) => {
        result.push(JSON.parse(item))
      })
      return result
    }
  } catch (e) {
    console.log(e)
  }
}

export const getTasks = async () => {
  try {
    const response = await http.get(`/tasks`)

    if (response.status === 200) {
      return response.data.data.map((item) => JSON.parse(item))
    }
  } catch (e) {
    console.log(e)
  }
}
