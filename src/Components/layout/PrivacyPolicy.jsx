export default function PrivacyPolicy() {
  return (
    <div className="flex gap-8 bg-gray-50 min-h-screen p-8">
      {/* Sidebar */}
      <aside className="w-72 hidden lg:block">
        <div className="sticky top-8 bg-white p-6 rounded-xl">
          <div className="flex flex-col gap-6">
            <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
              Table of Contents
            </h3>
            <nav className="flex flex-col gap-2">
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 transition-all"
                href="#introduction"
              >
                <span className="material-symbols-outlined text-lg">info</span>
                <span className="text-sm font-medium">Introduction</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#collection"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                <span className="text-sm font-medium">Information We Collect</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#usage"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
                <span className="text-sm font-medium">How We Use Data</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#cookies"
              >
                <span className="material-symbols-outlined text-lg">cookie</span>
                <span className="text-sm font-medium">Cookies &amp; Tracking</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#sharing"
              >
                <span className="material-symbols-outlined text-lg">share</span>
                <span className="text-sm font-medium">Data Sharing</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#rights"
              >
                <span className="material-symbols-outlined text-lg">shield</span>
                <span className="text-sm font-medium">User Rights</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                href="#contact"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                <span className="text-sm font-medium">Contact Us</span>
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button className="w-full py-2 text-xs font-semibold text-gray-400 flex items-center justify-center gap-2 hover:text-blue-600 transition-colors uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">print</span>
              Print Policy
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 max-w-4xl pb-20">
        <div className="bg-white rounded-xl p-8 mb-6" id="introduction">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to TechBay. We value your privacy and are committed to protecting your personal
            data. This Privacy Policy describes how TechBay ("we," "us," or "our") collects, uses,
            and shares your personal information when you visit or make a purchase from our
            platform. By using our services, you agree to the practices described in this policy.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We comply with the Information Technology Act, 2000 (India) and the General Data
            Protection Regulation (GDPR) for our global users, ensuring the highest standards of
            data security and transparency.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 mb-6" id="collection">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We collect several types of information to provide and improve our services to you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">account_circle</span> 
                Identity Data
              </h4>
              <p className="text-sm text-gray-600">
                Includes full name, username, title, date of birth, and gender.
              </p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">contact_mail</span> 
                Contact Data
              </h4>
              <p className="text-sm text-gray-600">
                Includes billing address, delivery address, email address, and telephone numbers.
              </p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">payments</span> 
                Financial Data
              </h4>
              <p className="text-sm text-gray-600">
                Includes payment card details and bank account information processed via secure
                gateways.
              </p>
            </div>
            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">devices</span> 
                Technical Data
              </h4>
              <p className="text-sm text-gray-600">
                Includes IP address, login data, browser type, and operating system.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 mb-6" id="usage">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We use the collected data for various purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              To process and deliver your orders including managing payments, fees, and charges.
            </li>
            <li>
              To manage our relationship with you which will include notifying you about changes to
              our terms or privacy policy.
            </li>
            <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
            <li>
              To administer and protect our business and this website (including troubleshooting,
              data analysis, testing, system maintenance, support, reporting and hosting of data).
            </li>
            <li>
              To use data analytics to improve our website, products/services, marketing, customer
              relationships and experiences.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-8 mb-6" id="cookies">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies &amp; Tracking Technologies</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We use cookies and similar tracking technologies to track the activity on our Service
            and hold certain information. Cookies are files with small amount of data which may
            include an anonymous unique identifier.
          </p>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <p className="font-semibold text-blue-600 mb-2">Manage Your Preferences</p>
            <p className="text-sm text-gray-600">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is
              being sent. However, if you do not accept cookies, you may not be able to use some
              portions of our Service.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 mb-6" id="sharing">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing &amp; Disclosure</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We may share your personal information with third parties to help us use your personal
            information, as described above. For example, we use Shopify to power our online store.
            We also use Google Analytics to help us understand how our customers use the Site.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Finally, we may also share your Personal Information to comply with applicable laws and
            regulations, to respond to a subpoena, search warrant or other lawful request for
            information we receive, or to otherwise protect our rights.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 mb-6" id="rights">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Legal Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to
            your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>
              <strong className="text-gray-900">Request access</strong> to your personal data.
            </li>
            <li>
              <strong className="text-gray-900">Request correction</strong> of the personal data that we hold about you.
            </li>
            <li>
              <strong className="text-gray-900">Request erasure</strong> of your personal data.
            </li>
            <li>
              <strong className="text-gray-900">Object to processing</strong> of your personal data.
            </li>
            <li>
              <strong className="text-gray-900">Request restriction of processing</strong> of your personal data.
            </li>
            <li>
              <strong className="text-gray-900">Request the transfer</strong> of your personal data to you or to a third
              party.
            </li>
            <li>
              <strong className="text-gray-900">Withdraw consent</strong> at any time where we are relying on consent to
              process your personal data.
            </li>
          </ul>
        </div>

        <div
          className="bg-white rounded-xl p-8 text-center" id="contact"
        >
          <span className="material-symbols-outlined text-5xl text-blue-600 mb-4 inline-block">gavel</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Questions or Concerns?</h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            If you have any questions about this Privacy Policy or our data practices, please
            contact our Data Protection Officer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">mail</span>
              Contact Legal Team
            </button>
            <button className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
              Submit a Ticket
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}