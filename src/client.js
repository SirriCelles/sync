import { createClient} from "@sanity/client";
import  imageUrlBuilder  from "@sanity/image-url";

const pid = process.env.REACT_APP_SANITY_PROJECTID;
const token = process.env.REACT_APP_SANITY_TOKEN;

export const client = createClient({
  projectId: pid ,
  dataset: 'production',
  apiVersion: '2023-07-16',
  useCdn: true,
  token: token
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) =>  builder.image(source)


