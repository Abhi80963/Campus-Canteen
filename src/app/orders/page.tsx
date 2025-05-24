"use client";

import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  status: string;
  placedAt: string;
  total: number;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showOlder, setShowOlder] = useState<boolean>(false);
  const debouncedQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]") as Order[];
    setOrders(storedOrders.reverse());
  }, []);

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      filterStatus === "all" || order.status.toLowerCase() === filterStatus;
    const orderIdMatch = order.id.toString().toLowerCase().includes(debouncedQuery.toLowerCase());
    const itemMatch = order.items.some((item) =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    const searchMatch = debouncedQuery === "" || orderIdMatch || itemMatch;
    const dateMatch = showOlder ? !isToday(order.placedAt) : isToday(order.placedAt);
    return statusMatch && searchMatch && dateMatch;
  });

  const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "preparing", label: "👨‍🍳 Preparing" },
    { value: "ready", label: "✅ Ready" },
    { value: "delivered", label: "🚚 Delivered" },
    { value: "cancelled", label: "❌ Cancelled" },
  ];

  const formatOrderId = (id: number) => `#${id.toString().padStart(3, "0")}`;

  const getTotalItemCount = (items: OrderItem[]) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-blue-100 p-2 rounded-full">🍱</span>
              My Orders
            </h1>
            <p className="text-gray-600 mt-1">
              {showOlder ? "Viewing older orders" : "Today's orders"}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-sm">
            <span className="text-gray-500 ml-2">🔍</span>
            <input
              type="text"
              placeholder="Search orders or items..."
              aria-label="Search orders"
              className="py-1 px-2 outline-none bg-transparent w-40 md:w-56"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilterStatus(option.value)}
              aria-label={`Filter by ${option.label}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filterStatus === option.value
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {orders.length === 0 ? "No orders yet!" : "No matching orders"}
            </h3>
            <p className="text-gray-500">
              {orders.length === 0
                ? "Your delicious journey hasn't started yet. Visit the canteen to place your first order!"
                : "Try adjusting filters or your search term."}
            </p>
          </div>
        ) : (
          <div className="space-y-4" role="list">
            {filteredOrders.map((order) => {
              const itemCount = getTotalItemCount(order.items);
              const dateObj = new Date(order.placedAt);
              return (
                <div
                  key={order.id}
                  role="listitem"
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">Order {formatOrderId(order.id)}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <span>📅</span>
                        {dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString()}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "preparing"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "ready"
                          ? "bg-green-100 text-green-800"
                          : order.status === "delivered"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "preparing"
                        ? "👨‍🍳 Preparing"
                        : order.status === "ready"
                        ? "✅ Ready for Pickup"
                        : order.status === "delivered"
                        ? "🚚 Delivered"
                        : order.status === "cancelled"
                        ? "❌ Cancelled"
                        : "🔄 Unknown"}
                    </span>
                  </div>

                  <div className="border-t pt-3 mt-2">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <span>🍴</span> Items Ordered:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between text-sm p-2 bg-gray-50 rounded"
                        >
                          <span>
                            {item.quantity} × {item.name}
                          </span>
                          <span className="font-medium">
                            ₹{item.price * item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between items-center border-t pt-3">
                      <div className="text-sm text-gray-500">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        Total: ₹{order.total}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {orders.length > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowOlder(!showOlder)}
              className="bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-all duration-200 px-6 py-2 text-white font-medium rounded-xl shadow-md"
            >
              {showOlder ? "Hide Orders" : "View Orders"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
