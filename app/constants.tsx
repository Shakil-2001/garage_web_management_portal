import { Icon } from "@iconify/react";

import { SidebarItem } from "./types"; 

export const SIDEBAR_ITEMS: SidebarItem[] = [
    { 
        title: "Dashboard",
        path: "/dashboard",
        admin: false,
        icon: <Icon icon="lucide:home" width="24" height="24"/>,
    },
    { 
        title: "Jobs",
        path: "/dashboard/job",
        admin: false,
        icon: <Icon icon="lucide:sticky-note" width="24" height="24"/>,
    }, 
    { 
        title: "Customers",
        path: "/dashboard/customer",
        admin: false,
        icon: <Icon icon="lucide:users" width="24" height="24"/>
    }, 
    { 
        title: "Vehicles",
        path: "/dashboard/vehicle",
        admin: false,
        icon: <Icon icon="lucide:car" width="24" height="24"/>
    }, 
    { 
        title: "Inventory",
        path: "/dashboard/inventory",
        admin: false,
        icon: <Icon icon="lucide:warehouse" width="24" height="24"/>
    }, 
    { 
        title: "Invoice",
        path: "/dashboard/invoice",
        admin: false,
        icon: <Icon icon="lucide:file-spreadsheet" width="24" height="24"/>
    }, 
    { 
        title: "Taskboard",
        path: "/dashboard/taskboard",
        admin: false,
        icon: <Icon icon="lucide:clipboard-list" width="24" height="24"/>
    }, 
    { 
        title: "Employees",
        path: "/dashboard/employee",
        admin: true,
        icon: <Icon icon="lucide:user-cog" width="24" height="24"/>
    }, 

]

export const CAR_MAKES: string[] = [
    "All",
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "BMW",
    "Bentley",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Daihatsu",
    "Datsun",
    "DeLorean",
    "Dodge",
    "Eagle",
    "Ferrari",
    "Fiat Chrysler Automobiles (FCA)",
    "Ford",
    "Geo",
    "General Motors (GM)",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Jaguar",
    "Jeep",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mercury",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Oldsmobile",
    "Peugeot",
    "Plymouth",
    "Pontiac",
    "Porsche",
    "Ram",
    "Renault",
    "Rolls-Royce",
    "Saab",
    "Saturn",
    "Scion",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "Yugo"
]

export const PART_CATEGORY = [
    {"Service Part": 
        ["Air Filters",
        "Anti Freeze",
        "Brake Discs",
        "Brake Pads",
        "Fuel Filters",
        "Oil Filters",
        "Pollen Filters",
        "Spark Plugs",
        "Timing Belts", 
        "Tension Idlers"] 
    },
    {"Brakes": 
        ["Accessories",
        "Brake Disc Dust Shield",
        "Brake Discs",
        "Brake Drums",
        "Brake Pads",
        "Brake Shoes",
        "Handbrake Cables",
        "ABS Sensor",
        "Brake Fluid",
        ] 
    },
    {"Engine Part":
    ["Head Bolts",
    "Oil Pump",
    "Drive Belts",
    "Air Filter",
    "Fuel Filter",
    "Oil Filter",
    "Ignition Coil"]    
    },
    {"Suspension & Steering": ["Anti-Roll Bar", 
    "Bushes",
    "Coil Sprung",
    "Engine Mount",
    "Rear Axle",
    "Shock Absorbers"]
    },
    {"Transmission": [
        "Clutch Hydraulics",
        "Clutch Kits",
        "Spigot Bearing",
        "Driveshafts"
    ]},
    {"Cooling & Heating": [
        "Expansion Tanks",
        "Radiators",
        "Thermostats",
        "Water Pumps",
        "Compressors",
        "Heater Motors"
    ]},
    {"Electrical": [
        "Car Battery",
        "Motorcycle Battery",
        "Tyre Pressure Sensors",
        "Headlights",
        "Indicators",
        "Rear Lights"
    ]},
    {"Body": [
        "Body Moulding",
        "Body Panel",
        "Grilles",
        "Wing Mirrors",
        "Exhaust Parts"
    ]},
    {"Lubricants": [
        "Anti Freeze",
    ]}
]

