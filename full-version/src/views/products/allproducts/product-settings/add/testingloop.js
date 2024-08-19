// // // console.log('hello')

// // // const formData = [
// // //   {
// // //     type: 'size',
// // //     value: ['s', 'm']
// // //   },
// // //   {
// // //     type: 'color',
// // //     value: ['red', 'green']
// // //   },
// // //   {
// // //     type: 'material',
// // //     value: ['fabric', 'cotton']
// // //   }
// // // ]

// // // // console.log(formData)

// // // const loop = formData.map(first => {
// // //   const checkfirst = first.value[0] + ' heloo'
// // //   //     .map((second) => {
// // //   //     const checksecond = second.length()
// // //   //     console.log(checksecond)
// // //   // })
// // //   // console.log(checkfirst)
// // // })

// // // // console.log(loop)

// // // const identity = formData[0].value.map(first => {
// // //   const firstidentity = first.toUpperCase()

// // //   const secondloopidentity = formData[1].value.map(second => {
// // //     const secondidentity = second.toUpperCase()
// // //     // console.log(secondidentity)
// // //     // return secondidentity

// // //     const thirdloopidentity = formData[2].value.map(third => {
// // //       const thirdidentity = `${secondidentity}/${third.toUpperCase()} `
// // //       // console.log(thirdidentity)
// // //       return thirdidentity
// // //       // console.log(thirdloopidentity)
// // //     })
// // //       console.log(`${firstidentity}: ${thirdloopidentity}`)
// // //       return secondidentity
// // //   })
// // //     // console.log(secondloopidentity)
// // //   // console.log(secondloopidentity)
// // //     // console.log(firstidentity)
// // //     return firstidentity

// // // })
// // // // console.log(identity)
// // // // console.log(identity)

// // // // const secondloopidentity = identity.map((second) => {
// // // //     const secondidentity = second.toUpperCase()
// // // //     console.log(secondidentity)
// // // // })
// // // // console.log(identity)

// // const formData = [
// //     {
// //       type: 'size',
// //       value: ['s', 'm']
// //     },
// //     {
// //       type: 'color',
// //       value: ['red', 'green']
// //     },
// //     {
// //       type: 'material',
// //       value: ['fabric', 'cotton']
// //     }
// //   ];

// //   const generateCombinations = (data, currentIndex = 0, currentCombination = [], result = []) => {
// //     if (currentIndex === data.length) {
// //       result.push(currentCombination.join(' / '));
// //       return result;
// //     }

// //     for (const value of data[currentIndex].value) {
// //       generateCombinations(data, currentIndex + 1, [...currentCombination, value], result);
// //     }

// //     return result;
// //   };

// //   const combinations = generateCombinations(formData);
// //   console.log(combinations);

// const cleanData = (data) => {
//     return data.map(item => ({
//       ...item,
//       values: item.values.filter(value => value !== '')
//     }));
//   };

// const generateCombinations = (data, currentIndex = 0, currentCombination = [], result = []) => {
//     if (currentIndex === data.length) {
//       result.push(currentCombination.join(' / '));
//       return result;
//     }

//     for (const value of data[currentIndex].value) {
//       generateCombinations(data, currentIndex + 1, [...currentCombination, value.toUpperCase()], result);
//     }

//     return result;
// };

// const createDataStructure = (data) => {
//     const topLevelVariants = data[0].values.map(variant => ({
//       variant: variant,
//       combinations: []
//     }));

//     const combinations = generateCombinations(data.slice(1));

//     topLevelVariants.forEach(variantObj => {
//       variantObj.combinations = combinations.map(combination => ({
//         combination: combination,
//         price: 0.00,
//         quantity: 0
//       }));
//     });

//     return {
//       type: data[0].type,
//       values: topLevelVariants
//     };
//   };

//   // Example input data
//   const formData = [
//     {
//       type: "Size",
//       values: ["m", "l", "xl", ""]
//     },
//     {
//       type: "Color",
//       values: ["green", "red", "yellow", "blue", ""]
//     },
//     {
//       type: "Weight",
//       values: ["fabrics", "cotton", ""]
//     }
//   ];

//   // Clean the data
//   const cleanedData = cleanData(formData);

//   // Create the structured data
//   const structuredData = createDataStructure(cleanedData);

//   console.log(JSON.stringify(structuredData, null, 2));

// //     {
// //       type: 'size',
// //       value: ['s', 'm']
// //     },
// //     {
// //       type: 'color',
// //       value: ['red', 'green']
// //     },
// //     {
// //       type: 'material',
// //       value: ['fabric', 'cotton']
// //     }
// //   ];

// //   const structuredData = createDataStructure(formData);

// //   console.log(JSON.stringify(structuredData, null, 2));
// // const comb = generateCombinations(formData)

// // console.log(comb)
// // console.log(combinations)

// // const check = formData.slice(1)
// // const checkfirst = formData
// // console.log("check", check)
// // console.log(checkfirst)

const cleanData = data => {
  return data.map(item => ({
    ...item,
    values: item.values.filter(value => value !== '')
  }))
}

const generateCombinations = (data, currentIndex = 0, currentCombination = [], result = []) => {
  if (currentIndex === data.length) {
    result.push(currentCombination.join(' / '))
    return result
  }

  for (const value of data[currentIndex].values) {
    generateCombinations(data, currentIndex + 1, [...currentCombination, value.toUpperCase()], result)
  }

  return result
}

const createDataStructure = data => {
  const topLevelVariants = data[0].values.map(variant => ({
    variant: variant,
    combinations: []
  }))

  const combinations = generateCombinations(data.slice(1))

  topLevelVariants.forEach(variantObj => {
    variantObj.combinations = combinations.map(combination => ({
      combination: combination,
      price: 0.0,
      quantity: 0
    }))
  })

  return {
    type: data[0].type,
    values: topLevelVariants
  }
}

