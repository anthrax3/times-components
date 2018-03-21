export default function getLeadAsset({ leadAsset: asset }) {
  if (!asset) return { isVideo: false, leadAsset: null };

  const isVideo = asset.type === "Video";
  const leadAsset = isVideo ? asset : asset;


  const policyKey = asset.brightcovePolicyKey;
  const accountId = asset.brightcoveAccountId;
  const videoId = asset.brightcoveVideoId;
  const paidonly = 'false';

  return {
    leadAsset,
    isVideo
  };
}