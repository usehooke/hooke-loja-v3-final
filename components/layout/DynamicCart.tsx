"use client";

import dynamic from 'next/dynamic';

const DynamicCart = dynamic(() => import('@/components/shop/CartSidebar'), {
  ssr: false,
  loading: () => null, // You can add a loading spinner here if you want
});

export default DynamicCart;
