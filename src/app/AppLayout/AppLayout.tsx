import * as React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent,
  Button
} from '@patternfly/react-core';
import { routes, IAppRoute, IAppRouteGroup } from '@app/routes';
import {auth, handleLogout, onAuthStateChanged} from '@app/utils/firebase';
import logo from '@app/bgimages/Patternfly-Logo.svg';
import { useEffect } from 'react';
import { Context } from '@app/store/store';
import { Login } from '@app/Login/Login';

interface IAppLayout {
  children: React.ReactNode;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(true);
  const [isMobileView, setIsMobileView] = React.useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = React.useState(false);
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };
  const history = useHistory();

  const [user, setUser] = React.useState("");
  const { state, dispatch } = React.useContext(Context) 

  const authListener = () => {
    onAuthStateChanged(auth, (user)=> {
      if(user != null){
        setUser(user.uid);
        // dispatch({type: "SET_USER", data: user.uid})
      } else {
        setUser("");
      }
    })
  }
  
  useEffect(() => {
    authListener();
  },[])

  function LogoImg() {
    // const history = useHistory();
    function handleClick() {
      history.push('/');
    }
    return (
      <img src={logo} onClick={handleClick} alt="PatternFly Logo" />
    );
  }
  async function logout(){
    await handleLogout();
    history.push('/');
  }

  const Header = (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`} isActive={route.path === location.pathname}>
      <NavLink exact={route.exact} to={route.path}>
        {route.label}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={group.label}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
      
    </NavExpandable>
  );

  const Navigation =  (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {routes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
        <NavItem id="default-logout" itemId={routes.length+1} onClick={logout}>
           Logout
      </NavItem>
      </NavList>
    </Nav>
  );

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent onClick={(event) => {
      event.preventDefault();
      const primaryContentContainer = document.getElementById(pageId);
      primaryContentContainer && primaryContentContainer.focus();
    }} href={`#${pageId}`}>
      Skip to Content
    </SkipToContent>
  );

  if(user){
    return (
      <Page
      mainContainerId={pageId}
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}>
      {children}
    </Page>
    )
  }
  else {
    return (
      <Login />
    )
  }
};

export { AppLayout };
