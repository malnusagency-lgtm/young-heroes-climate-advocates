import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function PublicSiteLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
