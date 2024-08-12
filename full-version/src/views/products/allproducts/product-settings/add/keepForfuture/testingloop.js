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
