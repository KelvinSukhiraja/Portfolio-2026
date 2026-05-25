import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

type SanityImageSource = Parameters<
  NonNullable<typeof builder>["image"]
>[0];

export function urlForThumbnail(source: SanityImageSource) {
  if (!builder) return "";
  return builder
    .image(source)
    .width(560)
    .height(315)
    .fit("crop")
    .auto("format")
    .quality(85)
    .url();
}

/** Preserves aspect ratio — for 16:9 screenshots in the project modal */
export function urlForGalleryImage(source: SanityImageSource) {
  if (!builder) return "";
  return builder
    .image(source)
    .width(720)
    .fit("max")
    .auto("format")
    .quality(90)
    .url();
}

/** @deprecated Use urlForThumbnail or urlForGalleryImage */
export function urlForImage(source: SanityImageSource) {
  return urlForThumbnail(source);
}
