import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Signup = () => {
  const idRef = useRef(null);
  const pwRef = useRef(null);

  const navigate = useNavigate();

  const handleMember = (e) => {
    e.preventDefault();

    const idTest = //아이디 유효성검사
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const PWTest = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //비밀번호 유효성검사

    if (!idTest.test(idRef.current.value)) {
      alert("email 형식으로 작성해주세요");
      idRef.current.focus();
      e.target.disabled = true; //유효성검사 불통과 시 버튼 비활성화
    } else {
      console.log("성공함");
    }
    if (!PWTest.test(pwRef.current.value)) {
      alert("영문 숫자 합쳐서 8자 이상 입력하세요");
      pwRef.current.focus();
      e.target.disabled = true; //유효성검사 불통과 시 버튼 비활성화
    } else {
      console.log("성공함");
    }

    let data = {
      email: idRef.current.value,
      password: pwRef.current.value,
    };
    const url = "https://pre-onboarding-selection-task.shop/auth/signup";
    axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": `application/json`, // application/json 타입 선언
        },
      })
      .then((res) => {
        console.log("handleMember =>", res);

        navigate("/signin");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Form className="boot">
      <h3>회원가입</h3>
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
        onClick={handleMember}
        data-testid="signup-button"
      >
        login
      </Button>
    </Form>
  );
}; //아이디 aaa12@naver.com  비번:tjdals12

export default Signup;
