import React, { useEffect, useState } from 'react'
import { Container, InputGroup, Form, Card, Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useUserLoginMutation } from '../../slices/api/userAuthApiSlice';
import { setUserLogin } from '../../slices/userAuthSlice';
const Login = () => {

  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])


  const [userLogin, { isLoading }] = useUserLoginMutation();

  const handleSubmit = async () => {
    try {

      const res = await userLogin({ email });
      console.log();
      if (res.error !== undefined && res.error.status == 401) {
        toast.error(res.error.data);
        return
      }

      dispatch(setUserLogin({ ...res }));
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error?.data || error.error);

    }
  }





  return (
    <Container className="mx-auto mt-3">
      <Row className="d-flex justify-content-center">
        <Col xs md="6">
          <Card className="border-0 shadow p-3">

            <InputGroup className="my-3 mt-4">
              <Form.Control
                type="email"
                placeholder="Email or Username"
                aria-label="Email or Username"
                aria-describedby="basic-addon2"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </InputGroup>
            <Card.Footer className="border-0 mb-2" style={{ backgroundColor: "transparent" }}>
              <Button disabled={isLoading} className="float-end" variant='dark' onClick={handleSubmit}>Login</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

    </Container>

  )
}

export default Login