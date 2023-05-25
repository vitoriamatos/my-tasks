import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MainContainer, SaveButton, Title } from '../../styles'
import { Field } from '../../styles'
import { Forms, Options, Option } from './styles'
import * as enums from '../../utils/enums/Task'

import { register } from '../../store/reducers/Task'

const Form = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const registerTask = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      register({ title, priority, description, status: enums.Status.PENDENTE })
    )
    navigate('/')
  }
  return (
    <MainContainer>
      <Title>Nova Tarefa</Title>
      <Forms onSubmit={registerTask}>
        <Field
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Titulo"
        />
        <Field
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Options>
          <p>Prioridade</p>
          {Object.values(enums.Priority).map((priority) => (
            <Option key={priority}>
              <input
                value={priority}
                name="priority"
                type="radio"
                onChange={(event) =>
                  setPriority(event.target.value as enums.Priority)
                }
                id={priority}
                defaultChecked={priority === enums.Priority.NORMAL}
              />
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
        </Options>

        <SaveButton type="submit">Cadastrar</SaveButton>
      </Forms>
    </MainContainer>
  )
}

export default Form
