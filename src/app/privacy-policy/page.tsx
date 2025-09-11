import Image from "next/image";

export default function page() {
  return (
    <div>
      <div>
        <div className="flex gap-20 mt-30">
          <div>
            <h2 className="text-white">Privacy & Policy</h2>
            <p>
              Your Privacy, Our Priority. We respect your privacy regarding any
              information we may collect from you across our coding platform and
              services.
            </p>
          </div>
          <Image
            src="/images/amico.png"
            alt="Hero Illustration"
            width={470}
            height={450}
            priority
          />
        </div>

        <div>
          {/* section 1 */}
          <div className="flex flex-col gap-2">
            <h5>Our Commitment to Your Privacy </h5>
            <div className="flex flex-col gap-6">
              <p>
                At CodeCompass , we are committed to protecting your privacy and
                ensuring the security of your personal information. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our coding education platform,
                use our services, or engage with our content.
              </p>
              <p>
                By accessing or using our platform, you acknowledge that you
                have read, understood, and agree to be bound by this Privacy
                Policy. If you do not agree with our policies and practices,
                please do not use our services.
              </p>
            </div>
          </div>

          {/* section 2 */}
          <div>
            <h5>What information do we collect?</h5>
            <div>
              <h6>Personal Information</h6>
              <p>
                We collect personal information that you provide directly to us
                when you create an account, subscribe to our services, or
                communicate with us. This may include your name, email address,
                username, profile information, and any other information you
                choose to provide.
              </p>

              <ul>
                <li>Account registration details (name, email, username)</li>
                <li>Profile information and preferences</li>
                <li>Communication and correspondence records</li>
                <li>
                  Payment information (processed securely by third-party
                  providers)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
