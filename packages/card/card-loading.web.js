import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Gradient from "@times-components/gradient";
import { ImageContainer, SummaryContainer, CardContainer } from "./card-styles";

const gradientStyles = StyleSheet.create({
  headerContainer: {
    height: 24,
    marginBottom: 10,
    maxWidth: 300
  },
  textContainer: {
    height: 10,
    marginBottom: 10
  },
  noMarginBottom: {
    marginBottom: 0
  }
});

const Loading = ({ imageRatio, showImage }) => {
  const imageComponent = (
    <ImageContainer>
      <Image uri="" aspectRatio={imageRatio} />
    </ImageContainer>
  );

  return (
    <CardContainer>
      {showImage && imageComponent}
      <SummaryContainer>
        <Gradient style={[gradientStyles.headerContainer]} degrees={264} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient style={[gradientStyles.textContainer]} degrees={267} />
        <Gradient
          style={[gradientStyles.textContainer, gradientStyles.noMarginBottom]}
          degrees={267}
        />
      </SummaryContainer>
    </CardContainer>
  );
};

Loading.defaultProps = {
  imageRatio: 3 / 2
};

Loading.propTypes = {
  imageRatio: PropTypes.number
};

export default Loading;
