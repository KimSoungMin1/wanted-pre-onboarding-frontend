import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>원티드 과제</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/signin">signin</Nav.Link>
          <Nav.Link href="/signup">signup</Nav.Link>
          <Nav.Link href="/todo">todo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
