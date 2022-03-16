import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import UploadPosts from './components/UploadPosts'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />

    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/uploadPosts" component={UploadPosts} />
  </Switch>
)

export default App
