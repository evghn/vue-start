import { token, urlAPI } from './env.api'

export const getTasks = async () => {
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
