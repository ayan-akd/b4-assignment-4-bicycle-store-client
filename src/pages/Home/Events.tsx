import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Weekend Mountain Trail",
    date: "Every Saturday",
    location: "Blue Mountain Trail",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=500",
    participants: "20+",
    description:
      "Join our weekly mountain biking adventure. Perfect for intermediate riders looking for thrills!",
  },
  {
    id: 2,
    title: "City Night Ride",
    date: "Last Friday Monthly",
    location: "Downtown Paradise",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=500",
    participants: "50+",
    description:
      "Experience the city lights on two wheels. A peaceful night ride through scenic routes.",
  },
  {
    id: 3,
    title: "Beginner's Workshop",
    date: "Every Sunday",
    location: "Pedal Paradise Store",
    image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=500",
    participants: "15",
    description:
      "Learn basic bicyclemaintenance and riding techniques from our experts.",
  },
  {
    id: 4,
    title: "Annual Paradise Race",
    date: "October 15, 2024",
    location: "Paradise Valley Circuit",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500",
    participants: "100+",
    description:
      "Our flagship racing event with categories for all skill levels. Great prizes to be won!",
  },
];

export default function Events() {
  return (
    <div className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Upcoming Cycling Events
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join our community rides and activities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p
                  title={event.description}
                  className="text-gray-600 mb-4 line-clamp-1"
                >
                  {event.description}
                </p>
                <div className="flex flex-col gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <TeamOutlined className="mr-2" />
                    {event.participants} participants
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
