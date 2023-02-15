import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (idRef.current.value === "" || idRef.current.value === undefined) {
      alert("아이디를 입력하세요!");
      idRef.current.focus();
      return false;
    }
    if (pwRef.current.value === "" || pwRef.current.value === undefined) {
      alert("패스워드를 입력하세요!");
      pwRef.current.focus();
      return false;
    }

    fetch("https://pre-onboarding-selection-task.shop/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: idRef.current.value,
        password: pwRef.current.value,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.access_token) {
          localStorage.setItem("access_token", res.access_token);
          navigate("/todo");
          window.location.reload("/");
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Form className="boot">
      <h3>로그인</h3>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>아이디</Form.Label>
        <Form.Control
          type="email"
          placeholder=" email"
          ref={idRef}
          data-testid="email-input"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={pwRef}
          data-testid="password-input"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        onClick={handleLogin}
        data-testid="signup-button"
      >
        login
      </Button>
    </Form>
  );
}; //아이디 aaa12@naver.com  비번:tjdals12

export default Signin;
