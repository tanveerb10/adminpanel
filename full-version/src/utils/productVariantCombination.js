export const cleanData = (data) => {
    return data.map(item => ({
      ...item,
      values: item.values.filter(value => value !== '')
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
  
  export const createDataStructure = (data) => {
    const topLevelVariants = data[0]?.values.map(variant => ({
      variant: variant,
      combinations: []
    }));
  
    const combinations = generateCombinations(data.slice(1));
  
    topLevelVariants?.forEach(variantObj => {
      variantObj.combinations = combinations.map(combination => ({
        combination: combination,
        // price: 0.00,
        // quantity: 0
      }));
    });
  
    return {
      type: data[0]?.type,
      values: topLevelVariants
    };
  };
