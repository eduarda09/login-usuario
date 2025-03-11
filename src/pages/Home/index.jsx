
import './style.css'

import Trash from "../../assets/lixeira.png"

import api from '../../services/api'
import { useEffect, useState, useRef } from 'react'

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value

    })

    getUsers()

  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect( () => {
    getUsers();
  },[])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome... ' nome = "nome" type="text" ref={inputName}/>
        <input placeholder='Digite sua idade... ' nome = "idade" type="number" ref={inputAge}/>
        <input placeholder='Digite seu email... ' nome = "email" type="email" ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>
      {users.map( (user) =>  (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email} </span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Lixeira" />
          </button>
        </div>


      ))}


    </div>

  )
}

export default Home
