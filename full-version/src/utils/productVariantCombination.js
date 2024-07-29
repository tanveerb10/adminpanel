// export const cleanData = (data) => {
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
  
//   export const createDataStructure = (data) => {
//     const topLevelVariants = data[0]?.values.map(variant => ({
//       variant: variant,
//       combinations: []
//     }));
  
//     const combinations = generateCombinations(data.slice(1));
  
//     topLevelVariants?.forEach(variantObj => {
//       variantObj.combinations = combinations.map(combination => ({
//         combination: combination,
//       }));
//     });
  
//     return {
//       type: data[0]?.type,
//       values: topLevelVariants
//     };
//   };

// export const cleanCombinationData = (data) => {
//   return data.map((item) =>( {
//     ...item,
//     values : item.values.combinations.combination.filter((value)=> value !== "")
    
//     }))

//   }

// export const cleanData = (data) => {
//   return data.map(item => ({
//     ...item,
//     values: item.values.filter(value => value !== '')
//   }));
// };

export const cleanData = (data) => {
  return data.map(item => ({
    ...item,
    values: Array.isArray(item.values) ? item.values.filter(value => value !== '') : []
  }));
};

const generateCombinations = (data, currentIndex = 0, currentCombination = [], result = []) => {
  if (currentIndex === data.length) {
    result.push(currentCombination.join(' / '));
    return result;
  }

  for (const value of data[currentIndex].values) {
    generateCombinations(data, currentIndex + 1, [...currentCombination, value.toUpperCase()], result);
  }

  return result;
};

// export const createDataStructure = (data) => {
//   const topLevelVariants = data[0]?.values.map(variant => ({
//     variant: variant,
//     combinations: []
//   }));

//   const combinations = generateCombinations(data.slice(1));

//   topLevelVariants?.forEach(variantObj => {
//     variantObj.combinations = combinations.map(combination => ({
//       combination: combination,
//     }));
//   });

//   return {
//     type: data[0]?.type,
//     values: topLevelVariants
//   };
// };

export const createDataStructure = (data) => {
  if (!Array.isArray(data) || data.length === 0 || !Array.isArray(data[0]?.values)) {
    return {
      type: '',
      values: []
    };
  }

  const topLevelVariants = data[0].values.map(variant => ({
    variant: variant,
    combinations: []
  }));

  const combinations = generateCombinations(data.slice(1));

  topLevelVariants.forEach(variantObj => {
    variantObj.combinations = combinations.map(combination => ({
      combination: combination,
    }));
  });

  return {
    type: data[0]?.type || '',
    values: topLevelVariants
  };
};
