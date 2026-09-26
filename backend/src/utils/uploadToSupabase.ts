import { supabase } from "../supabase";

export async function uploadToSupabase(
  file: Express.Multer.File,
  folder: string
): Promise<string> {
  const extension = file.originalname.includes(".")
    ? file.originalname.substring(file.originalname.lastIndexOf("."))
    : "";

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}${extension}`;

  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("syntra-media")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error("Failed to upload media");
  }

  const { data } = supabase.storage
    .from("syntra-media")
    .getPublicUrl(filePath);

  return data.publicUrl;
}