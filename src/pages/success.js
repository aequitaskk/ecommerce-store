import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";

function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const sessionId = router.query.session_id;
  const { data, error } = useSWR(
    () => (sessionId ? `/api/checkout-sessions/${sessionId}` : null),
    (url) => axios.get(url).then((res) => res.data),
    {
      onSuccess: () => {
        clearCart();
      },
    }
  );

  const email = data?.customer_details?.email;

  console.log(data, error);

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md text-gray-500 max-w-md mx-auto">
          <p className="text-lg">Loading...</p>
        </div>
      ) : (
        <div className="py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto">
          <Image
            src="/images/check.png"
            alt="check"
            width={100}
            height={100}
            className="mx-auto flex-shrink-0"
          />
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            Thanks for your order!
          </h2>
          <p className="text-lg">
            Check your email ({email}) for your invoice.
          </p>
        </div>
      )}
    </div>
  );
}

export default SuccessPage;
