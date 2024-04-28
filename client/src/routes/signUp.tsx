import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ChangeEvent, FormEvent, useState } from 'react'
import reactLogo from '.././assets/react.svg'
import { useNavigate } from 'react-router-dom'
import { sendData } from '../apiService'
import '.././App.css'


const defaultFormFields = {
    userName: "",
    email: "",
    password: "",
}

function SignUp () {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const [isError, setIsError] = useState(false)
    const { email, password, userName } = formFields
    const navigate = useNavigate()

    const resetFormFields = () => { //TODO: refactor this to a utility function
        return (
          setFormFields(defaultFormFields)
        );
      }
      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
          // Send the email and password to firebase
          const auth = getAuth()
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          if (userCredential) {
            resetFormFields()
            setIsError(false)
            navigate('/profile')
            //const token = userCredential.user.getIdToken() //interceptor handles this?
            sendData(userName)
            //Todo:  refactor all this to be in an auth section.
          }
        } catch (error: any) {
            setIsError(true)
          console.log('User Sign In Failed', error.message);
        }
      };
      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value })
      }
      return(
        <div className="App">
          <div className="card">
            <div className='logo-react'>
              <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <form onSubmit={handleSubmit}>
            <div>
                <input
                  type="userName"
                  name="userName"
                  value={userName}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <input id='recaptcha' type="submit" />
              </div>
              <div>
                {isError &&
                <h2>Login Failed. Please Try Again</h2>}
              </div>
            </form>
          </div>
        </div>
      )
    }
    
    export default SignUp
