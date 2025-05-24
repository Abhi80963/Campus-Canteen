"use client";
import { useState } from "react";
import MenuItemCard, { MenuItem } from "@/components/menu/menuItemCard";
import { useCartStore } from "@/stores/useCartStore";
import { Slider } from "@/components/ui/slider";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const allMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Veg Sandwich",
    description: "Grilled sandwich with fresh vegetables.",
    image: "/images/sandwich.jpg",
    price: 60,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "2",
    name: "Chicken Biryani",
    description: "Spicy biryani with raita.",
    image: "/images/briyani.png",
    price: 160,
    originalPrice: 200,
    category: "Main Course",
    isVeg: false,
  },
  {
    id: "3",
    name: "Cold Coffee",
    description: "Iced coffee with cream and chocolate.",
    image: "/images/ccoffee.jpg",
    price: 80,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "4",
    name: "Pizza Margherita",
    description: "Classic cheese and tomato pizza.",
    image: "/images/margherita.jpg",
    price: 190,
    originalPrice: 250,
    category: "Pizza",
    isVeg: true,
  },
  {
    id: "5",
    name: "Spring Rolls",
    description: "Crispy veggie-filled rolls.",
    image: "/images/springroll.jpg",
    price: 90,
    originalPrice: 0,
    category: "Chinese",
    isVeg: true,
  },
  {
    id: "6",
    name: "Chicken Manchurian",
    description: "Spicy chicken balls in tangy sauce.",
    image: "/images/manchurian.jpg",
    price: 90,
    originalPrice: 0,
    category: "Chinese",
    isVeg: false,
  },
  {
    id: "7",
    name: "Salad Bowl",
    description: "Fresh greens with olives and cheese.",
    image: "/images/salad.jpg",
    price: 60,
    originalPrice: 0,
    category: "Salad",
    isVeg: true,
  },
  {
    id: "8",
    name: "Masala Dosa",
    description: "South Indian crispy dosa with filling.",
    image: "/images/dosa.jpg",
    price: 70,
    originalPrice: 90,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "9",
    name: "Lassi",
    description: "Traditional Punjabi sweet yogurt drink.",
    image: "/images/lassi.jpg",
    price: 40,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "10",
    name: "Garlic Bread",
    description: "Toasted bread with garlic and herbs.",
    image: "/images/bread.jpg",
    price: 50,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "11",
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta.",
    image: "/images/pasta.jpg",
    price: 180,
    originalPrice: 0,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "12",
    name: "Chocolate Shake",
    description: "Rich chocolate milkshake.",
    image: "/images/cshake.jpg",
    price: 70,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "13",
    name: "French Fries",
    description: "Crispy golden potato fries.",
    image: "/images/fries.jpg",
    price: 50,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "14",
    name: "Butter Naan",
    description: "Soft naan with melted butter.",
    image: "/images/naan.jpg",
    price: 45,
    originalPrice: 0,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "15",
    name: "Tomato Soup",
    description: "Hot and tangy tomato soup.",
    image: "/images/soup.jpg",
    price: 50,
    originalPrice: 0,
    category: "Starters",
    isVeg: true,
  },
  {
    id: "16",
    name: "Idli Sambar",
    description: "Steamed rice cakes with spicy sambar.",
    image: "/images/idle.jpg",
    price: 60,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "17",
    name: "Green Tea",
    description: "Refreshing herbal green tea.",
    image: "/images/gtea.jpg",
    price: 20,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "18",
    name: "Chole Bhature",
    description: "Spicy chickpeas with fluffy bhature.",
    image: "/images/chole.jpg",
    price: 70,
    originalPrice: 0,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "19",
    name: "Ice Cream",
    description: "Vanilla scoop with choco chips.",
    image: "/images/ice.jpg",
    price: 50,
    originalPrice: 0,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: "20",
    name: "Corn Chat",
    description: "Masala corn served hot.",
    image: "/images/chat.jpg",
    price: 40,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "21",
    name: "Thali Combo",
    description: "Mini thali with dal, rice & sabji.",
    image: "/images/thali.jpg",
    price: 120,
    originalPrice: 150,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "22",
    name: "Green Salad",
    description: "Fresh salad with cucumber and carrots.",
    image: "/images/salad.jpg",
    price: 40,
    originalPrice: 0,
    category: "Salad",
    isVeg: true,
  },
  {
    id: "23",
    name: "Milkshake",
    description: "Chilled milkshake with almonds.",
    image: "/images/milk.jpg",
    price: 70,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "24",
    name: "Gulab Jamun",
    description: "Soft sweet balls dipped in syrup.",
    image: "/images/gulab.jpg",
    price: 60,
    originalPrice: 0,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: "25",
    name: "Noodles",
    description: "Hot garlic noodles with veggies.",
    image: "/images/noddle.jpg",
    price: 65,
    originalPrice: 0,
    category: "Chinese",
    isVeg: true,
  },
  {
    id: "26",
    name: "Kathi Roll",
    description: "Stuffed roti roll with fillings.",
    image: "/images/roll.jpg",
    price: 70,
    originalPrice: 0,
    category: "Snacks",
    isVeg: false,
  },
  {
    id: "27",
    name: "Rasmalai",
    description: "Bengali dessert soaked in milk.",
    image: "/images/ras.jpg",
    price: 75,
    originalPrice: 0,
    category: "Desserts",
    isVeg: true,
  },
  {
    id: "28",
    name: "Tea",
    description: "Hot desi chai.",
    image: "/images/tea.jpg",
    price: 15,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
  {
    id: "29",
    name: "Bhel Puri",
    description: "Crispy puffed rice snack.",
    image: "/images/puri.jpg",
    price: 30,
    originalPrice: 0,
    category: "Snacks",
    isVeg: true,
  },
  {
    id: "30",
    name: "Curd Rice",
    description: "South Indian rice dish.",
    image: "/images/curd.jpg",
    price: 50,
    originalPrice: 0,
    category: "Main Course",
    isVeg: true,
  },
  {
    id: "31",
    name: "Hot Coffee",
    description: "Hot Coffee large size",
    image: "/images/coffee.jpg",
    price: 60,
    originalPrice: 0,
    category: "Beverages",
    isVeg: true,
  },
];

