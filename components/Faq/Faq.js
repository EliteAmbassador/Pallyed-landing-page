import React, { useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { useText } from "~/theme/common";
import { withTranslation } from "~/i18n";
import illustration from "~/public/images/movie/faq.png";
import Title from "../Title";
import useStyles from "./faq-style";

const faqData = [
  {
    q: "About Pallyed",
    a: "Pallyed is a platform that provides personal contact and an engaging social interaction between fans and their favourite celebrities. ",
  },
  {
    q: "What are the services of Pallyed?",
    a: "-Request personalized video/audio messages</br> - request one-on-one video chat ",
  },
  {
    q: "How can I request for such videos?",
    a: "Answer ",
  },
  {
    q: "How long does it take the celebrity to respond?",
    a: "Answer ",
  },
  {
    q: "How many request can I make with one payment?",
    a: "Answer ",
  },
];

function Faq(props) {
  const classes = useStyles();
  const text = useText();
  const [expanded, setExpanded] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = props;
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Title
              align={isMobile ? "center" : "left"}
              primary="Frequently"
              secondary="Answered Questions"
            />
            <Typography
              className={clsx(classes.text, text.subtitle2)}
              align={isMobile ? "center" : "left"}
              component="p"
            >
              {t("common:movie-landing.faq_subtitle")}
            </Typography>
            <Hidden smDown>
              <div className={classes.illustration}>
                <img src={illustration} alt="illustration" />
              </div>
            </Hidden>
          </Grid>
          <Grid item md={6}>
            <div className={classes.accordion}>
              {faqData.map((item, index) => (
                <div className={classes.item} key={index.toString()}>
                  <Accordion
                    classes={{
                      root: classes.paper,
                    }}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                  >
                    <AccordionSummary
                      classes={{
                        content: classes.content,
                        expanded: classes.expanded,
                      }}
                    >
                      <Typography className={classes.heading}>
                        {item.q}
                      </Typography>
                      <ExpandMoreIcon className={classes.icon} />
                    </AccordionSummary>
                    <AccordionDetails
                      classes={{
                        root: classes.detail,
                      }}
                    >
                      <Typography>{item.a}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Faq.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(["movie-landing"])(Faq);
