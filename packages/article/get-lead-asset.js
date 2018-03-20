export default function getLeadAsset({ leadAsset: asset }) {
  if (!asset) return { isVideo: false, leadAsset: null };

  const isVideo = asset.type === "Video";
  const leadAsset = isVideo ? asset.posterImage : asset;

  const policyKey = asset.brightcovePolicyKey;
  const brightcoveAccountId = asset.brightcoveAccountId;
  const brightcoveVideoId = asset.brightcoveVideoId;
  const paidonly = 'false';

  return {
    leadAsset,
    isVideo
  };
}
