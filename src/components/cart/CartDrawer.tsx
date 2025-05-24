"use client";

import { useCartStore } from "@/stores/useCartStore";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"

export function CartDrawer() {
  const { items, total, removeFromCart, increaseQty, decreaseQty } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (items.length === 0 && isOpen) {
      setIsOpen(false);
    }
  }, [items.length, isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open && items.length === 0) {
      toast.error("Please add items from the menu.");
      return;
    }
    setIsOpen(open);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <motion.div
          animate={totalItems > 0 ? { y: [0, -10, 0, -5, 0] } : { y: 0 }}
          transition={
            totalItems > 0
              ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
              : {}
          }
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            className="rounded-full p-5 shadow-lg bg-green-300 hover:bg-blue-600 text-white relative"
          >
            <span className="text-4xl">🛒</span>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </Button>
        </motion.div>
      </DrawerTrigger>

      <DrawerContent className="h-full w-[400px] max-w-full ml-auto">
        <div className="backdrop-blur-sm bg-opacity-50 bg-gray-100 absolute inset-0" />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25 }}
          className="relative bg-white h-full p-6 flex flex-col"
        >
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-2xl font-bold mb-6">
              Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
            </DrawerTitle>
          </DrawerHeader>

          {items.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-gray-600 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => decreaseQty(item.id)}
                        className="h-8 w-8 p-0"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="text-sm text-gray-500 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => increaseQty(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">
                      ₹{item.price * item.quantity}
                    </p>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeFromCart(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      ✕
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">₹{total()}</span>
              </div>
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button className="w-full py-6 text-lg">Proceed to Checkout</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
