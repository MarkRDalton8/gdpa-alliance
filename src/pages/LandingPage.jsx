import { useEffect } from 'react';
import Layout from '../components/Layout';

const TEMPLATE_ID = "OTFDISAX5ZOD";

export default function LandingPage() {
  useEffect(() => {
    const tp = window.tp || [];
    tp.push(["init", function () {
      window.tp.offer.show({
        templateId: TEMPLATE_ID,
        displayMode: "inline",
        containerSelector: "#piano-landing-container",
      });
    }]);
  }, []);

  return (
    <Layout>
      <div id="piano-landing-container" style={{ minHeight: 400 }} />
    </Layout>
  );
}
