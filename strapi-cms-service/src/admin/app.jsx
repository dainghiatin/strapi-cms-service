import { Button } from '@strapi/design-system';
import React from 'react';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';


const config = {};

const PreviewButton = () => {
  const cmContext = useContentManagerContext().form;
  // You can now access properties like:
  // cmContext.initialData: The original data of the entry
  // cmContext.modifiedData: The current data with modifications
  // cmContext.layout: Information about the content type layout
  // cmContext.slug: The slug of the content type

  console.log('Content Manager Context:', cmContext); // Log context for inspection

  const handleClick = () => {
    // Example: Get the entry ID and content type slug
    const entryId = cmContext.initialValues
    const contentTypeSlug = cmContext.slug;
    console.log(entryId);
    
  };

  return (
    <Button onClick={handleClick}>Preview</Button>
  );
};


const bootstrap = (app) => {
  app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
    name: 'PreviewButton',
    Component: PreviewButton, // Use the updated component
  });
};

export default {
  config,
  bootstrap,
}