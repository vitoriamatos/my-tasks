import { useDispatch, useSelector } from 'react-redux'
import { filter } from '../../store/reducers/Filter'
import * as S from './styles'
import * as enumns from '../../utils/enums/Task'
import { RootReducer } from '../../store'

export type Props = {
  legend: string
  criteria: 'priority' | 'status' | 'all'
  value?: enumns.Priority | enumns.Status
}

const CardFilter = ({ legend, criteria, value }: Props) => {
  const dispatch = useDispatch()
  const { filters, tasks } = useSelector((state: RootReducer) => state)

  const taskCount = () => {
    if (criteria === 'all') return tasks.itens.length
    if (criteria === 'priority') {
      return tasks.itens.filter((item) => item.priority === value).length
    }
    if (criteria === 'status') {
      return tasks.itens.filter((item) => item.status === value).length
    }
  }
  const isActive = () => {
    const sameCriteria = filters.criteria === criteria
    const sameValue = filters.value === value

    return sameCriteria && sameValue
  }

  const filterCard = () => {
    dispatch(
      filter({
        criteria,
        value
      })
    )
  }

  const count = taskCount()
  const active = isActive()
  return (
    <S.Card onClick={filterCard} active={active}>
      <S.Counter>{count}</S.Counter>
      <S.Label>{legend}</S.Label>
    </S.Card>
  )
}

export default CardFilter
