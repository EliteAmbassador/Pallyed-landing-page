import React, { useRef } from "react";
import Carousel from "react-slick";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import BackIcon from "@material-ui/icons/ArrowBackSharp";
import NextIcon from "@material-ui/icons/ArrowForwardSharp";
import Title from "../Title";
import SimpleThumbCard from "../Cards/SimpleThumb";
import useStyles from "./all-categories-style";

const dataProducts = [
  {
    icon: "ion-ios-heart",
    title: "Celebrities",
  },
  {
    icon: "ion-ios-planet",
    title: "Business",
  },
  {
    icon: "ion-ios-happy",
    title: "Providers",
  },
  {
    icon: "ion-ios-star",
    title: "Talents",
  },
  {
    icon: "ion-ios-flash",
    title: "Entrepreneurs",
  },
  {
    icon: "ion-ios-videocam",
    title: "Fans",
  },
  {
    icon: "ion-ios-heart",
    title: "Talents",
  },
  {
    icon: "ion-ios-planet",
    title: "Actors",
  },
  {
    icon: "ion-ios-happy",
    title: "commedy",
  },
  {
    icon: "ion-ios-star",
    title: "super heroes",
  },
  {
    icon: "ion-ios-flash",
    title: "actions",
  },
  {
    icon: "ion-ios-videocam",
    title: "hollywood",
  },
];

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 6,
  arrows: false,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 7000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export default function Feature() {
  const classes = useStyles();
  const slider = useRef(null);
  const nextSlide = () => {
    slider.current.slickNext();
  };
  const prevSlide = () => {
    slider.current.slickPrev();
  };
  return (
    <div className={classes.root}>
      <Container className={classes.carouselContainer}>
        <Title align="center" primary="Autographed" secondary="Collections" />
        <div className={classes.carouselWrap}>
          <Button
            className={clsx(classes.nav, classes.prev)}
            onClick={prevSlide}
          >
            <BackIcon />
          </Button>
          <Button
            className={clsx(classes.nav, classes.next)}
            onClick={nextSlide}
          >
            <NextIcon />
          </Button>
          <Carousel ref={slider} {...settings}>
            {dataProducts.map((item, index) => (
              <div key={index.toString()} className={classes.item}>
                <SimpleThumbCard title={item.title} icon={item.icon} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
}
