import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function LandingPage() {
  useEffect(() => {
    const el = document.getElementById("piano-landing-container");
    console.log("[GDPA] piano-landing-container in DOM:", !!el, el);

    const tp = window.tp || [];
    tp.push(["init", function () {
      console.log("[GDPA] tp initialized, calling experience.execute()");
      window.tp.experience.execute();
      console.log("[GDPA] experience.execute() called, container children:", el?.children?.length);
    }]);
  }, []);

  return (
    <Layout>
      <div
        id="piano-landing-container"
        style={{ minHeight: "100vh", border: "2px dashed red" }}
      />
    </Layout>
  );
}
