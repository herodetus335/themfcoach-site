import React from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { PAGE_META } from '../seo/pageMeta';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>{PAGE_META.privacy.title}</title>
        <meta name="description" content={PAGE_META.privacy.description} />
      </Head>
      <div className="min-h-screen pt-24 pb-16 bg-brand-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-brand-neon mb-8 transition-colors font-bold uppercase tracking-wider text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" /> Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm mb-10">Last updated: August 2, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Who we are
              </h2>
              <p>
                The MF Coach (&quot;we,&quot; &quot;us&quot;) provides personal training and online
                coaching services. This policy explains how we collect and use information when you
                use themfcoachweb.com, including our fitness calculator and coaching application
                forms.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Information we collect
              </h2>
              <p className="mb-3">Depending on how you use the site, we may collect:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>Name and email address (calculator results and coaching applications)</li>
                <li>Phone number and goal details (coaching applications)</li>
                <li>
                  Fitness inputs you provide in the calculator (for example weight, height, age,
                  activity level) so we can generate your estimates and follow up if relevant
                </li>
                <li>Basic technical data such as browser type and pages visited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                How we use your information
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>To deliver your calculator results and respond to coaching inquiries</li>
                <li>
                  To send occasional fitness tips, updates, and offers related to The MF Coach
                  (you can unsubscribe at any time)
                </li>
                <li>To operate, secure, and improve the website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Form and email providers
              </h2>
              <p>
                Form submissions are processed through Formspree (or a similar form provider we
                configure). Payment processing, when used, is handled by Stripe. Those providers
                process data according to their own privacy policies in order to deliver the
                service.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Your choices
              </h2>
              <p>
                You can unsubscribe from marketing emails using the link in any message we send.
                To request access, correction, or deletion of personal information we hold about
                you, email{' '}
                <a
                  href="mailto:themfcoach1@gmail.com"
                  className="text-brand-neon hover:underline"
                >
                  themfcoach1@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Not medical advice
              </h2>
              <p>
                Calculator outputs are estimates for general fitness education only. They are not
                medical advice. Consult a qualified healthcare professional before starting a new
                diet or exercise program.
              </p>
            </section>

            <section>
              <h2 className="text-white font-bold uppercase tracking-wider text-sm mb-3">
                Contact
              </h2>
              <p>
                Questions about this policy:{' '}
                <a
                  href="mailto:themfcoach1@gmail.com"
                  className="text-brand-neon hover:underline"
                >
                  themfcoach1@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPage;
