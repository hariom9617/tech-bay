export default function TermsAndConditions() {
  return (
    <div className="flex gap-8 bg-gray-50 min-h-screen p-8">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 flex-shrink-0 hidden lg:block">
        <div className="sticky top-8 flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex flex-col mb-4">
            <h3 className="text-gray-900 text-base font-bold">Table of Contents</h3>
            <p className="text-gray-500 text-sm font-normal">Quick Navigation</p>
          </div>
          <nav className="flex flex-col gap-1">
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 border-r-4 border-blue-600"
              href="#introduction"
            >
              <span className="material-symbols-outlined text-lg">info</span>
              <span className="text-sm font-semibold">1. Introduction</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
              href="#eligibility"
            >
              <span className="material-symbols-outlined text-lg">person</span>
              <span className="text-sm font-medium">2. Eligibility</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
              href="#accounts"
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              <span className="text-sm font-medium">3. User Accounts</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
              href="#pricing"
            >
              <span className="material-symbols-outlined text-lg">sell</span>
              <span className="text-sm font-medium">4. Pricing &amp; Payments</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
              href="#law"
            >
              <span className="material-symbols-outlined text-lg">gavel</span>
              <span className="text-sm font-medium">5. Governing Law</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
              href="#contact"
            >
              <span className="material-symbols-outlined text-lg">contact_support</span>
              <span className="text-sm font-medium">6. Contact Us</span>
            </a>
          </nav>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Need Help?
              </p>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                If you have any questions about these terms, our legal team is here to assist.
              </p>
              <a className="text-xs font-bold text-blue-600 hover:underline" href="#">
                Chat with Legal Support
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <article className="flex-1 max-w-4xl bg-white p-6 md:p-10 rounded-xl shadow-sm leading-relaxed text-gray-700">
        <section className="mb-12 scroll-mt-32" id="introduction">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">1.</span> Introduction
          </h2>
          <p className="mb-4">
            Welcome to TechBay. These Terms &amp; Conditions govern your use of the TechBay
            website and platform located at www.techbay.in and its associated mobile applications
            (collectively, the "Platform").
          </p>
          <p className="mb-4">
            By accessing or using our Platform, you agree to be bound by these Terms and our
            Privacy Policy. If you do not agree to all of these Terms, please do not use our
            services. TechBay is a premium e-commerce marketplace operated by TechBay Electronics
            Private Limited.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
            <p className="text-sm font-medium text-amber-800">
              <strong>Important Notice:</strong> Your use of the Platform signifies your agreement
              to these Terms, which constitute a legally binding agreement between you and TechBay.
            </p>
          </div>
        </section>

        <section className="mb-12 scroll-mt-32" id="eligibility">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">2.</span> Eligibility
          </h2>
          <p className="mb-4">
            Use of the TechBay platform is available only to persons who can form legally binding
            contracts under the <strong>Indian Contract Act, 1872</strong>.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-3">
            <li>You must be at least 18 years of age to register for an account.</li>
            <li>
              If you are a minor (under 18), you may use the platform only under the supervision of
              a parent or legal guardian.
            </li>
            <li>
              Users who have been suspended or removed by TechBay for any reason are not eligible
              to use the Platform.
            </li>
            <li>
              For business accounts, you represent that you have the authority to bind the entity
              to these terms.
            </li>
          </ul>
        </section>

        <section className="mb-12 scroll-mt-32" id="accounts">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">3.</span> User Account Responsibilities
          </h2>
          <p className="mb-4">
            To access certain features of the Platform, you may be required to create a user
            account. You are solely responsible for maintaining the confidentiality of your account
            credentials.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="border border-gray-200 p-5 rounded-lg">
              <h4 className="font-bold text-sm text-blue-600 mb-2 uppercase">Your Obligations</h4>
              <p className="text-sm leading-relaxed">
                Providing accurate information, keeping your password secure, and updating your
                profile as needed.
              </p>
            </div>
            <div className="border border-gray-200 p-5 rounded-lg">
              <h4 className="font-bold text-sm text-blue-600 mb-2 uppercase">Account Security</h4>
              <p className="text-sm leading-relaxed">
                Notify TechBay immediately of any unauthorized use of your account or breach of
                security.
              </p>
            </div>
          </div>
          <p className="mb-4">
            TechBay reserves the right to refuse service, terminate accounts, or cancel orders at
            its sole discretion if it believes user conduct violates applicable law or is harmful
            to the interests of TechBay.
          </p>
        </section>

        <section className="mb-12 scroll-mt-32" id="pricing">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">4.</span> Product Listings, Pricing &amp; Payments
          </h2>
          <p className="mb-4">
            TechBay strives to provide accurate product and pricing information, however,
            typographical errors or inaccuracies may occur.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
              <span className="material-symbols-outlined text-blue-600">payments</span>
              <div>
                <p className="font-bold text-gray-900 mb-1">GST &amp; Taxes</p>
                <p className="text-sm">
                  All prices listed on the Platform are inclusive of GST as applicable under Indian
                  tax laws unless stated otherwise.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
              <span className="material-symbols-outlined text-blue-600">credit_card</span>
              <div>
                <p className="font-bold text-gray-900 mb-1">Payment Gateways</p>
                <p className="text-sm">
                  Payments are processed via authorized third-party gateways. We do not store your
                  full card details on our servers.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-lg bg-gray-50">
              <span className="material-symbols-outlined text-blue-600">local_shipping</span>
              <div>
                <p className="font-bold text-gray-900 mb-1">Order Acceptance</p>
                <p className="text-sm">
                  Receipt of an order confirmation does not signify our acceptance of your order. We
                  reserve the right to limit quantities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 scroll-mt-32" id="law">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">5.</span> Governing Law &amp; Jurisdiction
          </h2>
          <p className="mb-4">
            These Terms &amp; Conditions are governed by and construed in accordance with the laws
            of India.
          </p>
          <p className="mb-4">
            Any disputes arising out of or in connection with these Terms, including any questions
            regarding their existence, validity, or termination, shall be subject to the exclusive
            jurisdiction of the courts located in <strong>Bengaluru, Karnataka, India</strong>.
          </p>
          <p className="mb-4">
            This Platform is compliant with the <strong>Information Technology Act, 2000</strong>{' '}
            and rules made thereunder as applicable and the amended provisions pertaining to
            electronic records in various statutes as amended by the Information Technology Act,
            2000.
          </p>
        </section>

        <section className="mb-6 scroll-mt-32" id="contact">
          <h2 className="text-gray-900 text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-blue-600/40">6.</span> Contact Us
          </h2>
          <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-4xl text-blue-600 mb-4">mail</span>
            <h3 className="text-lg font-bold mb-2">Legal Inquiries</h3>
            <p className="text-sm mb-6 max-w-sm">
              For any questions regarding these Terms or to report a violation, please contact our
              legal compliance officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all"
                href="mailto:legal@techbay.in"
              >
                <span className="material-symbols-outlined text-sm">alternate_email</span>
                <span>legal@techbay.in</span>
              </a>
              <a
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 font-bold rounded-lg hover:bg-gray-50 transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-sm">support_agent</span>
                <span>Contact Help Desk</span>
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}