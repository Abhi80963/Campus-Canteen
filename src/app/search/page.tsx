"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { menuItems } from "@/components/data/menuItems";
import { useCartStore } from "@/stores/useCartStore";
import { Button } from "@/components/ui/button";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  isVeg: boolean;
};

type CartItem = MenuItem & {
  quantity: number;
};

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const { addToCart } = useCartStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!query) {
      setFilteredItems([]);
      return;
    }

    const searchResults = menuItems.filter((item) => {
      const combinedText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
      const words = combinedText.split(/\s+/);
      return words.includes(query);
    });

    setFilteredItems(searchResults);
  }, [query]);

  useEffect(() => {
    const initialQuantities = menuItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {} as Record<string, number>);
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (id: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value),
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      const cartItem: CartItem = { ...item, quantity: 1 };
      addToCart(cartItem);
    }

    setQuantities((prev) => ({
      ...prev,
      [item.id]: 1,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Search Results for <span className="text-amber-600">&quot;{query}&quot;</span>
        </h1>
        {filteredItems.length > 0 && (
          <span className="text-sm text-gray-500">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
          </span>
        )}
      </div>

      {filteredItems.length === 0 && query ? (
        <div className="text-center py-12">
          <FunnelIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            No results found for <strong className="text-gray-900">&quot;{query}&quot;</strong>
          </p>
          <p className="text-gray-500 mb-6">Try searching for a different item</p>
          <Link
            href="/menu"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Browse Full Menu
          </Link>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Link href={`/menu/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-t-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {item.originalPrice > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(
                        ((item.originalPrice - item.price) / item.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  )}
                </Link>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
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
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    {item.originalPrice > 0 && (
                      <span className="text-gray-400 line-through text-sm mr-2">
                        ₹{item.originalPrice}
                      </span>
                    )}
                    <span className="font-bold text-amber-600">
                      ₹{item.price}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, -1);
                    }}
                    className="w-8 h-8 p-0 rounded-full hover:bg-amber-100"
                    disabled={quantities[item.id] <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantities[item.id] || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.id, 1);
                    }}
                    className="w-8 h-8 p-0 rounded-full hover:bg-amber-100"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Start typing in the search box to find menu items
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