// Example input data
const formData = [
  {
    type: 'Size',
    values: ['m', 'l', 'xl']
  },
  {
    type: 'Color',
    values: ['green', 'red', 'yellow', 'blue']
  },
  {
    type: 'Weight',
    values: ['fabrics', 'cotton']
  }
]

// Clean the data
const cleanedData = cleanData(formData)

// Create the structured data
const structuredData = createDataStructure(cleanedData)

// console.log(JSON.stringify(structuredData, null, 2));

const arraycheck = ['1', 2]
// console.log(typeof arraycheck)

const dataaccess = {
  type: 'Size',
  values: [
    {
      variant: 'm',
      combinations: [
        {
          combination: 'GREEN / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'GREEN / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / COTTON',
          price: 0,
          quantity: 0
        }
      ]
    },
    {
      variant: 'l',
      combinations: [
        {
          combination: 'GREEN / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'GREEN / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / COTTON',
          price: 0,
          quantity: 0
        }
      ]
    },
    {
      variant: 'xl',
      combinations: [
        {
          combination: 'GREEN / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'GREEN / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'RED / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'YELLOW / COTTON',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / FABRICS',
          price: 0,
          quantity: 0
        },
        {
          combination: 'BLUE / COTTON',
          price: 0,
          quantity: 0
        }
      ]
    }
  ]
}

const checkdataaccess = dataaccess.values.map(index => {
  // console.log(index.variant)
  const com = index.combinations.map(comaccess => {
    // console.log(comaccess.combination)
  })
})

const object = {
  products: [
    {
      brand_name: '',
      default_category: '',
      category_name: '',
      category_description: '',
      category_slug: '',
      category_sort: '',
      product_count: '',
      category_image_src: '',
      category_image_alt: '',
      product_title: '',
      product_description: '',
      product_slug: '',
      product_type: '',
      tag_name: [],
      slug: '',
      metafields: {},
      option1_name: 'Color',
      option1_value: 'Blue',
      option2_name: 'Size',
      option2_value: 'S',
      variant_sku: '8912939499494',
      variant_inventory_qty: 100,
      variant_compare_at_price: 899,
      variant_price: 599,
      variant_weight: 500,
      variant_length: 40,
      variant_width: 30,
      variant_height: 10,
      variant_tax: 0
    },
    {
      brand_name: 'Livein',
      default_category: 'Jeans',
      category_name: 'Shop, Men, Jeans',
      category_description: 'Jeans',
      category_slug: 'jeans',
      category_sort: 'Jeans',
      product_count: '0',
      category_image_src: 'null',
      category_image_alt: 'Jeans',
      product_title: 'Men Blue Denim Jeans - ABCD-12',
      product_description:
        'Stay in the zone while you train in this crop designed with printed panel details to keep you cool. Girls love standing in these tight fitting, printed panel to handle every kind of activity they set their mind to',
      product_slug: 'men-blue-denim-jeans---abcd-12',
      product_type: 'Jeans',
      tag_name: 'Jeans,Blue Jeans,Denim Jeans',
      slug: 'jeans',
      metafields: {
        'Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
        Fabric: 'Crepe',
        Pattern: 'Solid',
        Color: 'Crimson Red',
        Fit: 'Loose Fit',
        Collar: 'Button Down Collar',
        'Item Code': 'ABCD-12',
        Gender: 'Female'
      },
      option1_name: 'Color',
      option1_value: 'Blue',
      option2_name: 'Size',
      option2_value: 'M',
      variant_sku: '8912939499495',
      variant_inventory_qty: 100,
      variant_compare_at_price: 899,
      variant_price: 599,
      variant_weight: 500,
      variant_length: 40,
      variant_width: 30,
      variant_height: 10,
      variant_tax: 0
    }
  ],
  images: [
    {
      image_src: '',
      image_position: 1
    },
    {
      image_src: '',
      image_position: 2
    }
  ],
  videos: [
    {
      video_src: ''
    }
  ]
}

let object1 = {
  option1_name: 'size',
  option1_value: 'xl',
  option2_name: 'color',
  option2_value: 'red',
  option3_name: 'material',
  option3_value: 'Cotton'
}

let contextData = [
  {
    type: 'Size',
    values: ['x', 'l']
  },
  {
    type: 'Color',
    values: ['yellow', 'red', 'green']
  },
  {
    type: 'Weight',
    values: ['cotton']
  }
]
let structuredData123 = {
  dataat: function name(params) {
    return {
      variant: { key: val },
      combination: [
        'x/yellow/cotton',
        'x/red/cotton',
        'x/green/cotton',
        'l/yellow/cotton',
        'l/red/cotton',
        'l/green/cotton'
      ]
    }
  }
}

function combineOptions(index, current) {
  if (index === options.length) {
    variants.push({
      ...current,
      variant_sku: '',
      variant_compare_at_price: 0,
      variant_inventory_qty: 0,
      variant_price: 0,
      variant_weight: 0,
      variant_length: 0,
      variant_width: 0,
      variant_height: 0,
      variant_tax: 0,
      country_of_origin: 'IN'
    })
    return
  }

  const generateVariants = data => {
    const variants = []
    const { option_name, option_values } = options[index]
    option_values.forEach((value, idx) => {
      if (option_values.length - 1 !== idx) {
        combineOptions(index + 1, {
          ...current,
          [`option${index + 1}_name`]: option_name,
          [`option${index + 1}_value`]: value.option_value
        })
      }
    })
  }

  combineOptions(0, {})
  return variants
}

// const generateVariants = (options) => {
//   const variants = [];

//   const combineOptions = (index, current) => {
//     if (index === options.length) {
//       variants.push(current);
//       return;
//     }

//     const { option_name, option_values } = options[index];

