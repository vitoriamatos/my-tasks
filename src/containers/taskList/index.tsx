import Task from '../../components/task'
import { MainContainer, Title } from '../../styles'

import { useSelector } from 'react-redux'
import { RootReducer } from '../../store'

const TaskList = () => {
  const { itens } = useSelector((state: RootReducer) => state.tasks)
  const { term, criteria, value } = useSelector(
    (state: RootReducer) => state.filters
  )

  const taskFilter = () => {
    let tasksFiltered = itens

    if (term !== undefined) {
      tasksFiltered = itens.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (criteria === 'priority') {
        tasksFiltered = tasksFiltered.filter((item) => item.priority == value)
      } else if (criteria === 'status') {
        tasksFiltered = tasksFiltered.filter((item) => item.status == value)
      }
      return tasksFiltered
    } else {
      return itens
    }
  }

  const showResultFilter = (quantity: number) => {
    let message = ''
    const complementation =
      term !== undefined && term.length > 0 ? `e  "${term}"` : ''

    if (criteria === 'all') {
      message = `${quantity} tarefa(s) encontrada(s) como todas: ${complementation}`
    } else {
      message = `${quantity} tarefa(s) encontrada(s) como: "${`${criteria}=${value}`} ${complementation}"`
    }

    return message
  }

  const tasks = taskFilter()
  const message = showResultFilter(tasks.length)
  return (
    <MainContainer>
      <Title as="p">{message}</Title>
      <ul>
        {tasks.map((t) => (
          <li key={t.title}>
            <Task
              id={t.id}
              title={t.title}
              status={t.status}
              priority={t.priority}
              description={t.description}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}
export default TaskList
