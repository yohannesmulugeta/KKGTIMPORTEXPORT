import { assetUrl } from './assetUrl';

const mediaPath = (name: string) => assetUrl(`/media/kkgt-supplied/${name}`);

export const suppliedMedia = {
  fieldGroup: mediaPath('field-group.webp'),
  fieldInspection: mediaPath('field-inspection.webp'),
  fieldLandscape: mediaPath('field-landscape.webp'),
  officePortrait: mediaPath('office-portrait.webp'),
  officeWide: mediaPath('office-wide.webp'),
  gumbichuuCertificate: mediaPath('gumbichuu-certificate.webp'),
  oromiaCertificate: mediaPath('oromia-certificate.webp'),
  recognitionTrophy: mediaPath('recognition-trophy.webp'),
} as const;
