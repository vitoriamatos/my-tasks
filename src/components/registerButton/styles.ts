import styled from 'styled-components'
import { Link } from 'react-router-dom'
import variables from '../../styles/variables'

export const Circle = styled(Link)`
  height: 64px;
  width: 64px;
  background-color: ${variables.green};
  color: ${variables.white};
  position: fixed;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  text-decoration: none;
`
