export function returnColumnColor(status: 'to-do' | 'in-progress' | 'done') {
  switch (status) {
    case 'to-do':
      return '#BDE3F6'
    case 'in-progress':
      return '#F5C2C3'
    case 'done':
      return '#BAC3CB'
  }
}

export function returnColumnTitleColor(status: 'to-do' | 'in-progress' | 'done') {
  switch (status) {
    case 'to-do':
      return '#1992DB'
    case 'in-progress':
      return '#E22958'
    case 'done':
      return '#102540'
  }
}

export function returnTaskColor(status: 'to-do' | 'in-progress' | 'done') {
  switch (status) {
    case 'to-do':
      return '#56B1E5'
    case 'in-progress':
      return '#E76B79'
    case 'done':
      return '#4B5E74'
  }
}
