// app/page.tsx
import Homepage from "@/components/homePage/HomePage";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactUsPage from "@/components/contact_Us/page";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Homepage/>
      {/* <ContactUsPage/> */}
      
      <Footer/>
    </div>
  );
}