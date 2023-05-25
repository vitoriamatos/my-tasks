import { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { useDispatch } from 'react-redux'

import { changeStatus, deleted, edit } from '../../store/reducers/Task'
import TaskClass from '../../models/Task'
import { Button, SaveButton } from '../../styles'

import * as enums from '../../utils/enums/Task'

type Props = TaskClass

const Task = ({
  id,
  title,
  priority,
  status,
  description: descriptionOriginal
}: Props) => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (descriptionOriginal.length > 0) {
      setDescription(descriptionOriginal)
    }
  }, [descriptionOriginal])

  function cancelEdit() {
    setIsEditing(false)
    setDescription(descriptionOriginal)
  }

  function changeTaskStatus(event: ChangeEvent<HTMLInputElement>) {
    dispatch(changeStatus({ id, finalized: event.target.checked }))
  }
  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          type="checkbox"
          id={title}
          checked={status === enums.Status.CONCLUIDA}
          onChange={changeTaskStatus}
        />
        <S.Title>
          {isEditing && <em>Editando: </em>}
          {title}
        </S.Title>
      </label>

      <S.Tag parameter="priority" priority={priority}>
        {priority}
      </S.Tag>

      <S.Tag parameter="status" status={status}>
        {status}
      </S.Tag>

      <S.Description
        disabled={!isEditing}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <S.ActionsBar>
        {isEditing ? (
          <>
            <SaveButton
              onClick={() => {
                dispatch(
                  edit({
                    id,
                    title,
                    priority,
                    status,
                    description
                  })
                )
                setIsEditing(false)
              }}
            >
              Salvar
            </SaveButton>

            <S.DeleteButton
              onClick={() => {
                cancelEdit()
              }}
            >
              Cancelar
            </S.DeleteButton>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Editar</Button>

            <S.DeleteButton onClick={() => dispatch(deleted(id))}>
              Remover
            </S.DeleteButton>
          </>
        )}
      </S.ActionsBar>
    </S.Card>
  )
}

export default Task
