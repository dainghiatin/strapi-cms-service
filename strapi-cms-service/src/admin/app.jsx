import { Button, Flex, Typography, Box } from '@strapi/design-system';
import React, { useState } from 'react';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';
import { useFetchClient } from '@strapi/strapi/admin';

const config = {};

const TransactionActionButtons = () => {
  const cmContext = useContentManagerContext();
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const { get, post, put, del } = useFetchClient();

  console.log(cmContext);
  
  // Only show for Additional Transaction content type
  if (cmContext.contentType?.apiID !== 'additional-transaction') {
    return null;
  }

  // Don't show if status is already DONE or REJECTED
  const currentStatus = cmContext.form.initialValues?.stt;
  console.log(cmContext.id);
  
  if (currentStatus === 'DONE' || currentStatus === 'REJECTED') {
    return (
      <Box padding={4}>
        <Typography variant="omega">
          Status: <strong>{currentStatus}</strong>
        </Typography>
      </Box>
    );
  }

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      const handlerName = 'Admin';

      // Get JWT token from sessionStorage
      const token = sessionStorage.getItem('jwtToken');
      
      // Update the transaction status to DONE
      const response = await put(`/content-manager/collection-types/api::additional-transaction.additional-transaction/${cmContext.id}?`, {
        data: {
          stt: 'DONE',
          handle_by: handlerName,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response);

      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error accepting transaction:', error);
      // You can add error notification here
    } finally {
      setIsSubmitting(false);
      setIsAcceptDialogOpen(false);
    }
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    try {
      const handlerName = 'Admin';
      
      // Get JWT token from sessionStorage
      const token = sessionStorage.getItem('jwtToken');
        
      // Update the transaction status to REJECTED with reason
      const response = await put(`/content-manager/collection-types/api::additional-transaction.additional-transaction/${cmContext.id}`, {
        data: {
          stt: 'REJECTED',
          reason: rejectReason || 'Rejected by admin',
          handle_by: handlerName,
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response);

      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting transaction:', error);
      // You can add error notification here
    } finally {
      setIsSubmitting(false);
      setIsRejectDialogOpen(false);
    }
  };

  return (
    <>
      <Flex gap={2}>
        <Button 
          onClick={handleAccept} 
          variant="success"
          size="S"
        >
          ACCEPT
        </Button>
        <Button 
          onClick={handleReject} 
          variant="danger"
          size="S"
        >
          REJECT
        </Button>
      </Flex>

     
    </>
  );
};

const bootstrap = (app) => {
  app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
    name: 'TransactionActionButtons',
    Component: TransactionActionButtons,
  });
};

export default {
  config,
  bootstrap,
}