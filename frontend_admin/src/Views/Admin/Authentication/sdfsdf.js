import React, { useState, useEffect } from 'react';

function PaymentConfirmation() {
  const [isLoading, setIsLoading] = useState(true);

  const handleMessage = (event) => {
    if (event.data.action === 'receipt-loaded') {
      setIsLoading(false);
    }
  };

  const printIframe = (id) => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <iframe
        id="receipt"
        src="/payment/receipt"
        style={{ display: 'none' }}
        title="Receipt"
      />
      <button onClick={() => printIframe('receipt')}>
        {isLoading ? 'Loading...' : 'Print Receipt'}
      </button>
    </>
  );
}

export default PaymentConfirmation;
