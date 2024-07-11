'use client'
import Header from "@/app/_components/Header";
import Navbar from "@/app/_components/Navbar";
import { useAppDispatch } from "@/lib/hooks";
import { RootState } from "@/lib/store/store";
import Script from "next/script";
import { useSelector } from "react-redux";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const Subscribe = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  
  if (!user) {
    return null; 
  }

  return (
    <>
      <header className="fixed shadow-md bg-white w-full z-40">
        <Header />
        <Navbar />
      </header>
      <main className="pt-28 w-full overflow-hidden scroll-smooth">
        <Script
          async
          strategy="lazyOnload"
          src="https://js.stripe.com/v3/pricing-table.js"
        />
        <stripe-pricing-table
          pricing-table-id="prctbl_1PYitaSAko7jb74qDYq2bmk2"
          publishable-key="pk_test_51MwfthSAko7jb74qBqp0nLAr5MPlEB8t2IY4vWa87xkvPtqm6U1KxFPLP4mTpWFIbECSInfkr6zQtTWJiKe2Dc8l00QHNfLHMb"
          customer-email={user.email}
        />
      </main>
    </>
  );
};

export default Subscribe;
