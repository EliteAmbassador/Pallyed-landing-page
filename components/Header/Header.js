import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Scrollspy from "react-scrollspy";
import { withTranslation } from "~/i18n";
import Settings from "./Settings";
import MobileMenu from "./MobileMenu";
import routeLink from "~/public/text/link";
import logo from "~/public/images/movie-logo.svg";
import useStyles from "./header-style";
import navMenu from "./menu";

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = scroll > 80;
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const { onToggleDark, onToggleDir, invert, t } = props;
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuList] = useState([
    createData(navMenu[0], "#" + navMenu[0], 100),
    createData(navMenu[1], "#" + navMenu[1]),
    createData(navMenu[2], "#" + navMenu[2]),
    createData(navMenu[3], "#" + navMenu[3]),
    createData(navMenu[4], "#" + navMenu[4]),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <Fragment>
      {isMobile && (
        <MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />
      )}
      <AppBar
        component="header"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          invert && classes.invert,
          openDrawer && classes.openDrawer
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav
              className={clsx(
                classes.navMenu,
                classes.navLogo,
                invert && classes.invert
              )}
            >
              {isMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx(
                    "hamburger hamburger--spin",
                    classes.mobileMenu,
                    openDrawer && "is-active"
                  )}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, "hamburger-inner")} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                {invert ? (
                  <a href={routeLink.movie.home}>
                    <img src={logo} alt="logo" />
                  </a>
                ) : (
                  <AnchorLink href="#home">
                    <img src={logo} alt="logo" />
                  </AnchorLink>
                )}
              </div>
              {isDesktop && (
                <Scrollspy items={navMenu} currentClassName="active">
                  {menuList.map((item) => (
                    <li key={item.id.toString()}>
                      {invert ? (
                        // eslint-disable-next-line
                        <Button offset={item.offset || 0} href={"/" + item.url}>
                          {t("common:movie-landing.header_" + item.name)}
                        </Button>
                      ) : (
                        // eslint-disable-next-line
                        <Button
                          component={AnchorLink}
                          offset={item.offset || 0}
                          href={item.url}
                        >
                          {t("common:movie-landing.header_" + item.name)}
                        </Button>
                      )}
                    </li>
                  ))}
                </Scrollspy>
              )}
            </nav>
            <nav className={clsx(classes.navMenu, classes.navAuth)}>
              <Hidden xsDown>
                <Button
                  //href={routeLink.movie.register}
                  //component={AnchorLink href="#subscribe"}
                  AnchorLink
                  href="#subscribe"
                  //href={#subscribe}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
                  {t("common:movie-landing.header_register")}
                </Button>
              </Hidden>
            </nav>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

Header.defaultProps = {
  sticky: false,
  invert: false,
};

export default withTranslation(["movie-landing"])(Header);
