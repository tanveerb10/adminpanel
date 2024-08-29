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

// const cleanData = (data) => {
//     return data.map(item => ({
//       ...item,
//       values: item.values.filter(value => value !== '')
//     }));
//   };

//   const generateCombinations = (data, currentIndex = 0, currentCombination = [], result = []) => {
//     if (currentIndex === data.length) {
//       result.push(currentCombination.join(' / '));
//       return result;
//     }

//     for (const value of data[currentIndex].values) {
//       generateCombinations(data, currentIndex + 1, [...currentCombination, value.toUpperCase()], result);
//     }

//     return result;
//   };

//   const createDataStructure = (data) => {
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

//   // console.log(JSON.stringify(structuredData, null, 2));

// const arraycheck = ["1", 2]
// // console.log(typeof arraycheck)

// const dataaccess = {
//   "type": "Size",
//   "values": [
//     {
//       "variant": "m",
//       "combinations": [
//         {
//           "combination": "GREEN / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "GREEN / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / COTTON",
//           "price": 0,
//           "quantity": 0
//         }
//       ]
//     },
//     {
//       "variant": "l",
//       "combinations": [
//         {
//           "combination": "GREEN / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "GREEN / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / COTTON",
//           "price": 0,
//           "quantity": 0
//         }
//       ]
//     },
//     {
//       "variant": "xl",
//       "combinations": [
//         {
//           "combination": "GREEN / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "GREEN / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "RED / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "YELLOW / COTTON",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / FABRICS",
//           "price": 0,
//           "quantity": 0
//         },
//         {
//           "combination": "BLUE / COTTON",
//           "price": 0,
//           "quantity": 0
//         }
//       ]
//     }
//   ]
// }

// const checkdataaccess = dataaccess.values.map((index)=> {
//   console.log(index.variant)
//   const com =(index.combinations.map((comaccess) => {
//     console.log(comaccess.combination)
//   }))
// })

const brandData = {
  success: true,
  brand: {
    _id: '66794322085313c3494eb190',
    brand_name: 'Livein',
    brand_description:
      'Stay in the zone while you train in this crop designed with printed panel details to keep you cool. Girls love standing in these tight fitting, printed panel to handle every kind of activity they set their mind to',
    brand_slug: 'men-blue-denim-jeans-abcd-12',
    sort_order: 'yes',
    products_count: 0,
    brand_image_src:
      'https://img.freepik.com/free-psd/psd-white-hoodie-mockup_1409-3755.jpg?w=740&t=st=1716359362~exp=1716359962~hmac=8e99bd7a6a38ab27f9924c58cb4282891aaddb8ea2eb9f96b1951b17cc1b9aa0',
    brand_image_alt: 'img.freepik.com',
    is_deleted: false,
    createdAt: '2024-06-24T09:57:54.663Z',
    updatedAt: '2024-06-24T09:57:54.663Z',
    brand_id: 1,
    __v: 0
  }
}

const brand = brandData.map(data => {
  const response = data.success
  console.log(response)
})
=======
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
    values: ['m', 'l', 'xl', '']
  },
  {
    type: 'Color',
    values: ['green', 'red', 'yellow', 'blue', '']
  },
  {
    type: 'Weight',
    values: ['fabrics', 'cotton', '']
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
  console.log(index.variant)
  const com = index.combinations.map(comaccess => {
    console.log(comaccess.combination)
  })
})

const date = '2024-07-27T07:30:30.337Z'

const date1 = new Date(date)

const formatDate = `${date1.getDate()}-${date1.getMonth() + 1}-${date1.getFullYear()}`
console.log(Date.parse('2024-07-27T07:30:30.337Z'))
console.log(formatDate)
