import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'e978b515d388645c7c4b07de2b3534b7cfdae503', queries,  });
export default client;
  