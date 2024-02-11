import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import NewArticleButton from "../Header/NewArticleButton";
import SettingButton from "../Header/SettingButton";
import ProfileButton from "../Header/ProfileButton";
import LogoutButton from "../Header/LogoutButton";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import style from "./NavCustom.module.css";

import {Navbar, Row, Container, Nav} from "react-bootstrap";

export default function Header() {
  const state = useSelector((state: RootState) => state.user.isLogin);

  return (
    <Container fluid className={`${style["nav-container"]}`}>
      <Row>
        <Container className={`${style["navbar-wrapper"]}`}>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="px-sm-0 mx-sm-0">
            <Navbar.Brand><Link to='/'><b>MockProject</b></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={`${style["navbar-inner"]} ml-lg-auto mr-lg-auto px-sm-3 pb-sm-2`}>
                <SearchBar />
              </Nav>
              <Nav className={`${style["navbar-inner"]} ml-lg-auto px-sm-3 py-sm-3`}>
                {state ? (
                  <>
                    <NewArticleButton/>

                    <SettingButton />

                    <ProfileButton />

                    <LogoutButton />
                  </>
                ) : (
                  <>
                    <LoginButton />

                    <SignupButton />
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Row>
    </Container>
  );
}
