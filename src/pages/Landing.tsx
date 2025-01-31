import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, Upload, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-cabinet">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">PetHaven</div>
        <div className="space-x-4">
          <Link to="/blog">
            <Button variant="ghost" className="hover:bg-blue-100">
              Blog
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
              Sign in
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Animal Rescue Operations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful software designed to help you save more lives and manage your rescue operations efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20"
          >
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Data Visualization</h3>
            <p className="text-gray-600">
              Generate beautiful and easy-to-read graphs that help you better understand your life-saving efforts with just a few clicks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20"
          >
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Upload className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Automatic Pet Exports</h3>
            <p className="text-gray-600">
              Maintain your adoptable pets' digital presence through automatic exports to Petfinder, Adopt-A-Pet, and more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-lg border border-white/20"
          >
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <FileText className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Applications</h3>
            <p className="text-gray-600">
              Our smart applications autogenerate profiles for people and keep their information up to date automatically.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Landing;