//     option_values.forEach((value) => {
//       combineOptions(index + 1, {
//         ...current,
//         [`option${index + 1}_name`]: option_name,
//         [`option${index + 1}_value`]: value.option_value,
//       });
//     });
//   }

//   combineOptions(0, {});
//   return variants;
// };

// const formData1 = {
//   formatData: [
//     {
//       brand_name: 'Livein-5',
//       default_category: '',
//       categories: [],
//       product_title: 'kkj',
//       product_description: '<p>kj,.</p>',
//       product_type: '',
//       tags: [],
//       type_standard: 'Animals & Pet Supplies',
//       published: 'TRUE',
//       metafields: {
//         hello: 'world',
//         hwllodx: 'wokrldc'
//       },
//       variant_width: 2,
//       variant_length: 2,
//       variant_height: 2,
//       variant_compare_at_price: 2,
//       variant_inventory_qty: 2,
//       variant_weight: 2,
//       variant_sku: '2',
//       variant_price: 2,
//       option1_name: 'Size',
//       option1_value: 'kjl,',
//       values: 'kjl,',
//       variant_tax: '',
//       country_of_origin: 'IN'
//     },
//     {
//       brand_name: 'Livein-5',
//       default_category: '',
//       categories: [],
//       product_title: 'kkj',
//       product_description: '<p>kj,.</p>',
//       product_type: '',
//       tags: [],
//       type_standard: 'Animals & Pet Supplies',
//       published: 'TRUE',
//       metafields: {
//         hello: 'world',
//         hwllodx: 'wokrldc'
//       },
//       variant_width: 1,
//       variant_length: 1,
//       variant_height: 1,
//       variant_compare_at_price: 1,
//       variant_inventory_qty: 1,
//       variant_weight: 1,
//       variant_sku: '1',
//       variant_price: 1,
//       option1_name: 'Size',
//       option1_value: 'jhk',
//       values: 'jhk',
//       variant_tax: '',
//       country_of_origin: 'IN'
//     }
//   ]
// }

const singleProductData = {
  success: true,
  Finalproduct: {
    products: [
      {
        brand_name: 'Livein',
        default_category: 'Jeans',
        categories: ['Shop', 'Men', 'Jeans', 'G12'],
        product_title: 'Men Blue Denim Jeans - ABCD-12',
        product_description: 'basu',
        product_type: 'Jeans',
        is_deleted: false,
        tags: ['Jeans', 'Blue Jeans', 'Jean'],
        published: 'TRUE',
        type_standard: '132 - Apparel & Accessories > Clothing > Jean',
        metafields: {
          ' Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
          ' Fabric': 'Crepe',
          ' Pattern': 'Solid',
          ' Color': 'Crimson Red',
          ' Fit': 'Loose Fit',
          ' Collar': 'Button Down Collar',
          ' Item Code': 'ABCD-12',
          ' Gender': 'Female'
        },
        option1_name: 'Color',
        option1_value: 'Red',
        option2_name: 'Size',
        option2_value: 'S',
        variant_sku: '8912939499494',
        variant_inventory_qty: 100,
        variant_compare_at_price: 11,
        variant_price: 599,
        variant_weight: 500,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0
      },
      {
        brand_name: 'Livein',
        default_category: 'Jeans',
        categories: ['Shop', 'Men', 'Jeans', 'G12'],
        product_title: 'Men Blue Denim Jeans - ABCD-12',
        product_description: 'basu',
        product_type: 'Jeans',
        is_deleted: false,
        tags: ['Jeans', 'Blue Jeans', 'Jean'],
        published: 'TRUE',
        type_standard: '132 - Apparel & Accessories > Clothing > Jean',
        metafields: {
          ' Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
          ' Fabric': 'Crepe',
          ' Pattern': 'Solid',
          ' Color': 'Crimson Red',
          ' Fit': 'Loose Fit',
          ' Collar': 'Button Down Collar',
          ' Item Code': 'ABCD-12',
          ' Gender': 'Female'
        },
        option1_name: 'Color',
        option1_value: 'Red',
        option2_name: 'Size',
        option2_value: 'M',
        variant_sku: '8912939499495',
        variant_inventory_qty: 100,
        variant_compare_at_price: 11,
        variant_price: 599,
        variant_weight: 500,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0
      },
      {
        brand_name: 'Livein',
        default_category: 'Jeans',
        categories: ['Shop', 'Men', 'Jeans', 'G12'],
        product_title: 'Men Blue Denim Jeans - ABCD-12',
        product_description: 'basu',
        product_type: 'Jeans',
        is_deleted: false,
        tags: ['Jeans', 'Blue Jeans', 'Jean'],
        published: 'TRUE',
        type_standard: '132 - Apparel & Accessories > Clothing > Jean',
        metafields: {
          ' Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
          ' Fabric': 'Crepe',
          ' Pattern': 'Solid',
          ' Color': 'Crimson Red',
          ' Fit': 'Loose Fit',
          ' Collar': 'Button Down Collar',
          ' Item Code': 'ABCD-12',
          ' Gender': 'Female'
        },
        option1_name: 'Color',
        option1_value: 'Red',
        option2_name: 'Size',
        option2_value: 'L',
        variant_sku: '8912939499496',
        variant_inventory_qty: 100,
        variant_compare_at_price: 11,
        variant_price: 599,
        variant_weight: 500,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0
      },
      {
        brand_name: 'Livein',
        default_category: 'Jeans',
        categories: ['Shop', 'Men', 'Jeans', 'G12'],
        product_title: 'Men Blue Denim Jeans - ABCD-12',
        product_description: 'basu',
        product_type: 'Jeans',
        is_deleted: false,
        tags: ['Jeans', 'Blue Jeans', 'Jean'],
        published: 'TRUE',
        type_standard: '132 - Apparel & Accessories > Clothing > Jean',
        metafields: {
          ' Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
          ' Fabric': 'Crepe',
          ' Pattern': 'Solid',
          ' Color': 'Crimson Red',
          ' Fit': 'Loose Fit',
          ' Collar': 'Button Down Collar',
          ' Item Code': 'ABCD-12',
          ' Gender': 'Female'
        },
        option1_name: 'Color',
        option1_value: 'Red',
        option2_name: 'Size',
        option2_value: '3XL',
        variant_sku: '8912939499497',
        variant_inventory_qty: 100,
        variant_compare_at_price: 11,
        variant_price: 599,
        variant_weight: 500,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0
      },
      {
        brand_name: 'Livein',
        default_category: 'Jeans',
        categories: ['Shop', 'Men', 'Jeans', 'G12'],
        product_title: 'Men Blue Denim Jeans - ABCD-12',
        product_description: 'basu',
        product_type: 'Jeans',
        is_deleted: false,
        tags: ['Jeans', 'Blue Jeans', 'Jean'],
        published: 'TRUE',
        type_standard: '132 - Apparel & Accessories > Clothing > Jean',
        metafields: {
          ' Size Chart': 'gid://shopify/OnlineStorePage/117528953122',
          ' Fabric': 'Crepe',
          ' Pattern': 'Solid',
          ' Color': 'Crimson Red',
          ' Fit': 'Loose Fit',
          ' Collar': 'Button Down Collar',
          ' Item Code': 'ABCD-12',
          ' Gender': 'Female'
        },
        option1_name: 'Color',
        option1_value: 'Red',
        option2_name: 'Size',
        option2_value: '2XL',
        variant_sku: '8912939499498',
        variant_inventory_qty: 100,
        variant_compare_at_price: 11,
        variant_price: 599,
        variant_weight: 500,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0
      }
    ],
    images: [
      {
        image_src: '1722948001457-image_1.jpg',
        image_position: 1
      },
      {
        image_src: '1722948015829-image_2.jpg',
        image_position: 2
      },
      {
        image_src: '1722948023944-image_3.jpg',
        image_position: 3
      },
      {
        image_src: '1722948029828-image_4.jpg',
        image_position: 4
      },
      {
        image_src: '1722948033820-image_5.jpg',
        image_position: 5
      }
    ],
    videos: [
      {
        video_src: 'video.mp4'
      }
    ]
  }
}
// console.log(singleProductData.Finalproduct.products[0].brand_name)

