"use client";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t mt-24 w-full">
      <div className="mx-auto px-4 sm:px-6 md:px-8 2xl:px-0 py-10 md:py-16 max-w-[1480px] w-full">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4 flex flex-col items-start">
            <div className="flex items-center space-x-3 md:space-x-4">
              <img
                src="https://res.cloudinary.com/drmeagmkl/image/upload/v1772007286/logo_rcsr8h.png"
                className="w-[54px] h-[54px] xs:w-[60px] xs:h-[60px] sm:w-[64px] sm:h-[64px] md:w-[70px] md:h-[70px] rounded-full object-cover"
                alt=""
              />
              <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-2xl font-bold text-primary tracking-tight">
                FoodHub
              </h2>
            </div>
            <p className="text-gray-600 text-xs xs:text-sm md:text-sm leading-relaxed max-w-xs md:max-w-[240px]">
              Discover & order delicious meals from trusted providers near you.
              Fresh food. Fast delivery. Simple experience.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs xs:text-sm font-semibold text-gray-900 mb-3 xs:mb-4">
              Products
            </h3>
            <ul className="space-y-2 xs:space-y-2.5 md:space-y-3 text-xs xs:text-sm md:text-sm text-gray-600">
              <li>
                <Link href="/meals" className="hover:text-primary transition">
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link
                  href="/providers"
                  className="hover:text-primary transition"
                >
                  Providers
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-primary transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Customers */}
          <div>
            <h3 className="text-xs xs:text-sm font-semibold text-gray-900 mb-3 xs:mb-4">
              For Customers
            </h3>
            <ul className="space-y-2 xs:space-y-2.5 md:space-y-3 text-xs xs:text-sm md:text-sm text-gray-600">
              <li>
                <Link href="/cart" className="hover:text-primary transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-primary transition">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/profile/user" className="hover:text-primary transition">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-primary transition"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h3 className="text-xs xs:text-sm font-semibold text-gray-900 mb-3 xs:mb-4">
              For Providers
            </h3>
            <ul className="space-y-2 xs:space-y-2.5 md:space-y-3 text-xs xs:text-sm md:text-sm text-gray-600">
              <li>
                <Link
                  href="/provider/dashboard"
                  className="hover:text-primary transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/provider/menu"
                  className="hover:text-primary transition"
                >
                  Manage Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/provider/orders"
                  className="hover:text-primary transition"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs xs:text-sm font-semibold text-gray-900 mb-3 xs:mb-4">
              Support
            </h3>
            <ul className="space-y-2 xs:space-y-2.5 md:space-y-3 text-xs xs:text-sm md:text-sm text-gray-600">
              <li className="hover:text-primary transition cursor-pointer break-all">
                dev.sujonbiswas@gmail.com
              </li>
              <li className="hover:text-primary transition cursor-pointer">
                +880 1788477912
              </li>
              <li className="text-gray-500">Sylhet, Bangladesh</li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 xs:gap-4 mt-4 xs:mt-6">
              <Link href={"https://facebook.com/sujonbiswasdev"}>
                <Facebook className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500 hover:text-primary transition cursor-pointer" />
              </Link>
              <Link href={"https://instagram.com/sujonbiswasdev"}>
                <Instagram className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500 hover:text-primary transition cursor-pointer" />
              </Link>
              <Link href={"https://linkedin.com/in/sujonbiswasdev"}>
                <Linkedin className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500 hover:text-primary transition cursor-pointer" />
              </Link>
              <Link href={"https://twitter.com/sujonbiswasdev"}>
                <Twitter className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500 hover:text-primary transition cursor-pointer" />
              </Link>
              <Link
                href={`https://wa.me/01804935939`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/whatsapp.png" className="w-7 h-7 xs:w-8 xs:h-8 text-gray-500 hover:text-primary transition cursor-pointer" alt="" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 md:mt-16 pt-4 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 text-xs xs:text-sm text-gray-500 w-full">
          <p className="text-center md:text-left w-full md:w-auto">
            © {new Date().getFullYear()} FoodHub. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 xs:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
