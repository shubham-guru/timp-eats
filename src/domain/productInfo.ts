import bajraImg from "../assets/product images/bajraImg.jpg";
import crunchyStick from "../assets/product images/crunchyStick.jpg";
import chocoChip from "../assets/product images/chocoChipImg.jpg";

export const productInfo = [
    {
        id: 1,
        name: "Bajra Laddu",
        ingredients: "Pearl Millet Flour, Green Gram Dal, Sesame Seeds, Jaggery, Desi Ghee",
        healthBenefits: ["Rich in fiber for digestive health", 
        "High in essential minerals like iron and magnesium", 
        "Low glycemic index, promoting balanced blood sugar levels",
        "High in fiber, aiding in digestion and weight management",
        "Abundant in heart-healthy fats",
        "Good source of calcium, supporting bone health", 
        "Healthy saturated fats for energy and brain function",
        "Supports a healthy immune system and skin"],
        usage: ["Grab a bite before heading to work or college! Convenient and easy to eat, perfect for avoiding the morning rush."],
        price: 209,
        isHandMade: true,
        image: bajraImg
    },
    {
        id: 2,
        name: "Bajra Neem Crunchy Sticks",
        ingredients: "Pearl Millet Flour, Refined Flour, Fresh Curry Leaves, Extra Virgin Groundnut Oil, Condiment & Spices",
        healthBenefits: ["Packed with essential nutrients like iron and magnesium", 
        "Gluten-free alternative for those with sensitivities", 
        "Supports digestion and reduces nausea",
        "Rich in antioxidants for overall health",
        "Abundant in heart-healthy fats",
        "High in heart-healthy monounsaturated fats", 
        "Contains vitamin E, an antioxidant"],
        usage: ["Enjoy these with your morning tea or as a satisfying evening snack to curb those cravings."],
        price: 189,
        isHandMade: false,
        image: crunchyStick
    },
    {
        id: 3,
        name: "Choco Chip Bajra Cookies",
        ingredients: "Pearl Millet Flour, Sugar Powder(Boora), Butter, Cocoa Powder, Rising Agent",
        healthBenefits: ["Rich in fiber for digestive health", 
        "Gluten-free alternative for those with sensitivities", 
        "Supports digestion and reduces nausea",
        "Rich in antioxidants for overall health",
        "High in fiber, aiding in digestion and weight management"],
        usage: ["Incorporate them into your child's nutrition for added health benefits, fostering a connection with your little ones."],
        price: 219,
        isHandMade: false,
        image: chocoChip
    }
]