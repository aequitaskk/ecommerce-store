import CartProduct from "@/components/CartProduct";
import { useShoppingCart } from "use-shopping-cart";

function CartPage() {
  const { cartCount, clearCart, formattedTotalPrice, cartDetails } =
    useShoppingCart();

  return (
    <div className="container xl:max-w-screen-xl mx-auto py-12 px-6">
      {cartCount > 0 ? (
        <>
          <h2 className="text-4xl font-semibold">Your cart</h2>
          <div className="flex items-center mt-1">
            <p className="text-xl">{cartCount} items</p>
            <button
              onClick={() => clearCart()}
              className="opacity-50 hover:opacity-100 transition text-base ml-1"
            >
              (Clear All)
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-semibold">Your cart is empty</h2>
        </>
      )}

      {cartCount > 0 && (
        <div className="mt-12 space-y-4">
          {Object.entries(cartDetails).map(([productId, product]) => (
            <CartProduct key={productId} product={product} />
          ))}
          <div className="flex flex-col items-end border-t py-4 mt-8">
            <div className="flex space-x-2">
              <p className="text-xl">Total:</p>
              <p className="font-semibold text-xl">{formattedTotalPrice}</p>
            </div>
            <button className="border rounded py-2 px-6 bg-yellow-500 hover:bg-yellow-600 transition border-yellow-500 hover:border-yellow-600 focus:ring-4 focus:ring-opacity-50 focus:ring-yellow-500 text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-yellow-500 mt-4 max-w-max">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
