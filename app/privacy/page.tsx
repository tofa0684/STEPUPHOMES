import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | StepUpHomes',
  description: 'Our privacy policy explains how StepUpHomes collects, uses, and protects your personal data.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl text-amber-500 tracking-wide">Privacy Policy</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-xs">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 font-light leading-relaxed">
          <p>
            At <strong>StepUpHomes</strong>, we value your privacy and are committed to protecting any personal information you share with us.
            This policy explains what data we collect, why we collect it, and how we use and safeguard it.
          </p>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-4">
              <li><strong>Contact forms:</strong> Your name, email, phone number, and interest details are collected when you submit inquiries.</li>
              <li><strong>Account data:</strong> Your email address and credentials are stored securely via Supabase Auth when accessing administrative routes.</li>
              <li><strong>Usage data:</strong> We track anonymous analytics (IP address, browser type, pages visited) to optimize our services.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">2. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 pl-4">
              <li>To respond to your property queries and provide luxury real estate advisory.</li>
              <li>To authorize admin access and enforce Row-Level Security (RLS) policies.</li>
              <li>To improve website performance, monitor active listings, and optimize UI layouts.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">3. Data Sharing & Retention</h2>
            <p>
              We do not sell, rent, or lease your personal information to third parties. Data is stored securely on Supabase cloud databases and is only kept for as long as necessary to process inquiries or maintain active user accounts.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">4. Cookies and AdSense Compliance</h2>
            <p>
              This site utilizes essential cookies to manage authenticated admin sessions. Additionally, third-party services like Google AdSense may use cookies to serve personalized advertisements based on your visits. You can opt out of personalized advertising by visiting your browser settings or Google Ad Settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">5. Contact Us</h2>
            <p>
              If you have any questions about our privacy policies or want to request data deletion, please contact us at:
              <br />
              <a href="mailto:support@stepuphomes.com" className="text-amber-500 hover:underline mt-2 inline-block">support@stepuphomes.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
