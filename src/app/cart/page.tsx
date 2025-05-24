"use client";

import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    total,
    clearCart,
  } = useCartStore();

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const lastOrderId = parseInt(localStorage.getItem("lastOrderId") || "0", 10);
    const newOrderId = lastOrderId + 1;

    localStorage.setItem("lastOrderId", newOrderId.toString());

    const newOrder = {
      id: newOrderId,
      items,
      total: total(),
      status: "preparing",
      placedAt: new Date().toISOString(),
    };

    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));
    toast.success("🎉 Order placed successfully! Your food is being prepared.");
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <span className="bg-blue-100 p-3 rounded-full">🛒</span>
              Your Food Cart
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {items.length > 0
                ? "Review your delicious selections before ordering"
                : "Your culinary journey awaits"}
            </p>
          </div>

          {items.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={clearCart}
              className="flex items-center gap-1"
            >
              <span>🗑️</span> Clear Cart
            </Button>
          )}
        </div>

        {/* Empty Cart / Success */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-sm border border-gray-100">
            <div className="text-5xl sm:text-6xl mb-4">🍽️</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
              {orderPlaced ? "Order Placed Successfully!" : "Your Cart is Empty"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm sm:text-base">
              {orderPlaced
                ? "Thank you for your order! Your food is being prepared with care."
                : "Browse our menu and add some tasty items to get started!"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/menu">
                <Button className="px-6 py-3 text-base sm:text-lg bg-blue-600 hover:bg-blue-700">
                  🍔 Browse Menu
                </Button>
              </Link>
              {orderPlaced && (
                <Link href="/orders">
                  <Button variant="outline" className="px-6 py-3 text-base sm:text-lg border-gray-300">
                    View My Orders
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="rounded-lg object-cover w-full sm:w-24 h-24"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <span className="font-semibold text-lg mt-2 sm:mt-0">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-9 h-9 p-0"
                        onClick={() => decreaseQty(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-9 h-9 p-0"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 ml-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary + Order Button */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Order Summary</h3>
                <span className="text-sm text-gray-500">
                  {totalItemCount} item{totalItemCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Sub-total</span>
                  <span>₹{total()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span>₹{total()}</span>
                </div>
              </div>

              <Button
                className="w-full py-4 sm:py-6 text-base sm:text-lg font-bold bg-green-600 hover:bg-green-700"
                onClick={handlePlaceOrder}
              >
                🚀 Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
