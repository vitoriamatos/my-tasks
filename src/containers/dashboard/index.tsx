import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardFilter from '../../components/cardFilter'
import { RootReducer } from '../../store'
import { terms } from '../../store/reducers/Filter'
import * as S from './styles'
import * as enums from '../../utils/enums/Task'
import { Button, Field } from '../../styles'

type Props = {
  showFilters: boolean
}
const Dashboard = ({ showFilters }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { term } = useSelector((state: RootReducer) => state.filters)

  return (
    <S.Aside>
      {showFilters ? (
        <>
          <div>
            <Field
              type="text"
              placeholder="Buscar"
              value={term}
              onChange={(event) => dispatch(terms(event.target.value))}
            />
            <S.Fliter>
              <CardFilter
                criteria="status"
                legend={'Pendente'}
                value={enums.Status.PENDENTE}
              />
              <CardFilter
                criteria="status"
                legend={'Concluida'}
                value={enums.Status.CONCLUIDA}
              />
              <CardFilter
                criteria="priority"
                legend={'Urgente'}
                value={enums.Priority.URGENTE}
              />
              <CardFilter
                criteria="priority"
                legend={'importantes'}
                value={enums.Priority.IMPORTANTE}
              />
              <CardFilter
                criteria="priority"
                legend={'normal'}
                value={enums.Priority.NORMAL}
              />
              <CardFilter criteria="all" legend={'todas'} />
            </S.Fliter>
          </div>
        </>
      ) : (
        <Button onClick={() => navigate('/')}>voltar</Button>
      )}
    </S.Aside>
  )
}

export default Dashboard
