export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SiteDataPartsFragmentDoc = gql`
    fragment SiteDataParts on SiteData {
  __typename
  hero {
    __typename
    title_line1
    title_line2
    subtitle
  }
  problems {
    __typename
    title
    desc
  }
  approach {
    __typename
    steps {
      __typename
      number
      title
      desc
    }
    note
  }
  solutions {
    __typename
    title
    desc
  }
  regions {
    __typename
    name
    desc
  }
  footer_headline
  footer_headline_accent
  footer_subtext
  contact {
    __typename
    email
    phone
    address
    whatsapp
  }
}
    `;
export const SiteDataDocument = gql`
    query siteData($relativePath: String!) {
  siteData(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteDataParts
  }
}
    ${SiteDataPartsFragmentDoc}`;
export const SiteDataConnectionDocument = gql`
    query siteDataConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteDataFilter) {
  siteDataConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteDataParts
      }
    }
  }
}
    ${SiteDataPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    siteData(variables, options) {
      return requester(SiteDataDocument, variables, options);
    },
    siteDataConnection(variables, options) {
      return requester(SiteDataConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
