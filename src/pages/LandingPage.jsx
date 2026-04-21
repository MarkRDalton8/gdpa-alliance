import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function LandingPage() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(["init", function () {
      window.tp.experience.execute();
    }]);
  }, []);

  return (
    <Layout>
      <div id="piano-landing-container" style={{ minHeight: "100vh" }} />
    </Layout>
  );
}
