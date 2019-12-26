import * as React from 'react';
import * as Styled from './NavbarUserDataStyles';
import * as Icon from "../../Common/Icons/Icons"
import { getUser } from '../../../redux/reducers/userReducer';
import { useSelector } from 'react-redux';

const NavbarUserData = () => {
  const userData = useSelector(getUser);
  console.log(userData?.userPicture)
  return (
    <Styled.NavbarUserData>
      <Styled.NavbarUserDataUserName>
        {userData?.name}
      </Styled.NavbarUserDataUserName>
      <Styled.NavbarUserDataUserAvatarContainer>
        {userData?.userPicture
          ? <Styled.NavbarUserDataUserAvatar src={userData.userPicture} />
          : <Icon.User height='36px' width='36px' />}
      </Styled.NavbarUserDataUserAvatarContainer>
    </Styled.NavbarUserData>
  );
};

export default NavbarUserData;