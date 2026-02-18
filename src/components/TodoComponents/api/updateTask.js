import { http, token, urlAPI } from './env.api'

export const updateTaskOld = async (task) => {
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

export const updateTask = async (task) => {
  try {
    const response = await http.patch(`/tasks/${task.id}`, task)
    return response.status === 200
  } catch (e) {
    console.log(e)
  }
}
