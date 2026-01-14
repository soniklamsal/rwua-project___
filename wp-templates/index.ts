import type { GetStaticPropsContext, GetServerSidePropsContext } from 'next';
// Commented out to remove restrictions on single post access
// import SinglePost, { query as singleQuery, variables as singleVariables } from './single';

export interface WordPressTemplate {
  Component: React.ComponentType<any>;
  variables?: (
    context: GetStaticPropsContext | GetServerSidePropsContext,
    ctx: any
  ) => object | Promise<object>;
  query?: any;
}

// WordPress templates - DISABLED to remove restrictions
const templates: Record<string, WordPressTemplate> = {
  // Commented out to allow direct access to posts via /post/[slug] route
  // single: {
  //   Component: SinglePost,
  //   query: singleQuery,
  //   variables: singleVariables,
  // },
};

export default templates;