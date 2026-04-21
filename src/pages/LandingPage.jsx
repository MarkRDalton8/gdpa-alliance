import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function LandingPage() {
  useEffect(() => {
    // Re-execute after mount so Piano can find #piano-landing-container
    // (index.html fires execute before React renders on hard refresh)
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
