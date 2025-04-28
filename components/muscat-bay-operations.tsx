"use client"

import { useState } from "react"
// Importing necessary components from recharts for data visualization
import {
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
// Importing icons from lucide-react
import {
  Search,
  Bell,
  User,
  Home,
  FileText,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Droplet,
  Activity,
  AlertTriangle,
  ChevronDown,
  Zap,
  Server,
  Thermometer,
  Bug,
  Users,
  Calendar,
  Filter,
} from "lucide-react"

// Main component for the Muscat Bay Operations dashboard
const MuscatBayOperations = () => {
  // State management
  const [activeModule, setActiveModule] = useState("overview")
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null)
  const [expandedMenus, setExpandedMenus] = useState(["utilities"])

  // --- Color Scheme Definition ---
  // Primary Dark (#4E4456) - Main brand color
  const primaryDarkBg = "bg-primary-dark" // Sidebar background using exact #4E4456 color
  const primaryDarkBgAccent = "bg-primary-dark-accent" // Button backgrounds, sidebar active/hover
  const primaryDarkBgHover = "hover:bg-primary-dark-accent" // Button hover
  const primaryDarkText = "text-white" // Text on dark backgrounds
  const primaryDarkTextAccent = "text-gray-300" // Lighter text on dark backgrounds
  const primaryDarkBorder = "border-primary-dark-accent" // Borders on dark backgrounds

  // Primary Text/Accents on Light Backgrounds
  const primaryText = "text-primary-dark" // Main text color for headings/buttons
  const primaryTextHover = "hover:text-primary-dark" // Hover for links/buttons
  const primaryFill = "fill-primary-dark" // Fill for charts/icons
  const primaryStroke = "stroke-primary-dark" // Stroke for charts/icons

  // Card styles
  const cardBg = "bg-white" // White background for all cards
  const cardHover = "hover:shadow-lg" // Consistent hover effect
  const cardShadow = "shadow-md" // Consistent shadow
  const cardBorder = "border border-gray-100" // Subtle border
  const cardIconBg = "bg-gray-50" // Light gray background for icons

  // Button styles
  const primaryButton = `${primaryDarkBg} hover:bg-primary-dark-accent text-white`
  const secondaryButton = "bg-gray-100 hover:bg-gray-200 text-primary-dark"
  const outlineButton = "border border-gray-200 bg-white hover:bg-gray-50 text-primary-dark"

  // Status colors (semantic colors kept for clarity)
  const alertColor = "#ef4444" // Red
  const warningColor = "#f59e0b" // Yellow/Orange
  const successColor = "#10b981" // Green
  const infoColor = "#3b82f6" // Blue

  // Helper function to toggle menus
  const toggleMenu = (menu: string) => {
    setExpandedMenus(expandedMenus.includes(menu) ? expandedMenus.filter((m) => m !== menu) : [...expandedMenus, menu])
  }

  // Navigation handler
  const handleNavigation = (module: string, subModule: string | null = null) => {
    setActiveModule(module)
    setActiveSubModule(subModule)
    if (subModule && !expandedMenus.includes(module)) {
      setExpandedMenus([...expandedMenus, module])
    }
  }

  // --- Mock Data ---
  // Overview Tiles (Updated with new color scheme)
  const overviewTiles = [
    {
      id: "water",
      title: "Water Consumption",
      value: "5,500 m³",
      trend: "+5%",
      trendType: "increase",
      icon: <Droplet className="h-6 w-6 text-primary-dark" />,
      module: "utilities",
      subModule: "water",
    },
    {
      id: "electricity",
      title: "Electricity Usage",
      value: "16,000 kWh",
      trend: "+3%",
      trendType: "increase",
      icon: <Zap className="h-6 w-6 text-primary-dark" />,
      module: "utilities",
      subModule: "electricity",
    },
    {
      id: "hvac",
      title: "HVAC Efficiency",
      value: "92%",
      trend: "-1%",
      trendType: "decrease",
      icon: <Thermometer className="h-6 w-6 text-primary-dark" />,
      module: "hvac",
    },
    {
      id: "stp",
      title: "STP Production",
      value: "1,200 m³",
      trend: "+2%",
      trendType: "increase",
      icon: <Server className="h-6 w-6 text-primary-dark" />,
      module: "stp",
    },
    {
      id: "contractors",
      title: "Active Contractors",
      value: "14",
      trend: "+2",
      trendType: "neutral",
      icon: <Users className="h-6 w-6 text-primary-dark" />,
      module: "contractors",
    },
    {
      id: "pest-control",
      title: "Pest Treatment",
      value: "12 sites",
      trend: "Next: 05/15",
      trendType: "neutral",
      icon: <Bug className="h-6 w-6 text-primary-dark" />,
      module: "pest-control",
    },
  ]

  // Recent Activity (Updated water icon background and scheduled status)
  const recentActivity = [
    {
      id: 1,
      module: "water",
      title: "High water loss detected in Zone 05",
      description: "Loss rate exceeded 65% threshold",
      time: "2 hours ago",
      status: "critical",
    },
    {
      id: 2,
      module: "hvac",
      title: "AC maintenance completed",
      description: "Block C units serviced and filters replaced",
      time: "4 hours ago",
      status: "completed",
    },
    {
      id: 3,
      module: "electricity",
      title: "Power consumption spike",
      description: "Pumping Station 1 showing 22% increase",
      time: "Yesterday",
      status: "investigating",
    },
    {
      id: 4,
      module: "contractors",
      title: "New contractor added",
      description: "Alpha Services registered for electrical works",
      time: "Yesterday",
      status: "completed",
    },
    {
      id: 5,
      module: "stp",
      title: "STP maintenance scheduled",
      description: "Annual service planned for May 10",
      time: "3 days ago",
      status: "scheduled",
    },
  ]

  // Upcoming Tasks (Updated water icon background)
  const upcomingTasks = [
    {
      id: 1,
      module: "water",
      title: "Zone 05 leak detection",
      dueDate: "Apr 30, 2025",
      priority: "high",
      assignee: "Mohammed A.",
    },
    {
      id: 2,
      module: "stp",
      title: "STP water quality testing",
      dueDate: "Apr 30, 2025",
      priority: "medium",
      assignee: "Sarah K.",
    },
    {
      id: 3,
      module: "hvac",
      title: "HVAC filter replacement - Block B",
      dueDate: "May 05, 2025",
      priority: "medium",
      assignee: "Rahul M.",
    },
    {
      id: 4,
      module: "pest-control",
      title: "Pest treatment - Common areas",
      dueDate: "May 10, 2025",
      priority: "low",
      assignee: "Pest Control Inc.",
    },
  ]

  // Chart Data
  const waterConsumptionData = [
    { month: "Jan", usage: 4200 },
    { month: "Feb", usage: 3800 },
    { month: "Mar", usage: 5100 },
    { month: "Apr", usage: 4600 },
    { month: "May", usage: 3700 },
    { month: "Jun", usage: 5500 },
  ]

  const electricityConsumptionData = [
    { month: "Jan", usage: 12000, peak: 16000 },
    { month: "Feb", usage: 11000, peak: 14500 },
    { month: "Mar", usage: 14000, peak: 18000 },
    { month: "Apr", usage: 13500, peak: 17200 },
    { month: "May", usage: 16000, peak: 19500 },
    { month: "Jun", usage: 17000, peak: 21000 },
  ]

  const zoneData = [
    { name: "Zone 05", supply: 3862, consumed: 1184, loss: 2678, lossPercent: 69.3 },
    { name: "Zone 03 (A)", supply: 3591, consumed: 1129, loss: 2462, lossPercent: 68.6 },
    { name: "Zone 03 (B)", supply: 3331, consumed: 1470, loss: 1861, lossPercent: 55.9 },
    { name: "Zone 08", supply: 2605, consumed: 2356, loss: 249, lossPercent: 9.6 },
    { name: "Zone 01 (FM)", supply: 1880, consumed: 1817, loss: 63, lossPercent: 3.4 },
  ]

  const utilityDistributionData = {
    water: [
      { name: "Retail", value: 25640, percentage: 79.5 },
      { name: "Res (Villa)", value: 4966, percentage: 15.4 },
      { name: "Res (Apt)", value: 1094, percentage: 3.4 },
      { name: "Irrigation", value: 326, percentage: 1.0 },
      { name: "Common", value: 238, percentage: 0.7 },
    ],
    electricity: [
      { name: "Residential", value: 8600, percentage: 53.8 },
      { name: "Commercial", value: 4300, percentage: 26.9 },
      { name: "Common Areas", value: 1800, percentage: 11.3 },
      { name: "Pumping", value: 1300, percentage: 8.1 },
    ],
  }

  // Updated chart colors to match primary theme
  const chartColors = ["#4E4456", "#6A5F74", "#867992", "#A294B0", "#BEB3C9"]

  // --- Render Functions ---

  // Render Overview Dashboard
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Muscat Bay Assets and Operation</p>
      </div>

      {/* Key metrics tiles grid - Updated with consistent styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewTiles.map((tile) => (
          <div
            key={tile.id}
            className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-5 cursor-pointer ${cardHover} transition-all duration-200`}
            onClick={() => handleNavigation(tile.module, tile.subModule)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{tile.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{tile.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${cardIconBg}`}>{tile.icon}</div>
            </div>
            <div className="mt-4 flex items-center">
              <span
                className={`text-sm ${tile.trendType === "increase" ? "text-red-600" : tile.trendType === "decrease" ? "text-green-600" : "text-gray-600"} flex items-center`}
              >
                {tile.trendType === "increase" && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {tile.trendType === "decrease" && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {tile.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Water Consumption Chart Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Water Consumption</h2>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${outlineButton}`}
              onClick={() => handleNavigation("utilities", "water")}
            >
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={waterConsumptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWaterUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4E4456" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4E4456" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} tick={{ fill: "#6b7280" }} />
              <YAxis fontSize={12} tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }}
                itemStyle={{ color: "#1f2937" }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
                formatter={(value) => `${value.toLocaleString()} m³`}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#4E4456"
                fillOpacity={1}
                fill="url(#colorWaterUsage)"
                name="Consumption (m³)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Electricity Usage Chart Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Electricity Usage</h2>
            <button
              className={`px-3 py-1 text-sm font-medium rounded-md ${outlineButton}`}
              onClick={() => handleNavigation("utilities", "electricity")}
            >
              View Details
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={electricityConsumptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6A5F74" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6A5F74" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" fontSize={12} tick={{ fill: "#6b7280" }} />
              <YAxis fontSize={12} tick={{ fill: "#6b7280" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }}
                itemStyle={{ color: "#1f2937" }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
                formatter={(value) => `${value.toLocaleString()} kWh`}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#6A5F74"
                fillOpacity={1}
                fill="url(#colorElectricity)"
                name="Usage (kWh)"
              />
              <Area type="monotone" dataKey="peak" stroke="#4E4456" fillOpacity={0} name="Peak Demand (kWh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity and Tasks Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg overflow-hidden`}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start">
                  {/* Icon background - consistent styling */}
                  <div className={`p-2 rounded-full ${cardIconBg}`}>
                    {/* Icon color - consistent styling */}
                    {activity.module === "water" ? (
                      <Droplet className="h-5 w-5 text-primary-dark" />
                    ) : activity.module === "electricity" ? (
                      <Zap className="h-5 w-5 text-primary-dark" />
                    ) : activity.module === "hvac" ? (
                      <Thermometer className="h-5 w-5 text-primary-dark" />
                    ) : activity.module === "stp" ? (
                      <Server className="h-5 w-5 text-primary-dark" />
                    ) : activity.module === "contractors" ? (
                      <Users className="h-5 w-5 text-primary-dark" />
                    ) : (
                      <Bug className="h-5 w-5 text-primary-dark" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                      {/* Status badge (using primary dark for scheduled) */}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          activity.status === "critical"
                            ? "bg-red-100 text-red-800"
                            : activity.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : activity.status === "scheduled"
                                ? `bg-primary-dark bg-opacity-10 text-primary-dark`
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <button className={`text-sm ${primaryText} ${primaryTextHover} font-medium`}>View all activity</button>
          </div>
        </div>

        {/* Upcoming Tasks Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg overflow-hidden`}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h2>
            {/* Use primary button style */}
            <button className={`px-3 py-1 text-sm font-medium rounded-md flex items-center shadow-sm ${primaryButton}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start">
                  {/* Icon background - consistent styling */}
                  <div className={`p-2 rounded-full ${cardIconBg}`}>
                    {/* Icon color - consistent styling */}
                    {task.module === "water" ? (
                      <Droplet className="h-5 w-5 text-primary-dark" />
                    ) : task.module === "electricity" ? (
                      <Zap className="h-5 w-5 text-primary-dark" />
                    ) : task.module === "hvac" ? (
                      <Thermometer className="h-5 w-5 text-primary-dark" />
                    ) : task.module === "stp" ? (
                      <Server className="h-5 w-5 text-primary-dark" />
                    ) : task.module === "contractors" ? (
                      <Users className="h-5 w-5 text-primary-dark" />
                    ) : (
                      <Bug className="h-5 w-5 text-primary-dark" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500">{task.dueDate}</p>
                          </div>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center">
                            <User className="h-3.5 w-3.5 text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500">{task.assignee}</p>
                          </div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <button className={`text-sm ${primaryText} ${primaryTextHover} font-medium`}>View all tasks</button>
          </div>
        </div>
      </div>
    </div>
  )

  // Render Water Management Dashboard
  const renderWaterManagement = () => (
    <div className="space-y-6">
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Water Management</h1>
          <p className="text-gray-600">Monitor and optimize water distribution and consumption</p>
        </div>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <select
              className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-dark focus:border-primary-dark sm:text-sm rounded-md shadow-sm appearance-none`}
            >
              <option>Mar 2025</option> <option>Feb 2025</option> <option>Jan 2025</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          {/* Use primary button style */}
          <button className={`px-4 py-2 rounded-md text-sm font-medium flex items-center shadow-sm ${primaryButton}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Key metrics tiles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Supply Tile */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Supply</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">34,915 m³</p>
            </div>
            <div className={`p-2 rounded-lg ${cardIconBg}`}>
              <Droplet className="h-6 w-6 text-primary-dark" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              5.2% vs. last month
            </span>
          </div>
        </div>
        {/* Total Consumption Tile */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Consumption</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">32,264 m³</p>
            </div>
            <div className={`p-2 rounded-lg ${cardIconBg}`}>
              <Activity className="h-6 w-6 text-primary-dark" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              13.7% vs. last month
            </span>
          </div>
        </div>
        {/* System Loss Tile */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">System Loss</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7.6%</p>
            </div>
            <div className={`p-2 rounded-lg ${cardIconBg}`}>
              <AlertTriangle className="h-6 w-6 text-primary-dark" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-green-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              78.7% decrease vs. last month
            </span>
          </div>
        </div>
        {/* Daily Average Tile */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Daily Average</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,075 m³</p>
            </div>
            <div className={`p-2 rounded-lg ${cardIconBg}`}>
              <BarChart2 className="h-6 w-6 text-primary-dark" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-red-600 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              4.3% increase vs. last month
            </span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zone Performance Chart Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Zone Performance</h2>
            <div className="inline-flex items-center space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-primary-dark hover:bg-gray-100 rounded-md">
                <Filter className="h-5 w-5" />
              </button>
              <div className="relative">
                <select
                  className={`block w-full pl-3 pr-10 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-primary-dark focus:border-primary-dark rounded-md shadow-sm appearance-none`}
                >
                  <option>All Zones</option>
                  <option>Residential Zones</option>
                  <option>Commercial Zones</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {/* Updated BarChart colors to match theme */}
            <BarChart data={zoneData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={12} tick={{ fill: "#6b7280" }} />
              <YAxis yAxisId="left" orientation="left" fontSize={12} tick={{ fill: "#6b7280" }} />
              <YAxis yAxisId="right" orientation="right" fontSize={12} tick={{ fill: "#6b7280" }} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                }}
                itemStyle={{ color: "#1f2937" }}
                labelStyle={{ color: "#374151", fontWeight: "bold" }}
                formatter={(value, name) => (name === "Loss (%)" ? `${value}%` : `${value.toLocaleString()} m³`)}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar
                yAxisId="left"
                dataKey="supply"
                name="Supply (m³)"
                fill="#4E4456"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                yAxisId="left"
                dataKey="consumed"
                name="Consumed (m³)"
                fill="#6A5F74"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="lossPercent"
                name="Loss (%)"
                stroke="#867992"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consumption by Type Card */}
        <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg p-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Consumption by Type</h2>
            {/* Use outline button style */}
            <button className={`px-3 py-1 text-sm font-medium rounded-md ${outlineButton}`}>View Details</button>
          </div>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height={250}>
                {/* Updated Pie chart colors */}
                <PieChart>
                  <Pie
                    data={utilityDistributionData.water}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                  >
                    {utilityDistributionData.water.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value.toLocaleString()} m³`} />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 flex items-center pl-0 sm:pl-6 mt-4 sm:mt-0">
              <div className="space-y-3 w-full">
                {utilityDistributionData.water.slice(0, 5).map((type, index) => (
                  <div key={index} className="relative pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="text-xs font-semibold inline-block text-gray-600">{type.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-semibold inline-block ${primaryText}`}>{type.percentage}%</span>
                      </div>
                    </div>
                    {/* Progress bar using primary dark */}
                    <div className={`overflow-hidden h-2 text-xs flex rounded bg-gray-200`}>
                      <div
                        style={{ width: `${type.percentage}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-dark rounded`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone details table */}
      <div className={`${cardBg} ${cardShadow} ${cardBorder} rounded-lg overflow-hidden`}>
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Zone Details</h2>
          <div className="flex items-center space-x-2">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className={`focus:ring-primary-dark focus:border-primary-dark block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1.5`}
                placeholder="Search zones..."
              />
            </div>
            {/* Use primary button style */}
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center shadow-sm ${primaryButton}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Zone
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supply (m³)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Consumed (m³)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loss (m³)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loss (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {zoneData.map((zone, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.supply.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {zone.consumed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{zone.loss.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${zone.lossPercent > 50 ? "bg-red-100 text-red-800" : zone.lossPercent > 20 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {zone.lossPercent}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* Use primary text color for View button */}
                    <button className={`${primaryText} hover:text-primary-dark-accent mr-3`}>View</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between items-center gap-2">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{zoneData.length}</span> of{" "}
            <span className="font-medium">{zoneData.length}</span> zones
          </div>
          <div className="flex space-x-1">
            <button
              className={`px-3 py-1 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50`}
              disabled
            >
              Previous
            </button>
            <button
              className={`px-3 py-1 border border-gray-300 bg-white text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50`}
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  // --- Main Layout ---
  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar Navigation */}
      <div className={`w-64 ${primaryDarkBg} shadow-md flex flex-col`}>
        <div
          className={`h-20 flex flex-col items-center justify-center ${primaryDarkBorder} border-b px-4 text-center`}
        >
          <span className={`text-xl font-bold ${primaryDarkText}`}>Muscat Bay</span>
          <span className={`text-xs ${primaryDarkTextAccent} mt-1`}>Assets and Operation</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {/* Overview Link */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("overview")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
              activeModule === "overview"
                ? `${primaryDarkBgAccent} ${primaryDarkText}`
                : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`
            }`}
          >
            <Home className="mr-3 h-5 w-5" /> Overview
          </a>
          {/* Utilities Menu */}
          <div>
            <button
              onClick={() => toggleMenu("utilities")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText} focus:outline-none`}
            >
              <span className="flex items-center">
                <Zap className="mr-3 h-5 w-5" /> Utilities
              </span>
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-150 ${expandedMenus.includes("utilities") ? "rotate-180" : ""}`}
              />
            </button>
            {expandedMenus.includes("utilities") && (
              <div className={`mt-1 ml-4 pl-5 ${primaryDarkBorder} border-l space-y-1`}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("utilities", "water")
                  }}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    activeModule === "utilities" && activeSubModule === "water"
                      ? `${primaryDarkBgAccent} ${primaryDarkText}`
                      : `text-gray-400 hover:${primaryDarkBgAccent} hover:text-gray-300`
                  }`}
                >
                  Water Management
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigation("utilities", "electricity")
                  }}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    activeModule === "utilities" && activeSubModule === "electricity"
                      ? `${primaryDarkBgAccent} ${primaryDarkText}`
                      : `text-gray-400 hover:${primaryDarkBgAccent} hover:text-gray-300`
                  }`}
                >
                  Electricity Management
                </a>
              </div>
            )}
          </div>
          {/* Other Links */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("hvac")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeModule === "hvac" ? `${primaryDarkBgAccent} ${primaryDarkText}` : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}`}
          >
            <Thermometer className="mr-3 h-5 w-5" /> HVAC
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("stp")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeModule === "stp" ? `${primaryDarkBgAccent} ${primaryDarkText}` : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}`}
          >
            <Server className="mr-3 h-5 w-5" /> STP
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("contractors")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeModule === "contractors" ? `${primaryDarkBgAccent} ${primaryDarkText}` : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}`}
          >
            <Users className="mr-3 h-5 w-5" /> Contractors
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("pest-control")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeModule === "pest-control" ? `${primaryDarkBgAccent} ${primaryDarkText}` : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}`}
          >
            <Bug className="mr-3 h-5 w-5" /> Pest Control
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handleNavigation("reports")
            }}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${activeModule === "reports" ? `${primaryDarkBgAccent} ${primaryDarkText}` : `${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}`}
          >
            <FileText className="mr-3 h-5 w-5" /> Reports
          </a>
        </nav>
        {/* Sidebar Footer */}
        <div className={`px-4 py-4 ${primaryDarkBorder} border-t space-y-1`}>
          <a
            href="#"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}
          >
            <Settings className="mr-3 h-5 w-5" /> Settings
          </a>
          <a
            href="#"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}
          >
            <HelpCircle className="mr-3 h-5 w-5" /> Help
          </a>
          <a
            href="#"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${primaryDarkTextAccent} hover:${primaryDarkBgAccent} hover:${primaryDarkText}`}
          >
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-dark focus:border-primary-dark sm:text-sm`}
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className={`p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark`}
            >
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700 hidden md:block">Admin User</span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeModule === "overview" && renderOverview()}
          {activeModule === "utilities" && activeSubModule === "water" && renderWaterManagement()}
          {/* Placeholder content for other modules */}
          {activeModule === "utilities" && activeSubModule === "electricity" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">Electricity Management</h1>
              <p className="text-gray-600 mt-2">Electricity details and charts will be displayed here.</p>
            </div>
          )}
          {activeModule === "hvac" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">HVAC Management</h1>
              <p className="text-gray-600 mt-2">HVAC details and controls will be displayed here.</p>
            </div>
          )}
          {activeModule === "stp" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">STP Management</h1>
              <p className="text-gray-600 mt-2">Sewage Treatment Plant details will be displayed here.</p>
            </div>
          )}
          {activeModule === "contractors" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">Contractor Management</h1>
              <p className="text-gray-600 mt-2">Contractor list and details will be displayed here.</p>
            </div>
          )}
          {activeModule === "pest-control" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">Pest Control Management</h1>
              <p className="text-gray-600 mt-2">Pest control schedules and reports will be displayed here.</p>
            </div>
          )}
          {activeModule === "reports" && (
            <div className={`${cardBg} ${cardShadow} ${cardBorder} p-6 rounded-lg`}>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-2">Generate and view reports here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default MuscatBayOperations