const singleParentData = singleProductData.Finalproduct.products.map(sep => {
  const {
    brand_name,
    default_category,
    categories,
    product_description,
    product_title,
    product_type,
    is_deleted,
    tags,
    published,
    type_standard,
    metafields,
    ...rest
  } = sep
  return { ...rest }
  console.log(
    '===============================================',
    rest,
    '==============================================='
  )

  // console.log('===============================================', sep, '===============================================')
})

console.log(singleParentData)

// const {
//   brand_name,
//   default_category,
//   categories,
//   product_description,
//   product_title,
//   product_type,
//   is_deleted,
//   tags,
//   published,
//   type_standard,
//   metafields,
//   ...rest
// } = singleParentData
// console.log(brand_name, default_category,categories,product_description, rest)



'use client'
import React from 'react'
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { useProduct } from '../../productContext/ProductStateManagement'

const columns = [
  { id: 'id', label: 'Sr.No', minWidth: 20 },
  { id: 'key', label: 'Name', minWidth: 80 },
  {
    id: 'value',
    label: 'Value',
    minWidth: 80,
    align: 'right'
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 80,
    align: 'right'
  }
]

const createData = (key, value, index) => ({
  id: index + 1,
  key: key,
  value: value,
  action: 'Delete'
})

export default function MetaTablePreview() {
  const { productData, deleteProductMeta } = useProduct()

  const data = productData.meta

  const handleDelete = index => {
    deleteProductMeta(index)
  }

  if (data !== undefined || null) {
    const dataLength = Object.keys(data).length
    if (dataLength <= 0) {
      return (
        <div className='w-full'>
          <Typography className='font-semibold' variant='h5' align='center'>
            There is no metafield available
          </Typography>
        </div>
      )
    }
  }

  if (data === undefined || null) {
    return <Typography>Given Data is not valid</Typography>
  }

  const rows = Object.keys(data).map((key, index) => createData(key, data[key], index))

  return (
    <Card className='w-full h-full'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <Button
                              variant='contained'
                              color='error'
                              size='small'
                              onClick={() => handleDelete(row.key)}
                            >
                              {value}
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Card>
  )
} "
"'use client'
import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Grid } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useProduct } from '../../productContext/ProductStateManagement'
import MetaTablePreview from './MetaTablePreview'

