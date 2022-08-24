import { 
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
    Spinner
} from 'reactstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { reactAppApiEndpoint } from './../../config/config.js';
import axios from 'axios';
import { UserContext } from './../../contexts/userContext';
import Swal from 'sweetalert2'

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(1);
    const [avatar, setAvatar] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [userContext, setUserContext] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            username: email,
            password,
            firstName,
            lastName,
            age
        };
        if(avatar.length !== 0) { 
            data.icon = avatar; 
        }
        const headers = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios
            .post(`${reactAppApiEndpoint}api/users/signup`,data, headers)
                .then(res => {
                    setIsLoading(false);
                    if(!res.data.success) {
                        if(res.status === 400) {
                        setResponseMessage("Please fill all the fields correctly!");
                    } else if(res.status === 401) {
                        setResponseMessage("Invalid email and password combination.");
                    } else if(res.status === 500) {
                        if(res.data.message) {
                            setResponseMessage(res.data.message || "Something went wrong!");
                        }
                    } else {
                        setResponseMessage("Something went wrong!");
                    }
                } else {
                    setUserContext({
                        ...userContext,
                        token: res.data.token
                    });
                    setResponseMessage('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Registered Successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    navigate('/');
                }
            }
        ).catch(err => {
            setIsLoading(false);
            setResponseMessage(err.response.data.message);
        });
    }

    return (
        <Form style={{width: "50%"}}>
            <h1>Register</h1>
            <Row>
                {responseMessage.length>0 && <Alert color="danger" fade={false}>{responseMessage}</Alert>}
                <Col>
                    <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            invalid={firstName.length === 0}
                        />
                        <FormFeedback>Please enter your First Name</FormFeedback>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            invalid={lastName.length === 0}
                        />
                        <FormFeedback>Please enter your Last Name</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="age">Age</Label>
                        <Input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="Age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input
                            type="text"
                            name="avatar"
                            id="avatar"
                            placeholder="Avatar"
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </FormGroup>
                </Col>    
            </Row>
            <FormGroup>
                <Label for="email">Email(username)</Label>
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
                ) : "Signup"}
                
            </Button>
        </Form>
    );
}

export default Login;