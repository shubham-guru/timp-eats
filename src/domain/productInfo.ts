import bajraImg from "../assets/product images/bajraImg.jpg";
import crunchyStick from "../assets/product images/crunchyStick.jpg";
import chocoChip from "../assets/product images/chocoChipImg.jpg";
import nanKhatai from "../assets/product images/jowarNanKhatai.jpg"
import bajraChocolate from "../assets/product images/bajraChocolate.jpg"
import ragiBhel from "../assets/product images/ragiBhel.jpg"
import bajraPuffs from "../assets/product images/bajraPuffs.jpg"
import multiMilletBhel from "../assets/product images/multiMilletBhel.jpg"
import kharkhra from "../assets/product images/khakhra.jpg"
import beetRootkharkhra from "../assets/product images/beetrootKhakhra.jpg"

export const productInfo = [
    {
        id: 1,
        name: "Bajra Laddu",
        ingredients: "Pearl Millet Flour, Green Gram Dal, Sesame Seeds, Jaggery, Desi Ghee.",
        healthBenefits: ["Rich in fiber for digestive health.", 
        "High in essential minerals like iron and magnesium.", 
        "Low glycemic index, promoting balanced blood sugar levels.",
        "High in fiber, aiding in digestion and weight management.",
        "Abundant in heart-healthy fats.",
        "Good source of calcium, supporting bone health.", 
        "Healthy saturated fats for energy and brain function.",
        "Supports a healthy immune system and skin"],
        usage: ["Grab a bite before heading to work or college! Convenient and easy to eat, perfect for avoiding the morning rush."],
        price: 279,
        isHandMade: true,
        img: bajraImg
    },
    {
        id: 2,
        name: "Bajra Neem Crunchy Sticks",
        ingredients: "Pearl Millet Flour, Refined Flour, Fresh Curry Leaves, Extra Virgin Groundnut Oil, Condiment & Spices.",
        healthBenefits: ["Packed with essential nutrients like iron and magnesium.", 
        "Gluten-free alternative for those with sensitivities.", 
        "Supports digestion and reduces nausea.",
        "Rich in antioxidants for overall health.",
        "Abundant in heart-healthy fats.",
        "High in heart-healthy monounsaturated fats.", 
        "Contains vitamin E, an antioxidant"],
        usage: ["Enjoy these with your morning tea or as a satisfying evening snack to curb those cravings."],
        price: 249,
        isHandMade: false,
        img: crunchyStick
    },
    {
        id: 3,
        name: "Choco Chip Bajra Cookies",
        ingredients: "Pearl Millet Flour, Sugar Powder(Boora), Butter, Cocoa Powder, Rising Agent.",
        healthBenefits: ["Rich in fiber for digestive health.", 
        "Gluten-free alternative for those with sensitivities.", 
        "Supports digestion and reduces nausea.",
        "Rich in antioxidants for overall health.",
        "High in fiber, aiding in digestion and weight management"],
        usage: ["Incorporate them into your child's nutrition for added health benefits, fostering a connection with your little ones."],
        price: 249,
        isHandMade: false,
        img: chocoChip
    },
    {
        id: 4,
        name: "Jowar Nan Khatai",
        ingredients: "Jowar Flour, Besan, Desi Ghee, Boora (sugar powder).",
        healthBenefits: ["Rich in fiber for digestive health.", 
        "Gluten-free alternative for those with sensitivities.", 
        "Jowar is rich in essential minerals.",
        "Jowar contains antioxidants like tannins and phenolic acids, which help neutralize harmful free radicals in the body.",
        "The complex carbohydrates in jowar are digested slowly, leading to gradual increases in blood sugar levels"],
        usage: ["Share the sweetness of this products with your loved ones to strengthen your bond and create delightful memories together."],
        price: 259,
        isHandMade: false,
        img: nanKhatai
    },
    {
        id: 5,
        name: "Bajra Chocolates",
        ingredients: "Bajra Puffs, Chocolate.",
        healthBenefits: ["Bajra is rich in iron, which helps prevent iron deficiency anemia in children.", 
        "Bajra chocolate contains carbohydrates that provide a sustained release of energy, keeping children active and energized.", 
        "Bajra is naturally gluten-free, making Bajra chocolate suitable for children with gluten sensitivities.",
        "The nutrients in Bajra chocolate, such as magnesium and vitamins, support brain health and cognitive function, enhancing children's focus, concentration, and memory..",],
        usage: ["Delight your kids and your loved one with these special chocolates to make them feel cherished and loved"],
        price: 299,
        isHandMade: false,
        img: bajraChocolate
    },
    {
        id: 6,
        name: "Roasted Bajra Puffs - Peri-Peri",
        ingredients: "Pearl Millet (88%), Rock Salt, Red Chilli, Sunflower Oil,Garlic, Spirulina, Citric Acid, Species & Condiments.",
        healthBenefits: ["Roasted bajra puffs are a nutrient-dense snack, providing essential vitamins, minerals, and antioxidants necessary for overall health.", 
        "Being light and airy, roasted bajra puffs are low in calories, making them a guilt-free snack option for weight-conscious individuals.", 
        "The light and crispy texture of roasted bajra puffs provides a satisfying crunch, making them enjoyable to eat.",
        "Bajra puffs are a kid-friendly snack option that can help introduce children to healthier snack alternatives while satisfying their taste buds..",],
        usage: ["Enjoy a guilt-free, gut-friendly snack that perfectly fills the gap between meals, suitable for any time of day."],
        price: 219,
        isHandMade: false,
        img: bajraPuffs
    },
    {
        id: 6,
        name: "Ragi Bhel",
        ingredients: "Roasted Finger Millet, Curry Leafs, Green Chilli, Salt, Peanut, Namkeen, Species & Condiments.",
        healthBenefits: ["Ragi is a good source of calcium, which is essential for maintaining healthy bones and teeth.", 
        "Ragi has a low glycemic index, which means it causes a gradual rise in blood sugar levels compared to high-glycemic foods.", 
        "Ragi is an excellent source of iron, which is necessary for the production of hemoglobin and red blood cells.",
        "Ragi contains essential nutrients such as vitamins, minerals, and antioxidants, including vitamin C, vitamin E, and magnesium.",],
        usage: ["Enjoy a guilt-free, gut-friendly snack that perfectly fills the gap between meals, suitable for any time of day."],
        price: 279,
        isHandMade: false,
        img: ragiBhel
    },
    {
        id: 7,
        name: "Multi Millet Bhel",
        ingredients: "Bajra Puff, Jowar Puff, Ragi Flakes, Corn Flakes, Peanut, Moth Dal Sev, Curry Leaves and Species & Condiments.",
        healthBenefits: ["High in magnesium, supports heart health.", 
        "Provides sustained energy due to its complex carbohydrates.", 
        "High in protein, promotes muscle growth and repair.",
        "Contains resveratrol, may have anti-aging effects.",
        "Contains compounds with anti-inflammatory properties, supports joint health."],
        usage: ["Enjoy a guilt-free, gut-friendly snack that perfectly fills the gap between meals, suitable for any time of day."],
        price: 319,
        isHandMade: false,
        img: multiMilletBhel
    },
    {
        id: 7,
        name: "Jowar, Bajra and Palak Khakhra",
        ingredients: "Jowar 40%, Bajra 40%, Palak 15%, Wheat Flour 5%, Salt and Oil.",
        healthBenefits: ["Contains antioxidants that help reduce inflammation and lower the risk of chronic diseases.", 
        "Low glycemic index, helping regulate blood sugar levels.", 
        "Abundant in vitamins A and C, promoting healthy vision and immune function.",
        "Contains folate, essential for cell division and DNA synthesis.",
        "Lowers cholesterol levels, reducing the risk of heart disease."],
        usage: ["Enjoy these with your morning tea or as a satisfying evening snack to curb those cravings."],
        price: 249,
        isHandMade: false,
        img: kharkhra
    },
    {
        id: 8,
        name: "Ragi Beetroot Khakhra",
        ingredients: "Ragi Flour, Beetroot Paste, Wheat Flour 5%, Salt and Oil.",
        healthBenefits: ["Contains antioxidants that help reduce inflammation and lower the risk of chronic diseases.", 
        "Low glycemic index, helping regulate blood sugar levels.", 
        "Abundant in vitamins A and C, promoting healthy vision and immune function.",
        "Contains folate, essential for cell division and DNA synthesis.",
        "Lowers cholesterol levels, reducing the risk of heart disease.",
        "The nitrates in beetroot can help lower blood pressure, improve blood flow, and reduce the risk of heart disease and stroke"],
        usage: ["Enjoy these with your morning tea or as a satisfying evening snack to curb those cravings."],
        price: 249,
        isHandMade: false,
        img: beetRootkharkhra
    }
]