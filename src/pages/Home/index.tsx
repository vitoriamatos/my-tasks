import RegisterButton from '../../components/registerButton'
import Dashboard from '../../containers/dashboard'
import TaskList from '../../containers/taskList'

const Home = () => (
  <>
    <Dashboard showFilters />
    <TaskList />
    <RegisterButton />
  </>
)

export default Home
