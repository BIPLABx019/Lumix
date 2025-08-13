import { streamchat } from "stream-chat";
import "dotenv/config";

const streamClient = streamchat.connect(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser([userData]);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export default generateStreamClient = (userId) => {
  return streamClient;
};
