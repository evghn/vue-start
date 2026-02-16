import { token, urlAPI } from './env.api'

export const updateTask = async (task) => {
  // console.log(task)

  const url = `${urlAPI}/tasks/${task.id}`

  const headers = {
    Authorization: `Bearer ${token.value}`,
    'Content-Type': 'application/json',
  }

  const data = JSON.stringify(task)

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: data,
    })

    if (response.ok) {
      // const respData = await response.json()
      // task.value = respData.data[0]
      return true
      // console.log(respData)

      // return response.json()
    }
  } catch (e) {
    console.log(e)
  }
}