export default function Metafield() {
  const [addOption, setAddOption] = useState({ key: '', value: '' })
  const [validationMessage, setValidationMessage] = useState({ key: '', value: '' })

  const { addProductMeta } = useProduct()
  const handleChange = e => {
    const { name, value } = e.target
    setAddOption({ ...addOption, [name]: value })
    if (value.trim() !== '') {
      setValidationMessage({ ...validationMessage, [name]: '' })
    }
  }
  const handleSave = () => {
    let isValid = true

    if (addOption.key.trim() === '') {
      setValidationMessage(prev => ({ ...prev, key: 'Meta key is required.' }))
      isValid = false
    }

    if (addOption.value.trim() === '') {
      setValidationMessage(prev => ({ ...prev, value: 'Meta value is required.' }))
      isValid = false
    }

    if (!isValid) {
      console.warn('Cannot save empty fields')
      return
    }

    if (addOption.key.trim() === '' || addOption.value.trim() === '') {
      console.warn('Cannot save empty strings')
      return
    }

    const newMeta = { [addOption.key]: addOption.value }
    addProductMeta({ ...newMeta })
    setAddOption({ key: '', value: '' })
  }
  const isButtonDisabled = addOption.key.trim() === '' || addOption.value.trim() === ''

  return (
    <Card className='ml-5'>
      <Grid>
        <CardHeader title='Metafield' />
      </Grid>
      <Grid>
        <Grid container className='flex flex-row h-full items-end pl-5' gap={5}>
          <Grid>
            <CustomTextField
              placeholder='Metafield key'
              value={addOption.key}
              name='key'
              onChange={handleChange}
              fullWidth
              label='Metafield name'
              error={!!validationMessage.key}
              helperText={validationMessage.key}
            />
          </Grid>
          <Grid>
            <CustomTextField
              placeholder='Metafield value'
              value={addOption.value}
              name='value'
              onChange={handleChange}
              fullWidth
              label='Metafield value'
              error={!!validationMessage.value}
              helperText={validationMessage.value}
            />
          </Grid>
          <Grid>
            <Button variant='contained' color='success' onClick={handleSave} disabled={isButtonDisabled}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid className='px-5 my-5'>
          <MetaTablePreview />
        </Grid>
      </Grid>
    </Card>
  )
}
"
"
'use client'

// React Imports
import { useEffect, useReducer, memo, useState, useCallback } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

// Components Imports
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import CustomTextField from '@core/components/mui/TextField'
import CustomControlledAutoComplete from '@/libs/components/CustomControlledAutoComplete'
// import Typography from '@mui/material/Typography'
import VariantCombinationTable from './VariantCombinationTable'
import debounce from 'lodash.debounce'
import { useProduct } from '@/views/products/allproducts/productContext/ProductStateManagement'

const revertVariants = variants => {
  const optionMap = {}
  variants.forEach(variant => {
    Object.keys(variant).forEach(key => {
      const match = key.match(/option(\d+)_name/)
      if (match) {
        const index = match[1]
        const optionName = variant[`option${index}_name`]
        const optionValue = variant[`option${index}_value`]
        if (!optionMap[optionName]) {
          optionMap[optionName] = new Set()
        }
        optionMap[optionName].add(optionValue)
      }
    })
  })
  return Object.keys(optionMap).map(optionName => ({
    option_name: optionName,
    option_values: Array.from(optionMap[optionName])
      .map(value => ({
        option_value: value
      }))
      .concat([{ option_value: '' }])
  }))
}

