import { ref } from 'vue'

export const levels = [
  { id: 0, text: '', alias: '' },
  { id: 1, text: 'Легкая', alias: 'low' },
  { id: 2, text: 'Средняя', alias: 'middle' },
  { id: 3, text: 'Сложная', alias: 'hard' },
]

export const statuses = [
  { id: 0, text: '', alias: '' },
  { id: 1, text: 'Новая', alias: 'new' },
  { id: 2, text: 'В процессе', alias: 'processing' },
  { id: 3, text: 'Выполнена', alias: 'ready' },
  { id: 4, text: 'Удалена', alias: 'remove' },
]

export const getStatusText = (id) => {
  const index = statuses.findIndex((item) => item.id == id)

  if (index !== -1) {
    return statuses[index].text
  }
}

export const getStatusId = (value) => {
  let index = statuses.findIndex((item) => item.text.toLowerCase().includes(value.toLowerCase()))
  if (index !== -1) {
    return statuses[index].id
  }

  index = statuses.findIndex((item) => item.alias.toLowerCase().includes(value.toLowerCase()))
  if (index !== -1) {
    return statuses[index].id
  }
}

export const getLevelId = (value) => {
  let index = levels.findIndex((item) => item.text.toLowerCase().includes(value.toLowerCase()))
  if (index !== -1) {
    return levels[index].id
  }

  index = levels.findIndex((item) => item.alias.toLowerCase().includes(value.toLowerCase()))
  if (index !== -1) {
    return levels[index].id
  }
}

export const getBgLevel = (level_id) => {
  return {
    low: level_id == getLevelId('low'),
    middle: level_id == getLevelId('middle'),
    hard: level_id == getLevelId('hard'),
    'class-item': true,
  }
}

export const getBgStatus = (status_id) => {
  return {
    new: status_id == getStatusId('new'),
    processing: status_id == getStatusId('processing'),
    ready: status_id == getStatusId('ready'),
    remove: status_id == getStatusId('remove'),
  }
}
