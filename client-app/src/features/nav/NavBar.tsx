import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
interface Iprops{
  openCreateForm : () => void
}
const NavBar : React.FC<Iprops> = ({openCreateForm}) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" />
          Reactivitis
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
        <Button onClick={openCreateForm} positive content="Create Activity"/>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
export default NavBar;
