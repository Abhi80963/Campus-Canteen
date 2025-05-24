import Image from "next/image";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export type MenuItem = {
  originalPrice: number;
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isVeg: boolean; // ✅ Added isVeg
};

type Props = {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
};

export default function MenuItemCard({ item, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200">
      <div className="relative w-full h-48">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.originalPrice > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          <div className="w-5 h-5 border border-gray-800 flex items-center justify-center">
  <div
    className={`w-3 h-3 ${
      item.isVeg
        ? "bg-green-600 rounded-full"
        : "bg-red-600 clip-triangle"
    }`}
  />
</div>

        </div>

        <p className="text-sm text-gray-600 mt-1 mb-3">{item.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {item.originalPrice > 0 && (
              <span className="text-gray-400 line-through text-sm">
                ₹{item.originalPrice}
              </span>
            )}
            <span className="text-lg font-bold text-amber-600">
              ₹{item.price}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </button>

            <span className="w-6 text-center text-gray-700">{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
            </button>

            <button
              onClick={() => onAddToCart(item, quantity)}
              className="ml-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
