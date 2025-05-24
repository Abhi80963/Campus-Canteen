"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";
import { useState, useEffect } from "react";
import { MenuItem } from "@/components/menu/menuItemCard";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const foodImages = ["/e1.png", "/e2.png", "/e3.png"];
const generatePositions = () =>
  Array.from({ length: foodImages.length }, () => ({
    top: `${Math.random() * 80 + 5}%`,
    left: `${Math.random() * 90 + 5}%`,
  }));

type CartItem = MenuItem & {
  quantity: number;
};

export default function TodayMealSection() {
  const { addToCart } = useCartStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [positions, setPositions] = useState<{ top: string; left: string }[]>([]);

  const [deals] = useState<MenuItem[]>([
    { 
      id: "1", 
      name: "Pepperoni Pizza", 
      description: "Classic pepperoni with extra cheese", 
      price: 168, 
      originalPrice: 210, 
      image: "/images/p1.jpg", 
      category: "Main Course", 
      isVeg:true
    },
    { 
      id: "2", 
      name: "Margherita Pizza", 
      description: "Fresh basil and mozzarella", 
      price: 130, 
      originalPrice: 160, 
      image: "/images/p2.jpg", 
      category: "Main Course",
      isVeg:true 
    },
    { 
      id: "3", 
      name: "BBQ Chicken", 
      description: "Smoky BBQ sauce with grilled chicken", 
      price: 250, 
      originalPrice: 300, 
      image: "/images/p3.jpg", 
      category: "Main Course", 
      isVeg:true
    },
    { 
      id: "4", 
      name: "Veggie Supreme", 
      description: "Loaded with fresh vegetables", 
      price: 230, 
      originalPrice: 280, 
      image: "/images/p4.jpg", 
      category: "Main Course", 
      isVeg:true
    },
  ]);

  useEffect(() => {
    setPositions(generatePositions());
    // Initialize quantities
    const initialQuantities = deals.reduce((acc, deal) => {
      acc[deal.id] = 1;
      return acc;
    }, {} as Record<string, number>);
    setQuantities(initialQuantities);
  }, [deals]);

  const updateQuantity = (id: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value)
    }));
  };

 const handleAddToCart = (deal: MenuItem) => {
    // Add the item N times where N is the current quantity
    for (let i = 0; i < (quantities[deal.id] || 1); i++) {
      const cartItem: CartItem = {
        ...deal,
        quantity: 1 // Each addition is a single item
      };
      addToCart(cartItem);
    }
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [deal.id]: 1
    }));
  };

  return (
    <section className="py-20 bg-yellow-50 text-center relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-amber-700"
        >
          Today&apos;s Special Deals
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 mb-4">
                <Image 
                  src={deal.image} 
                  alt={deal.name} 
                  fill 
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {Math.round(((deal.originalPrice - deal.price) / deal.originalPrice * 100))}% OFF
                </div>
              </div>
              
              <h4 className="text-xl font-bold">{deal.name}</h4>
              <p className="text-sm text-gray-600 mt-2 min-h-[40px]">{deal.description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-gray-400 line-through text-sm">
                    ₹{deal.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-amber-700 block">
                    ₹{deal.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(deal.id, -1);
                    }}
                    className="w-8 h-8 p-0 rounded-full hover:bg-amber-100 cursor-pointer"
                    disabled={quantities[deal.id] <= 1}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantities[deal.id] || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(deal.id, 1);
                    }}
                    className="w-8 h-8 p-0 rounded-full hover:bg-amber-100 cursor-pointer"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={() => handleAddToCart(deal)}
                className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white cursor-pointer transition-colors"
              >
                Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-20 opacity-20 hover:opacity-40 transition-opacity"
          style={pos}
          animate={{ 
            rotate: 360,
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 20 + i * 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Image 
            src={foodImages[i]} 
            alt={`decorative food ${i}`} 
            width={100} 
            height={100} 
            className="object-contain"
          />
        </motion.div>
      ))}
    </section>
  );
}