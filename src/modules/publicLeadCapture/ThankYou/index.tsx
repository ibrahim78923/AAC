import React from 'react';
import ThankYou from '@/components/ThankYou';
import PageHeader from '../components/PageHeader';

export default function ThankYouModule() {
  return (
    <>
      <PageHeader />
      <ThankYou message="Your submission has been received successfully, and we truly appreciate you taking the time to connect with us. Our team is now reviewing your request to ensure we provide the most helpful response." />
    </>
  );
}
