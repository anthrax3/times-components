import React from "react";
import PropTypes from "prop-types";
import Image from "@times-components/image";
import Caption from "@times-components/caption";
import BrightcoveVideo from  "@times-components/brightcove-video";
import {
  LeadAsset,
  MediaContainerDesktop,
  MediaContainerMobile,
  LeadAssetMobile,
  LeadAssetDesktop
} from "./styles/article-body/responsive";




const posterImageURI =
"https://clips.news.co.uk/thetimes/p5dzhoYzE6kYmndXxYdBsfnnyMzDVTyD/Ut_HKthATH4eww8X4xMDoxOmFkOxyVqc";
function renderLeadAsset(leadAsset) {

    const styles = {
      wrapper: {
        height: 0,
        //overflow: "hidden",
        paddingBottom: `${100 /1.78 }%`,
        display: "table",
        // From PrimaryImg, should go in responsive
        width: "58.33%",
        margin: "auto"
      }//,
     // img: { display: "block", width: "100%", zIndex: 1, position: "absolute" }
    };

  if (leadAsset) {
  console.log();

    // const [ratioWidth, ratioHeight] = leadAsset.crop.ratio.split(":");
    // const aspectRatio = ratioWidth / ratioHeight;
    leadAsset = {
      policyKey: "BCpkADawqM0NK0Rq8n6sEQyWykemrqeSmIQqqVt3XBrdpl8TYlvqN3hwKphBJRnkPgx6WAbozCW_VgTOBCNf1AQRh8KnmXSXfveQalRc5-pyNlSod5XzP99If2U",
      videoId: "4084164751001",
      accountId: "57838016001"
    }
    return  (

      // <div style={{border: "solid 2px red", position: "relative", paddingBottom: "56.25%"}}>
            //{/* <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "solid 2px blue"}}> */}
      <div style={{paddingBottom: `${100 /1.78 }%`}}>
          <BrightcoveVideo
              width="100%"
              height="100%"
              policyKey={leadAsset.policyKey}
              videoId={leadAsset.videoId}
              accountId={leadAsset.accountId}
              poster={{ uri: posterImageURI }}
          />
      </div>
      // </div>
    );
    // return (
    //   <LeadAsset>
    //     <LeadAssetMobile key={`leadassetmob`}>
    //       {/* <Image uri={leadAsset.crop.url} aspectRatio={aspectRatio} /> */}
    //       <BrightcoveVideo
    //           width="100%"
    //           height="100%"
    //           policyKey={leadAsset.policyKey}
    //           videoId={leadAsset.videoId}
    //           accountId={leadAsset.accountId}
    //           poster={{ uri: posterImageURI }}
    //       />
    //     </LeadAssetMobile>
    //     <LeadAssetDesktop key={`leadassetdesktop`}>
    //       {/* <Image uri={leadAsset.crop.url} aspectRatio={aspectRatio} />
    //       <Caption text={leadAsset.caption} credits={leadAsset.credits} /> */}
    //       {/* <div style={{border: "solid 2px red", position: "relative", paddingBottom: "56.25%"}}>
    //         <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "solid 2px blue"}}> */}
    //           <BrightcoveVideo
    //               width="100%"
    //               height="100%"
    //               policyKey={leadAsset.policyKey}
    //               videoId={leadAsset.videoId}
    //               accountId={leadAsset.accountId}
    //               poster={{ uri: posterImageURI }}
    //         />
    //       {/* </div>
    //      </div> */}
    //     </LeadAssetDesktop>
    //   </LeadAsset>
    // );
  }
  return null;
}

const LeadAssetComponent = props => {
  const { device, leadAsset } = props;
  if (device === "DESKTOP") {
    return (
      <MediaContainerDesktop>
        {renderLeadAsset(leadAsset)}
      </MediaContainerDesktop>
    );
  }
  return (
    <MediaContainerMobile>{renderLeadAsset(leadAsset)}</MediaContainerMobile>
  );
};

LeadAssetComponent.propTypes = {
  device: PropTypes.oneOf(["MOBILE", "DESKTOP"]),
  leadAsset: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string,
    crop: PropTypes.shape({
      ratio: PropTypes.string,
      url: PropTypes.string
    })
  })
};

LeadAssetComponent.defaultProps = {
  device: "MOBILE",
  leadAsset: null
};

export default LeadAssetComponent;
