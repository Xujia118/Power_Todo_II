import { fetchLogin } from "./services";

import FormLogin from "./FormLogin"


function App() {

  function onLogin(username: string) {
    fetchLogin(username)
  }

  return (
    <div>
      <FormLogin onLogin={onLogin}/>

    </div>
  )
}

export default App