const categories = [
  "All",
  ...new Set(allMenuItems.map((item) => item.category)),
];
const priceRange = [0, Math.max(...allMenuItems.map((item) => item.price))];

export default function MenuPage() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [priceRangeFilter, setPriceRangeFilter] = useState(priceRange);
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = allMenuItems.filter((item) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    // Veg/Non-Veg filter
    const vegMatch =
      vegFilter === "all" ||
      (vegFilter === "veg" && item.isVeg) ||
      (vegFilter === "nonveg" && !item.isVeg);

    // Price range filter
    const priceMatch =
      item.price >= priceRangeFilter[0] && item.price <= priceRangeFilter[1];

    return categoryMatch && vegMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Today&apos;s Menu
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            {showFilters ? (
              <>
                <XMarkIcon className="h-5 w-5" />
                <span>Hide Filters</span>
              </>
            ) : (
              <>
                <FunnelIcon className="h-5 w-5" />
                <span>Filters</span>
              </>
            )}
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8 animate-in fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Food Type */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Food Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["all", "veg", "nonveg"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setVegFilter(type as typeof vegFilter)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vegFilter === type
                          ? type === "veg"
                            ? "bg-green-500 text-white"
                            : type === "nonveg"
                            ? "bg-red-500 text-white"
                            : "bg-amber-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {type === "all"
                        ? "All"
                        : type === "veg"
                        ? "Veg"
                        : "Non-Veg"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₹{priceRangeFilter[0]} - ₹{priceRangeFilter[1]}
                </h3>
                <Slider
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step={10}
                  value={priceRangeFilter}
                  onValueChange={setPriceRangeFilter}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={(item, quantity) => {
                  for (let i = 0; i < quantity; i++) addToCart(item);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No items match your filters</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setVegFilter("all");
                setPriceRangeFilter(priceRange);
              }}
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
