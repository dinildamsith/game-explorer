"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Gamepad2, Users, Store, Trophy } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Games", icon: Gamepad2 },
    { href: "/creators", label: "Creators", icon: Users },
    { href: "/stores", label: "Stores", icon: Store },
    { href: "/achievements", label: "Achievements", icon: Trophy },
  ]

  return (
    <nav className="flex items-center gap-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={`gap-2 transition-all duration-200 hover:scale-105 ${
                isActive
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