const ProductVariants = ({ isAddProduct }) => {
  const [formData, setFormData] = useState([])

  const { productData } = useProduct()

  const initialVariants = productData.child
  useEffect(() => {
    if (initialVariants?.length) {
      const data = revertVariants(initialVariants)
      setFormData(revertVariants(initialVariants))
    } else {
      setFormData([
        {
          option_name: 'Size',
          option_values: [
            {
              option_value: ''
            }
          ]
        }
      ])
    }
  }, [initialVariants])
  const [variantTableData, setVariantTableData] = useState([])

  const handleChange = useCallback((index, newValue) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      newFormData[index].option_name = newValue
      return newFormData
    })
  }, [])

  const deleteInput = useCallback((optionIndex, variantIndex) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      newFormData[optionIndex].option_values = newFormData[optionIndex].option_values.filter(
        (_, vIndex) => vIndex !== variantIndex
      )
      return newFormData
    })
  }, [])

  const addOption = useCallback(() => {
    setFormData(prevFormData => [
      ...prevFormData,
      {
        option_name: 'Size',
        option_values: [
          {
            option_value: ''
          }
        ]
      }
    ])
  }, [])

  const deleteForm = useCallback(optionIndex => {
    setFormData(prevFormData => prevFormData.filter((_, index) => index !== optionIndex))
  }, [])
  const variantInput = useCallback((e, optionIndex, variantIndex) => {
    setFormData(prevFormData => {
      const newFormData = [...prevFormData]
      const newValues = [...newFormData[optionIndex].option_values]
      newValues[variantIndex].option_value = e.target.value

      if (e.target.value.length === 1 && variantIndex === newValues.length - 1) {
        newValues.push({ option_value: '' })
      }

      newFormData[optionIndex].option_values = newValues
      return newFormData
    })
  }, [])

  useEffect(() => {
    const newVariantTableData = formData.map(option => ({
      option_name: option.option_name,
      option_values: option.option_values?.filter(opt => opt.option_value !== '')
    }))
    if (JSON.stringify(newVariantTableData) !== JSON.stringify(variantTableData)) {
      setVariantTableData(newVariantTableData)
    }
  }, [formData])
  return (
    <Grid container className='flex flex-col gap-3 pl-5'>
      <Card>
        <CardHeader title='Product Variants' />
        <CardContent>
          <Grid container spacing={6}>
            {formData.map((variants, optionIndex) => (
              <Grid key={optionIndex} container spacing={6} item xs={12} className='repeater-item'>
                <Grid item xs={12} md={4}>
                  <CustomControlledAutoComplete
                    fullWidth
                    label='Options Name'
                    placeholder='Select or Add Option'
                    initialOptions={[]}
                    value={variants.option_name}
                    onChange={(e, newValue) => handleChange(optionIndex, newValue)}
                  />
                </Grid>
                <Grid item xs={12} md={8} alignSelf='end' className=''>
                  <Typography>Option Value</Typography>
                  <div className='flex flex-col items-center gap-6'>
                    {Array.isArray(variants.option_values) &&
                      variants.option_values.map((variant, variantIndex) => (
                        <CustomTextField
                          key={variantIndex}
                          fullWidth
                          placeholder='Enter Variant Value'
                          value={variant.option_value}
                          onChange={e => variantInput(e, optionIndex, variantIndex)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                {variantIndex > 0 && (
                                  <IconButton
                                    onClick={() => deleteInput(optionIndex, variantIndex)}
                                    className='min-is-fit'
                                  >
                                    <i className='tabler-x' />
                                  </IconButton>
                                )}
                              </InputAdornment>
                            )
                          }}
                        />
                      ))}
                    {formData.length > 1 && (
                      <Button
                        variant='outlined'
                        color='error'
                        onClick={() => deleteForm(optionIndex)}
                        endIcon={<i className='tabler-trash' />}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} gap={2}>
              {formData.length < 3 && (
                <Button variant='contained' onClick={addOption} startIcon={<i className='tabler-plus' />}>
                  Add Another Option
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <VariantCombinationTable data={variantTableData} isAddProduct={isAddProduct} />
    </Grid>
  )
}

export default ProductVariants
"
"'use client'

import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  TextField,
  // IconButton,
  Box,
  Button,
  Collapse,
  Typography,
  Card,
  CardContent
} from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import { useEffect, useState, useCallback, useMemo } from 'react'
import AddCombinationDialog from './AddCombinationDialog'
import { useProduct } from '../../productContext/ProductStateManagement'

const generateVariants = options => {
  const variants = []

  const combineOptions = (index, current) => {
    if (index >= options.length) {
      const values = Object.keys(current)
        .filter(key => key.endsWith('_value'))
        .map(key => current[key])
        .join('/')

      variants.push({
        ...current,
        values,
        variant_sku: '',
        variant_compare_at_price: 0,
        variant_inventory_qty: 0,
        variant_price: 0,
        variant_weight: 0,
        variant_length: 0,
        variant_width: 0,
        variant_height: 0,
        variant_tax: '',
        country_of_origin: 'IN'
      })
      return
    }

    const { option_name, option_values } = options[index]

    option_values.forEach(value => {
      combineOptions(index + 1, {
        ...current,
        [`option${index + 1}_name`]: option_name,
        [`option${index + 1}_value`]: value.option_value
      })
    })
  }

  combineOptions(0, {})
  return variants
}

const VariantRow = ({ variant, selectedItems, handleSelectItems, index }) => {
  const [variantData, setVariantData] = useState({
    ...variant
  })

  const { productData } = useProduct()

  const [addCombinationDialogOpen, setAddCombinationDialogOpen] = useState(false)

  if (!variant) {
    return null
  }

  useEffect(() => {
    setVariantData({ ...variant })
  }, [variant])

  const handleChange = useCallback((field, value) => {
    setVariantData(prevState => ({
      ...prevState,
      [field]: value
    }))
  }, [])

  const openAddCombinationDialog = useCallback(() => {
    setAddCombinationDialogOpen(true)
  }, [])

  const closeAddCombinationDialog = useCallback(() => {
    setAddCombinationDialogOpen(false)
  }, [])

  const handleRowClick = useCallback(
    e => {
      if (e.target.type !== 'checkbox' && e.target.type !== 'file') {
        openAddCombinationDialog()
      }
    },
    [openAddCombinationDialog]
  )

  return (
    <>
      <TableRow onClick={handleRowClick}>
        <TableCell>
          <Checkbox
            checked={selectedItems[variant.variant] || false}
            onChange={() => handleSelectItems(variant.variant)}
          />
        </TableCell>
        <TableCell>
          <input type='file' accept='image/*' onChange={e => handleChange('image', e.target.files[0])} />
        </TableCell>
        <TableCell>{variantData.values}</TableCell>
        <TableCell>
          <CustomTextField label='Price' disabled value={productData.child[index].variant_price} fullWidth />
        </TableCell>
        <TableCell>
          <CustomTextField label='Quantity' disabled value={productData.child[index].variant_inventory_qty} fullWidth />
        </TableCell>

        <TableCell>
          <Button
            variant='contained'
            onClick={e => {
              e.stopPropagation()
              openAddCombinationDialog()
            }}
          >
            Add value
          </Button>
        </TableCell>
      </TableRow>

      <AddCombinationDialog
        open={addCombinationDialogOpen}
        onClose={closeAddCombinationDialog}
        dialogData={variantData}
        variant={variant}
        index={index}
      />
    </>
  )
}
export default function VariantCombinationTable({ data, isAddProduct }) {
  const { productData, updateProductData, updateChildData } = useProduct()

  useEffect(() => {
    if (isAddProduct) {
      updateChildData(generateVariants(data))
    }
  }, [data, isAddProduct])
  const [openStates, setOpenStates] = useState({})
  const [selectedItems, setSelectedItems] = useState({})

  const handleSelectItems = useCallback(itemId => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }))
  }, [])

  const handleSelectAll = useCallback(() => {
    const newSelectAll = !Object.values(selectedItems).every(Boolean)
    const newSelectedItems = {}
    structuredData.forEach(variant => {
      newSelectedItems[variant.variant] = newSelectAll
    })
    setSelectedItems(newSelectedItems)
  }, [productData, selectedItems])

  const handleToggle = useCallback(variant => {
    setOpenStates(prevState => ({ ...prevState, [variant]: !prevState[variant] }))
  }, [])

  if (!productData.child || productData.child.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography>No Data Available</Typography>
        </CardContent>
      </Card>
    )
  }
  return (
    <Grid container className='mt-5 p-3'>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>
                <Checkbox
                  checked={Object.values(selectedItems).length > 0 && Object.values(selectedItems).every(Boolean)}
                  indeterminate={
                    Object.values(selectedItems).some(Boolean) && !Object.values(selectedItems).every(Boolean)
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Variant's</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData?.child?.map((variantObj, index) => (
              <VariantRow
                key={index}
                variant={variantObj}
                index={index}
                selectedItems={selectedItems}
                handleSelectItems={handleSelectItems}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}
"
"'use client'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import MenuItem from '@mui/material/MenuItem'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomTextField from '@/@core/components/mui/TextField'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'

const validationSchema = yup.object().shape({
  variant_price: yup.number().required('Price is required').positive('Price must be a positive number'),
  variant_sku: yup.string().required('SKU is required'),
  variant_weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  variant_inventory_qty: yup
    .number()
    .required('Inventory Quantity is required')
    .positive('Inventory Quantity must be a positive number')
    .integer('Inventory Quantity must be an integer'),
  variant_compare_at_price: yup.number().positive('Compare At Price must be a positive number'),
  variant_height: yup.number().required('Height is required').positive('Height must be a positive number'),
  variant_length: yup.number().required('Length is required').positive('Length must be a positive number'),
  variant_width: yup.number().required('Width is required').positive('Width must be a positive number')
})

const AddCombinationDialog = ({ open, onClose, dialogData, variant, index }) => {
  const { productData, updateProductData, updateChildData } = useProduct()
  console.log(variant, 'varrriaiaannnt')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: variant
  })
  useEffect(() => {
    if (open) {
      reset(dialogData)
    }
  }, [open, dialogData, reset])

  const handleSave = data => {
    const newData = productData.child
    newData[index] = data
    updateChildData(newData)
    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { overflow: 'visible' } }}>
      <DialogTitle>Add Variant</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <Controller
            name='variant_price'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Price'
                fullWidth
                type='number'
                placeholder='Price'
                error={!!errors.variant_price}
                helperText={errors.variant_price?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_sku'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='SKU (stock keep unit)'
                fullWidth
                placeholder='SKU (sku keep unit)'
                error={!!errors.variant_sku}
                helperText={errors.variant_sku?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_length'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Length'
                fullWidth
                placeholder='Length'
                type='number'
                error={!!errors.variant_length}
                helperText={errors.variant_length?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_width'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Width'
                fullWidth
                placeholder='Width'
                type='number'
                error={!!errors.variant_width}
                helperText={errors.variant_width?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_height'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Height'
                fullWidth
                type='number'
                placeholder='Height'
                error={!!errors.variant_height}
                helperText={errors.variant_height?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_weight'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Weight'
                fullWidth
                type='number'
                placeholder='Weight'
                error={!!errors.variant_weight}
                helperText={errors.variant_weight?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_inventory_qty'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Inventory Qty'
                fullWidth
                type='number'
                placeholder='INventory Quantity'
                error={!!errors.variant_inventory_qty}
                helperText={errors.variant_inventory_qty?.message}
                margin='normal'
              />
            )}
          />
          <Controller
            name='variant_compare_at_price'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label='Compare At Price'
                fullWidth
                placeholder='Compare at price'
                type='number'
                error={!!errors.variant_compare_at_price}
                helperText={errors.variant_compare_at_price?.message}
                margin='normal'
              />
            )}
          />
          <DialogActions className='flex max-sm:flex-col max-sm:items-center max-sm:gap-2 justify-center pbs-0 sm:pbe-16 sm:pli-16'>
            <Button onClick={onClose} variant='tonal' color='secondary' className='max-sm:mis-0'>
              Cancel
            </Button>
            <Button type='submit' variant='contained'>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddCombinationDialog
"
"'use client'
// React Imports
import { useState } from 'react'
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CustomTextField from '@/@core/components/mui/TextField'
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'
// Third-party Imports
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Grid } from '@mui/material'
const ProductImage = () => {
  const { productData, addProductImages, updateProductImages, deleteProductImages } = useProduct()
  const addOption = () => {
    addProductImages()
  }

  const deleteOption = index => {
    deleteProductImages(index)
  }
  return (
    <Grid>
      <Card>
        <CardHeader title='Product Images' />
        <CardContent>
          <Grid container gap={7} xs={12} className='flex flex-col'>
            <Grid item xs={12} className=''>
              {productData.images.map((img, index) => (
                <Grid className='my-2' key={index}>
                  {/* {console.log(img)} */}
                  <CustomTextField
                    fullWidth
                    placeholder='Enter Image Link'
                    value={img.image_src}
                    onChange={e => updateProductImages(index, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton className='min-is-fit' onClick={() => deleteOption(index)}>
                            <i className='tabler-x' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid>
              {productData.images.length < 5 && (
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => addOption()}
                  endIcon={<i className='tabler-plus' />}
                >
                  Add Image
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default ProductImage
"
"'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CustomTextField from '@/@core/components/mui/TextField'
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Grid } from '@mui/material'

export default function ProductVideos() {
  const { productData, addProductVideos, updateProductVideos, deleteProductVideos } = useProduct()
  const addOption = () => {
    addProductVideos()
  }

  const deleteOption = index => {
    deleteProductVideos(index)
  }
  return (
    <Grid>
      <Card>
        <CardHeader title='Product Videos' />
        <CardContent>
          <Grid container gap={7} xs={12} className='flex flex-col'>
            <Grid item xs={12} className=''>
              {productData.videos.map((video, index) => (
                <Grid className='my-2' key={index}>
                  {/* {console.log(img)} */}
                  <CustomTextField
                    fullWidth
                    placeholder='Enter Vidoes Link'
                    value={video.video_src}
                    onChange={e => updateProductVideos(index, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton className='min-is-fit' onClick={() => deleteOption(index)}>
                            <i className='tabler-x' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            <Grid>
              {productData.images.length < 5 && (
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={() => addOption()}
                  endIcon={<i className='tabler-plus' />}
                >
                  Add Video
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}
"
"'use client'

// MUI Imports
import { MenuItem, CardContent, CardHeader, Card, Grid, useFormControl } from '@mui/material'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomCheckboxAutocomplete from '@/libs/components/CustomCheckboxAutocomplete'
import { useProduct } from '../../productContext/ProductStateManagement'
import { TypeOfStandard } from '@/data/typeOfStandard/TypeOfStandard'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import { useFormContext, Controller } from 'react-hook-form'

const ProductOrganize = ({ brandName }) => {
  const { productData, updateProductParent } = useProduct()
  const {
    control,
    formState: { errors }
  } = useFormContext()
  const handleArrayChange = (name, newValue) => {
    updateProductParent({ [name]: newValue })
  }
  const movie = ['hello', 'movie', 'sjkdl']
  return (
    <Card>
      <CardHeader title='Organize' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Controller
              name='brand_name'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  select
                  value={productData.parent.brand_name || ''}
                  fullWidth
                  label='Brand'
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ brand_name: e.target.value })
                  }}
                  error={!!errors.brand_name}
                  helperText={errors.brand_name ? errors.brand_name.message : ''}
                >
                  {brandName?.allBrand?.map(brand => (
                    <MenuItem value={brand.brand_name} key={brand._id}>
                      {brand.brand_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='categories'
              control={control}
              render={({ field }) => (
                <CustomCheckboxAutocomplete
                  {...field}
                  value={productData.parent.categories || []}
                  label='Categories'
                  placeholder='Categories select'
                  fullWidth
                  initialOptions={productData.parent.categories || []}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ categories: newValue })
                  }}
                  error={!!errors.categories}
                  helperText={errors.categories ? errors.categories.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {productData.parent.categories.length > 0 ? (
              <Controller
                name='default_category'
                control={control}
                defaultValue={productData.parent.default_category || ''}
                render={({ field }) => (
                  <CustomAutocomplete
                    fullWidth
                    {...field}
                    options={productData.parent.categories || []}
                    onChange={(event, newValue) => {
                      field.onChange(newValue)
                      updateProductParent({ default_category: newValue, product_type: newValue })
                    }}
                    getOptionLabel={option => option}
                    renderInput={params => (
                      <CustomTextField
                        {...params}
                        placeholder='Default Categories'
                        label='Default Categories'
                        error={!!errors.default_category}
                        helperText={errors.default_category ? errors.default_category.message : ''}
                      />
                    )}
                  />
                )}
              />
            ) : (
              <CustomTextField fullWidth select disabled placeholder='Default Categories' label='Default Categories' />
            )}
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='tags'
              control={control}
              render={({ field }) => (
                <CustomCheckboxAutocomplete
                  {...field}
                  value={productData.parent.tags || []}
                  fullWidth
                  label='Enter Tags'
                  placeholder='Fashion, Trending, Summer'
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ tags: newValue })
                  }}
                  initialOptions={productData.parent.tags}
                  error={!!errors.tags}
                  helperText={errors.tags ? errors.tags.message : ''}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='type_standard'
              control={control}
              render={({ field }) => (
                <CustomAutocomplete
                  {...field}
                  fullWidth
                  value={productData.parent.type_standard || ''}
                  options={TypeOfStandard}
                  onChange={(event, newValue) => {
                    field.onChange(newValue)
                    updateProductParent({ type_standard: newValue })
                  }}
                  getOptionLabel={option => option}
                  renderInput={params => (
                    <CustomTextField
                      {...params}
                      placeholder='Standard Type'
                      label='Standard Type'
                      error={!!errors.type_standard}
                      helperText={errors.type_standard ? errors.type_standard.message : ''}
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name='published'
              control={control}
              defaultValue={productData.parent.published || ''}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Published'
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ published: e.target.value })
                  }}
                  error={!!errors.published}
                  helperText={errors.published ? errors.published.message : ''}
                >
                  <MenuItem value='TRUE'>True</MenuItem>
                  <MenuItem value='FALSE'>False</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomCheckboxAutocomplete
              onChange={(event, newValue) => handleArrayChange('check', newValue)}
              initialOptions={productData.parent.tags}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ProductOrganize
"

"'use client'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomTextField from '@core/components/mui/TextField'
import { useProduct } from '@views/products/allproducts/productContext/ProductStateManagement'
import { Controller, useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
const RichTextEditor = dynamic(() => import('@/libs/RichTextEditor'), { ssr: false })

const ProductInformation = () => {
  const { productData, updateProductParent } = useProduct()
  const {
    control,
    formState: { errors }
  } = useFormContext()
  console.log('doing console from oarent information', productData)
  const handleDescriptionChange = value => {updateProductParent({ product_description: value })
  }

  return (
    <Card>
      <CardHeader title='Product Information' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <Controller
              name='product_title'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={productData.parent.product_title || ''}
                  label='Product Title'
                  fullWidth
                  placeholder='Product name'
                  onChange={e => {
                    field.onChange(e)
                    updateProductParent({ product_title: e.target.value })
                  }}
                  error={!!errors.product_title}
                  helperText={errors.product_title ? errors.product_title.message : ''}
                />
              )}
            />
          </Grid>
        </Grid>

        <Typography className='mbe-1'>Description</Typography>

        <Grid className='p-0 border shadow-none' sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Controller
            name='product_description'
            control={control}
            render={({ field }) => (
              <RichTextEditor
                {...field}
                label
                value={productData.parent.product_description || ''}
                onChange={value => {
                  field.onChange(value)
                  handleDescriptionChange(value)
                }}
              />
            )}
          />
          {errors.product_description && <Typography color='error'>{errors.product_description.message}</Typography>}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductInformation
"




// Unhandled Runtime Error
// TypeError: Failed to fetch

// Source
// src/utils/fetchData.js (50:27) @ fetch

//   48 | try {
//   49 |   
// > 50 |   const response = await fetch(url, requestOptions);
//      |                         ^
//   51 |   
//   52 |   if (!response.ok) {
//   53 |     throw new Error(`HTTP error! Status: ${response.status}`);