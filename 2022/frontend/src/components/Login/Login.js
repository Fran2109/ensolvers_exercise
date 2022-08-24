import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    FormFeedback,
    Spinner,
    Alert
} from 'reactstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { reactAppApiEndpoint } from '../../config/config.js';
import { UserContext } from '../../contexts/userContext.js';
import Swal from 'sweetalert2';

const Login = () => {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [userContext, setUserContext] = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            username: email,
            password
        };
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios
            .post(`${reactAppApiEndpoint}api/users/login`,data, headers)
                .then(res => {
                    setIsLoading(false);
                    if(!res.data.success) {
                        if(res.status === 400) {
                            setResponseMessage("Please fill all the fields correctly!");
                        } else if(res.status === 401) {
                            setResponseMessage("Invalid email and password combination.");
                        } else if(res.status === 500) {
                            setResponseMessage("Something went wrong. Please try again later.");
                        }
                    } else {
                        setResponseMessage('');
                        setUserContext({
                            ...userContext,
                            token: res.data.token
                        });
                        Swal.fire({
                            icon: 'success',
                            title: 'Logged In Successfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/');
                    }
                }).catch(err => {
                    setIsLoading(false);
                    setResponseMessage("Something went wrong. Please try again later.");
                })
    }

    return (
        <Form style={{width: "50%"}}>
            <h1>Login</h1>
            {responseMessage.length>0 && <Alert color="danger" fade={false}>{responseMessage}</Alert>}
            <FormGroup>
                <Label for="email">Email</Label>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    invalid={email.length === 0}
                />
                <FormFeedback>Please enter your Email</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    invalid={password.length === 0}
                />
                <FormFeedback>Please enter your Password</FormFeedback>
            </FormGroup>
            <Button
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <Spinner size={'sm'}>
                            Loading...
                        </Spinner>
                        <span>
                            {' '}Loading
                        </span>
                    </>
                ) : "Login"}
                
            </Button>
        </Form>
    );
}

export default Login;