import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | StepUpHomes',
  description: 'Legal terms governing the use of StepUpHomes services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-4xl md:text-5xl text-amber-500 tracking-wide">Terms of Service</h1>
          <p className="text-zinc-500 uppercase tracking-widest text-xs">Last Updated: May 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 font-light leading-relaxed">
          <p>
            Welcome to <strong>StepUpHomes</strong>. By accessing or using our website, platform, or real estate advisory services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">1. Acceptance of Terms</h2>
            <p>
              By accessing this site, you confirm that you are at least 18 years of age and hold the legal capacity to enter into binding agreements. If you do not agree to these terms, please refrain from using our services.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">2. Use of Site & Listings</h2>
            <p>
              The property listings, descriptions, images, and prices shown are provided for informational and non-commercial purposes. Scraped listings, structural copies, or unauthorized commercial exploitation of our layout content is strictly prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">3. Admin & Account Security</h2>
            <p>
              Certain sections of this app (such as `/admin`) are restricted to verified administrative staff. Authorized users are solely responsible for keeping their passwords and active session cookies secure. Any unauthorized breach must be flagged immediately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">4. Limitation of Liability</h2>
            <p>
              While we make every effort to display correct and up-to-date pricing and property specifications, StepUpHomes does not guarantee absolute accuracy. We are not liable for typographical errors, sudden pricing modifications, or listing availability changes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-amber-400">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of Ethiopia. Any legal disputes or claims shall be resolved exclusively within the jurisdiction of courts located in Addis Ababa, Ethiopia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
