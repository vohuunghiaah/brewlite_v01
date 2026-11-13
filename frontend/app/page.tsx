import Footer from '../components/Footer';
import MenuPage from '../components/MenuPage';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans antialiased">
      <Navbar />
      <MenuPage />
      <Footer />
    </div>
  );
}
