import Navbar from './navbar';
import Footer from './footer';
import { motion } from "framer-motion";
export default function Layout({ children }) {
  return (
    <div className="text-gray-900 bg-white">
      <Navbar />
      <motion.main
        initial={{
          opacity: 0
        }} // Set the initial state to variants.hidden
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
            duration: 3
          }
        }} // Animated state to variants.enter
        exit={{
          opacity: 0,
          transition: {
            delay: 2,
            duration: 3
          }
        }} // Exit state (used later) to variants.exit
        className="dark:bg-gray-900 bg-blue-100 dark:text-white">
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}