import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function LandingPage() {
  useEffect(() => {
    // PRODUCTION — QiNgMM49pu (experience.tinypass.com)
    const script = document.createElement('script');
    script.src = 'https://experience.tinypass.com/xbuilder/experience/load?aid=QiNgMM49pu';
    // SANDBOX — gtdSyi74su (sandbox.tinypass.com)
    // script.src = 'https://sandbox.tinypass.com/xbuilder/experience/load?aid=gtdSyi74su';
    script.async = true;
    document.head.appendChild(script);

    const tp = window.tp || [];
    tp.push(['setAid', 'QiNgMM49pu']); // PRODUCTION
    // tp.push(['setAid', 'gtdSyi74su']); // SANDBOX
    tp.push(['init', function () {
      window.tp.experience.execute();
    }]);
  }, []);

  return (
    <Layout>
      <div id="piano-landing-container" style={{ minHeight: "100vh" }} />
    </Layout>
  );
}
