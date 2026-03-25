'use client';

import { useState } from 'react';
import HeroStarter from '@/components/HeroStarter';
import FeaturesStarter from '@/components/FeaturesStarter';
import AboutStarter from '@/components/AboutStarter';
import MenuStarter from '@/components/MenuStarter';
import FooterStarter from '@/components/FooterStarter';
import RezervaModal from '@/components/RezervaModal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HeroStarter onRezervare={() => setShowModal(true)} />
      <FeaturesStarter />
      <AboutStarter />
      <MenuStarter />
      <FooterStarter />
      {showModal && <RezervaModal onClose={() => setShowModal(false)} />}
    </>
  );
}
