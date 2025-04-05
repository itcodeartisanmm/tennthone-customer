import React from "react";
import BackgroundImage from "../public/assets/images/backgrounds/dark/background.png";
import BottomRightImage from "../public/assets/images/backgrounds/dark/bottom-right.png";
import StarEffect from "../public/assets/images/backgrounds/dark/star-effect.png";
import TopLeftImage from "../public/assets/images/backgrounds/dark/top-left.png";
import LightBackgroundImage from "../public/assets/images/backgrounds/light/background.png";
import LightBottomRightImage from "../public/assets/images/backgrounds/light/bottom-right.png";
import LightStarEffect from "../public/assets/images/backgrounds/light/star-effect.png";
import LightTopLeftImage from "../public/assets/images/backgrounds/light/top-left.png";
import { useTheme } from "next-themes";
import Image from "next/image";
const OverLayEffect = () => {
  const { theme } = useTheme();
  return (
    <React.Fragment>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 w-full h-full"
        style={{
          backgroundImage: `url(${
            theme === "dark" ? BackgroundImage : LightBackgroundImage
          })`,
        }}
      ></div>

      {/* Overlay Effect */}
      <Image
        src={theme === "dark" ? TopLeftImage : LightTopLeftImage}
        alt="Image 1"
        className="absolute top-0 left-0 w-100 h-100 object-cover rounded-lg shadow-lg"
      />
      <Image
        src={theme === "dark" ? BottomRightImage : LightBottomRightImage}
        alt="Image 2"
        className="absolute top-0 right-0 w-100 h-100 object-cover rounded-lg shadow-lg"
      />
      <Image
        src={theme === "dark" ? StarEffect : LightStarEffect}
        alt="Image 3"
        className="absolute top-0 right-0 w-100 h-100 object-cover rounded-lg shadow-lg"
      />
    </React.Fragment>
  );
};

export default OverLayEffect;
