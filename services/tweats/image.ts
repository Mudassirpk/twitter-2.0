import { DANGEROUS__uploadFiles } from "uploadthing/client";
export async function uploadImage(
  image: File
): Promise<{ fileKey: string; fileUrl: string } | undefined> {
  try {
    const response = await DANGEROUS__uploadFiles({
      endpoint: "imageUploader",
      files: [image],
    });
    if (response) {
      return {
        fileKey: response[0].fileKey,
        fileUrl: response[0].fileUrl,
      };
    }
  } catch (err) {
    console.log(err);
  }
}
